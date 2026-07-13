import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const scanRoots = [
  'app',
  'i18n',
  'scripts',
  'docs',
  '_bmad-output',
  'package.json'
]
const blockedPatterns = [
  /\bmock(?:ed)?\b/i,
  /\bmock(?=[_-])/i,
  /\bplaceholder\b/i,
  /\bplaceholders\b/i,
  /Placeholder\b/,
  /\bfake\b/i,
  /\btemporary\b/i,
  /\bsample\b/i,
  /\bsamples\b/i,
  /\bnon-production\b/i,
  /production-only/i,
  /production value/i,
  /not selected for production/i,
  /remain(?:s)? tracked/i,
  /tracked launch/i,
  /approval status/i,
  /awaiting approval/i,
  /still need approval/i,
  /team input/i,
  /on request/i,
  /\bsourceStatus\b/,
  /\bsource status\b/i,
  /\bRenderMode\b/,
  /\brender mode\b/i,
  /\bcontent gate\b/i,
  /\bcontent-gate\b/i,
  /\bneeds_input\b/,
  /\bneeds_review\b/,
  /\brequiredForLaunch\b/,
  /\bunresolved\b/i,
  /(^|[^\p{L}\p{N}_])мок(?:и|ів|ами|ов(?:ий|а|е|і)?|ап(?:и|ів|ами)?)?(?=$|[^\p{L}\p{N}_])/iu,
  /непідтвердж/i,
  /погодження/i,
  /потребують вводу/i,
  /очікує підтвердж/i,
  /потребує підтвердж/i,
  /production content gate/i,
  /preview-only/i,
  /preview mode/i
]

function listFiles(path) {
  const absolutePath = resolve(root, path)

  if (!existsSync(absolutePath)) {
    return []
  }

  if (statSync(absolutePath).isFile()) {
    return [absolutePath]
  }

  return readdirSync(absolutePath).flatMap((entry) => {
    const entryPath = resolve(absolutePath, entry)

    if (statSync(entryPath).isDirectory()) {
      return listFiles(relative(root, entryPath))
    }

    return [entryPath]
  })
}

const files = scanRoots
  .flatMap(listFiles)
  .filter((path) => /\.(?:ts|vue|json|mjs|md|ya?ml|html)$/.test(path))
  .filter((path) => !path.endsWith('scripts/verify-production-content.mjs'))

const violations = []

for (const path of files) {
  const source = readFileSync(path, 'utf8')
  const lines = source.split('\n')

  lines.forEach((line, index) => {
    for (const pattern of blockedPatterns) {
      if (pattern.test(line)) {
        violations.push(`${relative(root, path)}:${index + 1}: ${line.trim()}`)
        break
      }
    }
  })
}

if (violations.length > 0) {
  console.error('Production content vocabulary check failed:')
  console.error(violations.join('\n'))
  process.exit(1)
}

console.log('Production content vocabulary verification passed')
