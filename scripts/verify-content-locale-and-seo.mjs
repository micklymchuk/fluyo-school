import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  nuxtConfig: resolve(root, 'nuxt.config.ts'),
  i18nConfig: resolve(root, 'i18n/i18n.config.ts'),
  messageAdapter: resolve(root, 'app/i18n/messages.ts'),
  ukMessages: resolve(root, 'i18n/locales/uk.json'),
  enMessages: resolve(root, 'i18n/locales/en.json'),
  pageContentAdapter: resolve(root, 'app/data/page-content-adapter.ts'),
  localizedContentAdapter: resolve(root, 'app/data/localized-content-adapter.ts'),
  siteContent: resolve(root, 'app/data/site-content.ts'),
  contentIndex: resolve(root, 'app/data/content/index.ts'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  contentPages: resolve(root, 'app/data/content/pages.ts'),
  contentLearningPaths: resolve(root, 'app/data/content/learning-paths.ts'),
  contentPricing: resolve(root, 'app/data/content/pricing.ts'),
  contentTeachers: resolve(root, 'app/data/content/teachers.ts'),
  contentProof: resolve(root, 'app/data/content/proof.ts'),
  contentTestimonials: resolve(root, 'app/data/content/testimonials.ts'),
  contentFaq: resolve(root, 'app/data/content/faq.ts'),
  assetManifest: resolve(root, 'app/data/asset-manifest.ts'),
  useLocale: resolve(root, 'app/composables/useLocale.ts'),
  useSeo: resolve(root, 'app/composables/useSeo.ts'),
  indexPage: resolve(root, 'app/pages/index.vue'),
  programsPage: resolve(root, 'app/pages/programs.vue'),
  teachersPage: resolve(root, 'app/pages/teachers.vue'),
  pricingPage: resolve(root, 'app/pages/pricing.vue')
}

const requiredTypes = [
  'LocalizedString',
  'SourceStatus',
  'PageContent',
  'LearningPath',
  'PriceItem',
  'TeacherProfile',
  'ProofAsset',
  'Testimonial',
  'FaqItem',
  'CtaIntent'
]

const requiredPagePaths = ['/', '/programs', '/teachers', '/pricing']
const requiredPages = [
  ['home', '/'],
  ['programs', '/programs'],
  ['teachers', '/teachers'],
  ['pricing', '/pricing']
]
const requiredLearningPathIds = ['exam', 'kids', 'adult']
const requiredPriceItemIds = ['trial', 'exam-group', 'kids-group', 'adult-individual']
const requiredTeacherProfileIds = ['olena-bondar', 'marta-koval', 'andriy-lev']
const requiredProofAssetIds = ['student-result-ielts', 'kids-class-snapshot', 'adult-speaking-note', 'lesson-format-board']
const requiredTestimonialIds = ['danylo-exam', 'olena-parent', 'marta-adult']
const requiredFaqItemIds = ['trial-booking', 'format-choice', 'teacher-match', 'pricing-policy', 'schedule-policy', 'english-switch']
const requiredAssetIds = [
  'brand-logo-full',
  'brand-logo-short',
  'portrait-olena-bondar',
  'portrait-marta-koval',
  'portrait-andriy-lev',
  'student-result-ielts',
  'kids-class-snapshot',
  'adult-speaking-note',
  'lesson-format-board'
]
const launchSensitiveCollections = [
  { sourceKey: 'contentPricing', exportName: 'priceItems', label: 'content/pricing.ts' },
  { sourceKey: 'contentTeachers', exportName: 'teacherProfiles', label: 'content/teachers.ts' },
  { sourceKey: 'contentProof', exportName: 'proofAssets', label: 'content/proof.ts' },
  { sourceKey: 'contentTestimonials', exportName: 'testimonials', label: 'content/testimonials.ts' },
  { sourceKey: 'contentFaq', exportName: 'faqItems', label: 'content/faq.ts' },
  { sourceKey: 'assetManifest', exportName: 'assetManifest', label: 'asset-manifest.ts' }
]

function fail(message) {
  throw new Error(message)
}

function assert(condition, message) {
  if (!condition) {
    fail(message)
  }
}

function assertFile(path) {
  assert(existsSync(path), `Missing required file: ${relative(root, path)}`)
}

function read(path) {
  assertFile(path)
  return readFileSync(path, 'utf8')
}

function readJson(path) {
  return JSON.parse(read(path))
}

function assertIncludes(source, value, label) {
  assert(source.includes(value), `${label} must include ${value}`)
}

function assertPattern(source, pattern, label) {
  assert(pattern.test(source), label)
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

  assert(markerIndex >= 0, `${label} must export ${exportName}`)

  const startIndex = source.indexOf('[', markerIndex)

  assert(startIndex >= 0, `${label} ${exportName} must be an array`)

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

  assert(records.length > 0, `${label} must contain at least one record`)

  return records
}

function assertEveryArrayRecordHasSourceStatus(source, exportName, label) {
  const arrayBody = getExportedArrayBody(source, exportName, label)
  const records = getTopLevelObjectRecords(arrayBody, label)

  records.forEach((record, index) => {
    assertPattern(
      record,
      /sourceStatus:\s*'(approved|mock|hidden|needs_input|needs_review)'/,
      `${label} ${exportName}[${index}] must include an allowed sourceStatus`
    )
  })
}

function listFiles(path) {
  if (!existsSync(path)) {
    return []
  }

  const entries = readdirSync(path).map((entry) => resolve(path, entry))

  return entries.flatMap((entry) => {
    if (statSync(entry).isDirectory()) {
      return listFiles(entry)
    }

    return entry
  })
}

function assertNoInlineLocalizedCopy(source, label) {
  assert(!source.includes('defineLocalized'), `${label} must not define inline localized copy`)
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not contain Ukrainian public copy`)
}

function assertLocaleMessageTree(messages, locale) {
  assert(typeof messages === 'object' && messages !== null, `${locale}.json must contain a message object`)
  assert(typeof messages.pages === 'object' && messages.pages !== null, `${locale}.json must contain pages messages`)

  for (const [routeId, pagePath] of requiredPages) {
    const page = messages.pages[routeId]

    assert(page, `${locale}.json must define messages for ${pagePath}`)
    assert(typeof page.seo?.title === 'string' && page.seo.title.length > 0, `${locale}.json ${pagePath} must include seo.title`)
    assert(typeof page.seo?.description === 'string' && page.seo.description.length > 0, `${locale}.json ${pagePath} must include seo.description`)
    assert(typeof page.intro?.eyebrow === 'string' && page.intro.eyebrow.length > 0, `${locale}.json ${pagePath} must include intro.eyebrow`)
    assert(typeof page.intro?.heading === 'string' && page.intro.heading.length > 0, `${locale}.json ${pagePath} must include intro.heading`)
    assert(typeof page.intro?.summary === 'string' && page.intro.summary.length > 0, `${locale}.json ${pagePath} must include intro.summary`)
  }

  assertMessageRecords(messages, locale, 'learningPaths', requiredLearningPathIds, ['title', 'summary'])
  assertArrayMessageRecords(messages, locale, 'learningPaths', requiredLearningPathIds, ['proofCues'])
  assertMessageRecords(messages, locale, 'priceItems', requiredPriceItemIds, ['label', 'value', 'caption'])
  assertMessageRecords(messages, locale, 'teacherProfiles', requiredTeacherProfileIds, ['name', 'role', 'bio'])
  assertArrayMessageRecords(messages, locale, 'teacherProfiles', requiredTeacherProfileIds, ['credentials'])
  assertMessageRecords(messages, locale, 'proofAssets', requiredProofAssetIds, ['title', 'caption', 'alt'])
  assertMessageRecords(messages, locale, 'testimonials', requiredTestimonialIds, ['quote', 'sourceLabel'])
  assertMessageRecords(messages, locale, 'faqItems', requiredFaqItemIds, ['question', 'answer'])
  assertMessageRecords(messages, locale, 'assets', requiredAssetIds, ['alt'])
}

function assertMessageRecords(messages, locale, section, ids, fields) {
  assert(typeof messages[section] === 'object' && messages[section] !== null, `${locale}.json must contain ${section}`)

  for (const id of ids) {
    const record = messages[section][id]

    assert(record, `${locale}.json ${section}.${id} must exist`)

    for (const field of fields) {
      assert(typeof record[field] === 'string' && record[field].length > 0, `${locale}.json ${section}.${id}.${field} must be a non-empty string`)
    }
  }
}

function assertArrayMessageRecords(messages, locale, section, ids, fields) {
  for (const id of ids) {
    const record = messages[section]?.[id]

    assert(record, `${locale}.json ${section}.${id} must exist`)

    for (const field of fields) {
      assert(Array.isArray(record[field]) && record[field].length > 0, `${locale}.json ${section}.${id}.${field} must be a non-empty array`)
      assert(record[field].every((item) => typeof item === 'string' && item.length > 0), `${locale}.json ${section}.${id}.${field} must contain only non-empty strings`)
    }
  }
}

function assertNoPrimitiveRouteCopy() {
  const primitiveFiles = [
    ...listFiles(resolve(root, 'app/components/ui')),
    ...listFiles(resolve(root, 'app/components/sections'))
  ].filter((path) => /\.(?:vue|ts)$/.test(path))

  for (const path of primitiveFiles) {
    const source = readFileSync(path, 'utf8')
    const label = relative(root, path)

    assert(!source.includes('~/data/site-content'), `${label} must not import route-specific content`)
    assert(!source.includes('@/data/site-content'), `${label} must not import route-specific content`)
    assert(!/(Learning Paths|Teachers & Proof|Trial & Pricing|Programs|Pricing)/.test(source), `${label} must not own route-specific public copy`)
  }
}

function assertNoLocaleRouteFiles() {
  const pageFiles = listFiles(resolve(root, 'app/pages'))
    .map((path) => relative(resolve(root, 'app/pages'), path))

  for (const pageFile of pageFiles) {
    assert(!/^(?:uk|en)\//.test(pageFile), `Locale-prefixed route file is not allowed: app/pages/${pageFile}`)
    assert(!/^\[\[?locale\]?\]\//.test(pageFile), `Dynamic locale route wrapper is not allowed: app/pages/${pageFile}`)
  }
}

function assertPublicRouteFiles() {
  const expectedRouteFiles = [
    files.indexPage,
    files.programsPage,
    files.teachersPage,
    files.pricingPage
  ]
  const legacyRouteFiles = [
    'learning-paths.vue',
    'teachers-proof.vue',
    'trial-pricing.vue'
  ]

  for (const path of expectedRouteFiles) {
    assertFile(path)
  }

  for (const filename of legacyRouteFiles) {
    const path = resolve(root, 'app/pages', filename)

    assert(!existsSync(path), `Legacy route file must not exist: app/pages/${filename}`)
  }
}

assertFile(files.packageJson)

const packageJson = JSON.parse(read(files.packageJson))
const scripts = packageJson.scripts ?? {}
const dependencies = {
  ...(packageJson.dependencies ?? {}),
  ...(packageJson.devDependencies ?? {})
}

assert(
  scripts['test:content-locale'] === 'node scripts/verify-content-locale-and-seo.mjs',
  'package.json must expose npm run test:content-locale'
)

assert(
  typeof dependencies['@nuxtjs/i18n'] === 'string',
  'package.json must include @nuxtjs/i18n'
)

const nuxtConfig = read(files.nuxtConfig)
const i18nConfig = read(files.i18nConfig)
const messageAdapter = read(files.messageAdapter)
const ukMessages = readJson(files.ukMessages)
const enMessages = readJson(files.enMessages)
const pageContentAdapter = read(files.pageContentAdapter)
const localizedContentAdapter = read(files.localizedContentAdapter)
const siteContent = read(files.siteContent)
const contentIndex = read(files.contentIndex)
const contentTypes = read(files.contentTypes)
const contentPages = read(files.contentPages)
const contentLearningPaths = read(files.contentLearningPaths)
const contentPricing = read(files.contentPricing)
const contentTeachers = read(files.contentTeachers)
const contentProof = read(files.contentProof)
const contentTestimonials = read(files.contentTestimonials)
const contentFaq = read(files.contentFaq)
const assetManifest = read(files.assetManifest)
const useLocale = read(files.useLocale)
const useSeo = read(files.useSeo)

assertPattern(nuxtConfig, /modules:\s*\[[\s\S]*['"]@nuxtjs\/i18n['"]/, 'nuxt.config.ts must register @nuxtjs/i18n')
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*defaultLocale:\s*['"]uk['"]/, 'Nuxt i18n defaultLocale must be uk')
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*strategy:\s*['"]no_prefix['"]/, 'Nuxt i18n must preserve route structure with no_prefix strategy')
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*detectBrowserLanguage:\s*false/, 'Nuxt i18n browser detection must be disabled so uk stays the default')
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*langDir:\s*['"]locales['"]/, 'Nuxt i18n must load locale files from i18n/locales')
assertPattern(nuxtConfig, /code:\s*['"]uk['"][\s\S]*code:\s*['"]en['"]/, 'Nuxt i18n locales must include uk and en')
assertPattern(nuxtConfig, /code:\s*['"]uk['"][\s\S]*file:\s*['"]uk\.json['"]/, 'Nuxt i18n must load Ukrainian messages from uk.json')
assertPattern(nuxtConfig, /code:\s*['"]en['"][\s\S]*file:\s*['"]en\.json['"]/, 'Nuxt i18n must load English messages from en.json')
assertPattern(i18nConfig, /locale:\s*['"]uk['"]/, 'i18n config must initialize locale as uk')
assertPattern(i18nConfig, /fallbackLocale:\s*['"]uk['"]/, 'i18n config must fall back to uk')
assert(!/messages\s*:/.test(i18nConfig), 'i18n config should not inline messages when locale JSON files are configured')
assertPattern(messageAdapter, /uk\.json/, 'message adapter must import uk.json')
assertPattern(messageAdapter, /en\.json/, 'message adapter must import en.json')
assertPattern(messageAdapter, /export const localeMessages\b/, 'message adapter must expose localeMessages')
assertPattern(messageAdapter, /getRouteMessage/, 'message adapter must expose route message lookup')
assertPattern(messageAdapter, /getLearningPathMessage/, 'message adapter must expose learning path message lookup')
assertPattern(messageAdapter, /getPriceItemMessage/, 'message adapter must expose price item message lookup')
assertPattern(messageAdapter, /getTeacherProfileMessage/, 'message adapter must expose teacher profile message lookup')
assertPattern(messageAdapter, /getProofAssetMessage/, 'message adapter must expose proof asset message lookup')
assertPattern(messageAdapter, /getTestimonialMessage/, 'message adapter must expose testimonial message lookup')
assertPattern(messageAdapter, /getFaqItemMessage/, 'message adapter must expose FAQ message lookup')
assertPattern(messageAdapter, /getAssetMessage/, 'message adapter must expose asset message lookup')
assertLocaleMessageTree(ukMessages, 'uk')
assertLocaleMessageTree(enMessages, 'en')
assertPattern(pageContentAdapter, /getRouteMessage/, 'page content adapter must be backed by locale JSON messages')
assertPattern(pageContentAdapter, /getLocalizedPageContent/, 'page content adapter must expose localized page content')
assertPattern(pageContentAdapter, /getPageSeo/, 'page content adapter must expose a pure SEO metadata reader')
assertPattern(pageContentAdapter, /throw new Error\(`Missing page content for path:/, 'page content adapter must fail explicitly for unknown paths')
assertPattern(localizedContentAdapter, /getLocalizedLearningPaths/, 'localized content adapter must expose localized learning paths')
assertPattern(localizedContentAdapter, /getLocalizedPriceItems/, 'localized content adapter must expose localized price items')
assertPattern(localizedContentAdapter, /getLocalizedTeacherProfiles/, 'localized content adapter must expose localized teacher profiles')
assertPattern(localizedContentAdapter, /getLocalizedProofAssets/, 'localized content adapter must expose localized proof assets')
assertPattern(localizedContentAdapter, /getLocalizedTestimonials/, 'localized content adapter must expose localized testimonials')
assertPattern(localizedContentAdapter, /getLocalizedFaqItems/, 'localized content adapter must expose localized FAQ items')
assertPattern(localizedContentAdapter, /getLocalizedAssetManifest/, 'localized content adapter must expose localized asset metadata')

assert(siteContent.trim() === "export * from './content'", 'site-content.ts must stay a tiny compatibility barrel')
assertPattern(contentIndex, /export \* from ['"]\.\/types['"]/, 'content index must export types')
assertPattern(contentIndex, /export \* from ['"]\.\/pages['"]/, 'content index must export pages')
assertPattern(contentIndex, /export \* from ['"]\.\/learning-paths['"]/, 'content index must export learning paths')
assertPattern(contentIndex, /export \* from ['"]\.\/pricing['"]/, 'content index must export pricing')
assertPattern(contentIndex, /export \* from ['"]\.\/teachers['"]/, 'content index must export teachers')
assertPattern(contentIndex, /export \* from ['"]\.\/proof['"]/, 'content index must export proof')
assertPattern(contentIndex, /export \* from ['"]\.\/testimonials['"]/, 'content index must export testimonials')
assertPattern(contentIndex, /export \* from ['"]\.\/faq['"]/, 'content index must export FAQ')

assertPattern(contentTypes, /export const SUPPORTED_LOCALES\s*=\s*\[\s*'uk'\s*,\s*'en'\s*\]/, 'Supported locales must be uk and en')
assertPattern(contentTypes, /export const DEFAULT_LOCALE\s*=\s*'uk'/, 'Ukrainian must be the default locale')
assertPattern(contentTypes, /export type SourceStatus\s*=[\s\S]*'approved'[\s\S]*'mock'[\s\S]*'hidden'[\s\S]*'needs_input'[\s\S]*'needs_review'/, 'SourceStatus must include every allowed launch status')
assertPattern(contentPages, /findPageContentByPath[\s\S]*sitePages\.find/, 'pages.ts must resolve dynamic route paths without unsafe key casts')
assertPattern(contentPages, /getPageContentByPath/, 'pages.ts must expose exact PagePath lookup for known paths')
assert(!contentPages.includes('Object.fromEntries'), 'pages.ts must not build casted page lookup objects')
assert(!contentPages.includes('path as PagePath'), 'pages.ts must not cast arbitrary route paths to PagePath')

for (const typeName of requiredTypes) {
  assertPattern(contentTypes, new RegExp(`export type ${typeName}\\b`), `types.ts must export ${typeName}`)
}

for (const pagePath of requiredPagePaths) {
  const escapedPath = pagePath.replace('/', '\\/')

  assertPattern(contentPages, new RegExp(`path:\\s*'${escapedPath}'`), `pages.ts must define a page record for ${pagePath}`)
}

assertPattern(contentLearningPaths, /export const learningPaths\b/, 'learning-paths.ts must export learningPaths')

const launchSensitiveSources = {
  contentPricing,
  contentTeachers,
  contentProof,
  contentTestimonials,
  contentFaq,
  assetManifest
}

for (const collection of launchSensitiveCollections) {
  assertEveryArrayRecordHasSourceStatus(
    launchSensitiveSources[collection.sourceKey],
    collection.exportName,
    collection.label
  )
}

assertNoInlineLocalizedCopy(siteContent, 'site-content.ts')
assertNoInlineLocalizedCopy(contentTypes, 'content/types.ts')
assertNoInlineLocalizedCopy(contentPages, 'content/pages.ts')
assertNoInlineLocalizedCopy(contentLearningPaths, 'content/learning-paths.ts')
assertNoInlineLocalizedCopy(contentPricing, 'content/pricing.ts')
assertNoInlineLocalizedCopy(contentTeachers, 'content/teachers.ts')
assertNoInlineLocalizedCopy(contentProof, 'content/proof.ts')
assertNoInlineLocalizedCopy(contentTestimonials, 'content/testimonials.ts')
assertNoInlineLocalizedCopy(contentFaq, 'content/faq.ts')
assertNoInlineLocalizedCopy(assetManifest, 'asset-manifest.ts')

assertPattern(assetManifest, /import type \{[\s\S]*SourceStatus[\s\S]*\} from ['"]~\/data\/content['"]/, 'asset-manifest.ts must reuse SourceStatus from content types')
assertPattern(assetManifest, /export type AssetManifestEntry\b/, 'asset-manifest.ts must export AssetManifestEntry')
assertPattern(assetManifest, /export const assetManifest\b/, 'asset-manifest.ts must export assetManifest')
assert(!/alt:\s*['"]/.test(assetManifest), 'Asset manifest public alt text must live in locale JSON files')

assertPattern(useLocale, /resolveLocale/, 'useLocale.ts must export a locale resolver')
assertPattern(useLocale, /DEFAULT_LOCALE/, 'useLocale.ts must use the default locale constant')
assertPattern(useLocale, /lang/, 'useLocale.ts must read and write the lang query key')
assertPattern(useLocale, /value\s*===\s*'en'|includes\(value as Locale\)/, 'useLocale.ts must support lang=en')
assertPattern(useLocale, /DEFAULT_LOCALE|return 'uk'/, 'useLocale.ts must fall back to uk for unsupported locales')
assertPattern(useLocale, /useI18n/, 'useLocale.ts must use Nuxt i18n locale state')
assertPattern(useLocale, /setLocale|setI18nLocale/, 'useLocale.ts must update locale through Nuxt i18n')
assertPattern(useLocale, /path:\s*route\.path/, 'useLocale.ts must preserve route path when switching language')

assertPattern(useSeo, /useSeoMeta|useHead/, 'useSeo.ts must call one Nuxt SEO helper')
assertPattern(useSeo, /getPageSeo/, 'useSeo.ts must expose a pure SEO metadata reader')
assertPattern(useSeo, /useLocale/, 'useSeo.ts must follow the active locale')
assertPattern(useSeo, /page-content-adapter/, 'useSeo.ts must read metadata through the i18n-backed page adapter')

const pageSeoCalls = [
  [files.indexPage, "\\/"],
  [files.programsPage, "\\/programs"],
  [files.teachersPage, "\\/teachers"],
  [files.pricingPage, "\\/pricing"]
]

for (const [path, routePath] of pageSeoCalls) {
  const source = read(path)
  const label = relative(root, path)

  assertPattern(source, new RegExp(`useSeo\\(['"]${routePath}['"]\\)`), `${label} must call useSeo for its content route`)
}

assertNoLocaleRouteFiles()
assertPublicRouteFiles()
assertNoPrimitiveRouteCopy()

console.log('Typed content, locale, asset metadata, and SEO verification passed')
