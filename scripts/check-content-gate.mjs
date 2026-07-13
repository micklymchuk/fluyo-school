import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.env.CONTENT_GATE_ROOT ? resolve(process.env.CONTENT_GATE_ROOT) : process.cwd()
const TELEGRAM_DIRECT_FALLBACK = 'https://t.me/fluyo_manager'
const unresolvedStatuses = new Set(['mock', 'needs_input', 'needs_review'])
const requiredBlockingStatuses = new Set(['mock', 'hidden', 'needs_input', 'needs_review'])

const files = {
  pricing: resolve(root, 'app/data/content/pricing.ts'),
  teachers: resolve(root, 'app/data/content/teachers.ts'),
  proof: resolve(root, 'app/data/content/proof.ts'),
  testimonials: resolve(root, 'app/data/content/testimonials.ts'),
  faq: resolve(root, 'app/data/content/faq.ts'),
  assets: resolve(root, 'app/data/asset-manifest.ts'),
  telegramCta: resolve(root, 'app/composables/useTelegramCta.ts')
}

const collections = [
  {
    label: 'pricing',
    path: files.pricing,
    exportName: 'priceItems',
    isRequired: (record) => record.requiredForLaunch === true
  },
  {
    label: 'teachers',
    path: files.teachers,
    exportName: 'teacherProfiles',
    isRequired: (record) => record.requiredForLaunch === true
  },
  {
    label: 'proof',
    path: files.proof,
    exportName: 'proofAssets',
    isRequired: (record) => record.requiredForLaunch === true
  },
  {
    label: 'testimonials',
    path: files.testimonials,
    exportName: 'testimonials',
    isRequired: (record) => record.requiredForLaunch === true
  },
  {
    label: 'faq',
    path: files.faq,
    exportName: 'faqItems',
    isRequired: (record) => record.requiredForLaunch === true || record.policySensitivity === 'policy_sensitive'
  },
  {
    label: 'assets',
    path: files.assets,
    exportName: 'assetManifest',
    isRequired: (record) => record.requiredForLaunch === true
  }
]

function fail(message) {
  throw new Error(message)
}

function assertFile(path) {
  if (!existsSync(path)) {
    fail(`Missing required file: ${relative(root, path)}`)
  }
}

function read(path) {
  assertFile(path)
  return readFileSync(path, 'utf8')
}

function findMatchingBracket(source, startIndex, openChar, closeChar, label) {
  let depth = 0
  let quote = ''
  let escaped = false

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index]

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        quote = ''
      }

      continue
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      continue
    }

    if (char === openChar) {
      depth += 1
      continue
    }

    if (char === closeChar) {
      depth -= 1

      if (depth === 0) {
        return index
      }
    }
  }

  fail(`${label} must have a complete ${openChar}${closeChar} block`)
}

function getExportedArrayBody(source, exportName, label) {
  const marker = `export const ${exportName}`
  const markerIndex = source.indexOf(marker)

  if (markerIndex < 0) {
    fail(`${label} must export ${exportName}`)
  }

  const startIndex = source.indexOf('[', markerIndex)

  if (startIndex < 0) {
    fail(`${label} ${exportName} must be an array`)
  }

  const endIndex = findMatchingBracket(source, startIndex, '[', ']', `${label} ${exportName}`)

  return source.slice(startIndex + 1, endIndex)
}

function getTopLevelObjectRecords(arrayBody, label) {
  const records = []
  let depth = 0
  let recordStart = -1
  let quote = ''
  let escaped = false

  for (let index = 0; index < arrayBody.length; index += 1) {
    const char = arrayBody[index]

    if (quote) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        quote = ''
      }

      continue
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      continue
    }

    if (char === '{') {
      if (depth === 0) {
        recordStart = index
      }

      depth += 1
      continue
    }

    if (char === '}') {
      depth -= 1

      if (depth === 0 && recordStart >= 0) {
        records.push(arrayBody.slice(recordStart, index + 1))
        recordStart = -1
      }
    }
  }

  return records
}

function readField(recordSource, key) {
  const fieldPattern = `["']?${key}["']?`
  const stringMatch = recordSource.match(new RegExp(`${fieldPattern}:\\s*["']([^"']+)["']`))

  if (stringMatch) {
    return stringMatch[1]
  }

  const booleanMatch = recordSource.match(new RegExp(`${fieldPattern}:\\s*(true|false)`))

  if (booleanMatch) {
    return booleanMatch[1] === 'true'
  }

  return undefined
}

function parseRecords(collection) {
  const source = read(collection.path)
  const body = getExportedArrayBody(source, collection.exportName, collection.label)
  const records = getTopLevelObjectRecords(body, collection.label)

  return records.map((recordSource, index) => {
    const id = readField(recordSource, 'id')
    const sourceStatus = readField(recordSource, 'sourceStatus')

    if (typeof id !== 'string') {
      fail(`${collection.label}[${index}] must include a string id`)
    }

    if (typeof sourceStatus !== 'string') {
      fail(`${collection.label}/${id} must include a sourceStatus`)
    }

    return {
      id,
      sourceStatus,
      requiredForLaunch: readField(recordSource, 'requiredForLaunch'),
      policySensitivity: readField(recordSource, 'policySensitivity')
    }
  })
}

function collectContentIssues() {
  const issues = []

  for (const collection of collections) {
    for (const record of parseRecords(collection)) {
      const required = collection.isRequired(record)

      if (required && requiredBlockingStatuses.has(record.sourceStatus)) {
        issues.push({
          severity: 'blocking',
          key: `${collection.label}/${record.id}`,
          sourceStatus: record.sourceStatus,
          message: 'required for launch'
        })
      } else if (!required && unresolvedStatuses.has(record.sourceStatus)) {
        issues.push({
          severity: 'warning',
          key: `${collection.label}/${record.id}`,
          sourceStatus: record.sourceStatus,
          message: 'will be hidden in production'
        })
      }
    }
  }

  return issues
}

function collectSystemIssues() {
  const source = read(files.telegramCta)

  if (source.includes(TELEGRAM_DIRECT_FALLBACK)) {
    return []
  }

  return [
    {
      severity: 'blocking',
      key: 'system/telegram-direct-fallback',
      sourceStatus: 'needs_input',
      message: 'Telegram direct fallback is missing'
    }
  ]
}

function printIssues(title, issues) {
  console.log(title)

  for (const issue of issues) {
    console.log(`- ${issue.key}: ${issue.sourceStatus} (${issue.message})`)
  }
}

const issues = [...collectContentIssues(), ...collectSystemIssues()]
const blockingIssues = issues.filter((issue) => issue.severity === 'blocking')
const warningIssues = issues.filter((issue) => issue.severity === 'warning')
const telegramFallbackStatus = blockingIssues.some((issue) => issue.key === 'system/telegram-direct-fallback') ? 'missing' : 'ok'

console.log(`Telegram direct fallback: ${telegramFallbackStatus}`)

if (blockingIssues.length > 0) {
  printIssues('Blocking launch content gate issues:', blockingIssues)
}

if (warningIssues.length > 0) {
  printIssues('Non-blocking launch content warnings:', warningIssues)
}

if (blockingIssues.length === 0 && warningIssues.length === 0) {
  console.log('Content gate passed: all launch-sensitive records are approved or intentionally hidden.')
}

process.exitCode = blockingIssues.length > 0 ? 1 : 0
