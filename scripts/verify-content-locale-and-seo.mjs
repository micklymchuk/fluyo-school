import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  nuxtConfig: resolve(root, 'nuxt.config.ts'),
  i18nConfig: resolve(root, 'app/i18n/i18n.config.ts'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
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
const requiredPriceItemIds = ['TRIAL', 'EXAM_PREP', 'MINI_GROUP', 'INDIVIDUAL', 'SPEAKING_CLUB']
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
const requiredHomeSectionIds = ['hero', 'pathCards', 'proofSnapshot', 'trialPricing']

const forbiddenRuntimeI18nAdapters = [
  resolve(root, 'app/i18n/messages.ts'),
  resolve(root, 'app/data/localized-content-adapter.ts'),
  resolve(root, 'app/data/page-content-adapter.ts')
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

function assertMissingFile(path) {
  assert(!existsSync(path), `Custom runtime i18n adapter must not exist: ${relative(root, path)}`)
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

function assertAssetManifestSrcFilesExist(source) {
  const srcValues = [...source.matchAll(/src:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])

  assert(srcValues.length > 0, 'asset-manifest.ts must list public asset files')

  for (const src of srcValues) {
    assert(src.startsWith('/'), `asset-manifest.ts src must use an absolute public path: ${src}`)
    assertFile(resolve(root, 'public', src.slice(1)))
  }
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
  assertMessageRecords(messages, locale, 'priceItems', requiredPriceItemIds, ['label', 'caption'])
  assertPriceFormatMessages(messages, locale)
  assertMessageRecords(messages, locale, 'teacherProfiles', requiredTeacherProfileIds, ['name', 'role', 'bio'])
  assertArrayMessageRecords(messages, locale, 'teacherProfiles', requiredTeacherProfileIds, ['credentials'])
  assertMessageRecords(messages, locale, 'proofAssets', requiredProofAssetIds, ['title', 'caption', 'alt'])
  assertMessageRecords(messages, locale, 'testimonials', requiredTestimonialIds, ['quote', 'sourceLabel'])
  assertMessageRecords(messages, locale, 'faqItems', requiredFaqItemIds, ['question', 'answer'])
  assertMessageRecords(messages, locale, 'assets', requiredAssetIds, ['alt'])
}

function assertPriceFormatMessages(messages, locale) {
  const priceFormat = messages.priceFormat

  assert(typeof priceFormat === 'object' && priceFormat !== null, `${locale}.json must contain priceFormat templates`)

  for (const field of ['free', 'from', 'exact', 'value']) {
    assert(typeof priceFormat[field] === 'string' && priceFormat[field].length > 0, `${locale}.json priceFormat.${field} must be a non-empty string`)
  }

  assert(typeof priceFormat.currencies?.UAH === 'string' && priceFormat.currencies.UAH.length > 0, `${locale}.json priceFormat.currencies.UAH must be a non-empty string`)

  for (const unit of ['thirty-minutes', 'sixty-minutes', 'learner', 'meeting']) {
    assert(typeof priceFormat.units?.[unit] === 'string' && priceFormat.units[unit].length > 0, `${locale}.json priceFormat.units.${unit} must be a non-empty string`)
  }
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

function getMessageShape(value) {
  if (Array.isArray(value)) {
    return value.map((item) => getMessageShape(item))
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, getMessageShape(value[key])])
    )
  }

  return typeof value
}

function assertEquivalentMessageShape(left, right, leftLabel, rightLabel) {
  assert(
    JSON.stringify(getMessageShape(left)) === JSON.stringify(getMessageShape(right)),
    `${leftLabel} and ${rightLabel} must keep equivalent message structure`
  )
}

function assertHomeSectionMessages(messages, locale) {
  assert(typeof messages.homeSections === 'object' && messages.homeSections !== null, `${locale}.json must contain homeSections messages`)

  for (const id of requiredHomeSectionIds) {
    assert(messages.homeSections[id], `${locale}.json homeSections.${id} must exist`)
  }

  const hero = messages.homeSections.hero
  for (const field of ['pathLabel', 'trialLabel', 'primaryCta', 'telegramCta', 'visualAlt', 'signalsAriaLabel']) {
    assert(typeof hero[field] === 'string' && hero[field].length > 0, `${locale}.json homeSections.hero.${field} must be a non-empty string`)
  }

  const pathCards = messages.homeSections.pathCards
  for (const field of ['eyebrow', 'title', 'description', 'cardCta']) {
    assert(typeof pathCards[field] === 'string' && pathCards[field].length > 0, `${locale}.json homeSections.pathCards.${field} must be a non-empty string`)
  }

  const proofSnapshot = messages.homeSections.proofSnapshot
  for (const field of ['eyebrow', 'title', 'description']) {
    assert(typeof proofSnapshot[field] === 'string' && proofSnapshot[field].length > 0, `${locale}.json homeSections.proofSnapshot.${field} must be a non-empty string`)
  }

  assert(Array.isArray(proofSnapshot.items) && proofSnapshot.items.length === 3, `${locale}.json homeSections.proofSnapshot.items must contain three items`)
  for (const item of proofSnapshot.items) {
    for (const field of ['title', 'body', 'status']) {
      assert(typeof item[field] === 'string' && item[field].length > 0, `${locale}.json homeSections.proofSnapshot.items.${field} must be a non-empty string`)
    }
  }

  const trialPricing = messages.homeSections.trialPricing
  for (const field of ['eyebrow', 'title', 'description', 'formatSignalsAriaLabel', 'pricingCta', 'telegramCta']) {
    assert(typeof trialPricing[field] === 'string' && trialPricing[field].length > 0, `${locale}.json homeSections.trialPricing.${field} must be a non-empty string`)
  }

  assert(Array.isArray(trialPricing.formatSignals) && trialPricing.formatSignals.length === 2, `${locale}.json homeSections.trialPricing.formatSignals must contain two signals`)
  assert(trialPricing.formatSignals.every((item) => typeof item === 'string' && item.length > 0), `${locale}.json homeSections.trialPricing.formatSignals must contain only non-empty strings`)
}

function assertNoPrimitiveRouteCopy() {
  const primitiveFiles = [
    ...listFiles(resolve(root, 'app/components/ui'))
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
const ukMessages = readJson(files.ukMessages)
const enMessages = readJson(files.enMessages)
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
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*restructureDir:\s*['"]app\/i18n['"]/, 'Nuxt i18n must keep i18n files under app/i18n')
assertPattern(nuxtConfig, /i18n:\s*\{[\s\S]*langDir:\s*['"]locales['"]/, 'Nuxt i18n must load locale files from app/i18n/locales')
assertPattern(nuxtConfig, /code:\s*['"]uk['"][\s\S]*code:\s*['"]en['"]/, 'Nuxt i18n locales must include uk and en')
assertPattern(nuxtConfig, /code:\s*['"]uk['"][\s\S]*file:\s*['"]uk\.json['"]/, 'Nuxt i18n must load Ukrainian messages from uk.json')
assertPattern(nuxtConfig, /code:\s*['"]en['"][\s\S]*file:\s*['"]en\.json['"]/, 'Nuxt i18n must load English messages from en.json')
assertPattern(i18nConfig, /locale:\s*['"]uk['"]/, 'i18n config must initialize locale as uk')
assertPattern(i18nConfig, /fallbackLocale:\s*['"]uk['"]/, 'i18n config must fall back to uk')
assert(!/messages\s*:/.test(i18nConfig), 'i18n config should not inline messages when locale JSON files are configured')
for (const path of forbiddenRuntimeI18nAdapters) {
  assertMissingFile(path)
}
assertLocaleMessageTree(ukMessages, 'uk')
assertLocaleMessageTree(enMessages, 'en')
assertHomeSectionMessages(ukMessages, 'uk')
assertHomeSectionMessages(enMessages, 'en')
assertEquivalentMessageShape(ukMessages.homeSections, enMessages.homeSections, 'uk.json homeSections', 'en.json homeSections')

assert(siteContent.trim() === "export * from './content'", 'site-content.ts must stay a tiny compatibility barrel')
assertPattern(contentIndex, /export \* from ['"]\.\/types['"]/, 'content index must export types')
assertPattern(contentIndex, /export \* from ['"]\.\/pages['"]/, 'content index must export pages')
assertPattern(contentIndex, /export \* from ['"]\.\/learning-paths['"]/, 'content index must export learning paths')
assertPattern(contentIndex, /export \* from ['"]\.\/pricing['"]/, 'content index must export pricing')
assertPattern(contentIndex, /export \* from ['"]\.\/teachers['"]/, 'content index must export teachers')
assertPattern(contentIndex, /export \* from ['"]\.\/proof['"]/, 'content index must export proof')
assertPattern(contentIndex, /export \* from ['"]\.\/testimonials['"]/, 'content index must export testimonials')
assertPattern(contentIndex, /export \* from ['"]\.\/faq['"]/, 'content index must export FAQ')
assert(!contentIndex.includes('source-' + 'status'), 'content index must not export removed status helpers')

assertPattern(contentTypes, /export const SUPPORTED_LOCALES\s*=\s*\[\s*'uk'\s*,\s*'en'\s*\]/, 'Supported locales must be uk and en')
assertPattern(contentTypes, /export const DEFAULT_LOCALE\s*=\s*'uk'/, 'Ukrainian must be the default locale')
assert(!new RegExp(`Source${'Status'}|Render${'Mode'}`).test(contentTypes), 'content types must not include removed status or mode types')
assertPattern(contentTypes, /export type CtaIntent = \{[\s\S]*path: PagePath[\s\S]*format: CtaFormat[\s\S]*sourceRoute: PageRouteId[\s\S]*messageIntent: MessageIntent[\s\S]*\}/, 'CtaIntent must keep locale-neutral structural CTA metadata')
assert(!/export type CtaIntent = \{[\s\S]*locale: Locale[\s\S]*\}/.test(contentTypes), 'CtaIntent must not store locale-specific values')
assertPattern(contentTypes, /ctaIntent: CtaIntent/, 'LearningPath must reference a single locale-neutral CtaIntent')
assert(!/ctaIntent: Record<Locale, CtaIntent>/.test(contentTypes), 'LearningPath must not store per-locale CTA intent records')
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

assertPattern(contentPricing, /export const PRICES_CONFIG\b/, 'pricing.ts must export the PRICES_CONFIG price data')
for (const priceItemId of requiredPriceItemIds) {
  assertPattern(contentPricing, new RegExp(`\\b${priceItemId}\\b:\\s*\\{`), `pricing.ts PRICES_CONFIG must configure ${priceItemId}`)
}

assertPattern(contentLearningPaths, /export const learningPaths\b/, 'learning-paths.ts must export learningPaths')
assertPattern(contentLearningPaths, /ctaIntent\('\/programs', 'programs', 'ask_program'\)/, 'learning-paths.ts must keep exam/adult CTA intent locale-neutral')
assertPattern(contentLearningPaths, /ctaIntent\('\/programs', 'programs', 'book_trial'\)/, 'learning-paths.ts must keep kids CTA intent locale-neutral')
assert(!/ctaIntent:\s*\{[\s\S]*(?:uk|en):/.test(contentLearningPaths), 'learning-paths.ts must not store per-locale CTA intent branches')
assert(!/locale:\s*['"](?:uk|en)['"]/.test(contentLearningPaths), 'learning-paths.ts must not hard-code CTA locales')

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

const blockedMetadataTokens = [
  'source' + 'Status',
  'required' + 'ForLaunch',
  'needs' + '_input',
  'needs' + '_review',
  'mo' + 'ck',
  'approval' + 'Status',
  'privacy' + 'Status',
  'permission' + 'Status'
]
const assertNoRemovedMetadata = (source, label) => {
  for (const token of blockedMetadataTokens) {
    assert(!source.includes(token), `${label} must use production records without removed metadata`)
  }
}

assertNoRemovedMetadata(contentPricing, 'content/pricing.ts')
assertNoRemovedMetadata(contentTeachers, 'content/teachers.ts')
assertNoRemovedMetadata(contentProof, 'content/proof.ts')
assertNoRemovedMetadata(contentTestimonials, 'content/testimonials.ts')
assertNoRemovedMetadata(contentFaq, 'content/faq.ts')
assertNoRemovedMetadata(assetManifest, 'asset-manifest.ts')
assertPattern(assetManifest, /export type AssetManifestEntry\b/, 'asset-manifest.ts must export AssetManifestEntry')
assertPattern(assetManifest, /export const assetManifest\b/, 'asset-manifest.ts must export assetManifest')
assert(!/alt:\s*['"]/.test(assetManifest), 'Asset manifest public alt text must live in locale JSON files')
assertAssetManifestSrcFilesExist(assetManifest)

assertPattern(useLocale, /resolveLocale/, 'useLocale.ts must export a locale resolver')
assertPattern(useLocale, /DEFAULT_LOCALE/, 'useLocale.ts must use the default locale constant')
assertPattern(useLocale, /lang/, 'useLocale.ts must read and write the lang query key')
assertPattern(useLocale, /value\s*===\s*'en'|includes\(value as Locale\)/, 'useLocale.ts must support lang=en')
assertPattern(useLocale, /DEFAULT_LOCALE|return 'uk'/, 'useLocale.ts must fall back to uk for unsupported locales')
assertPattern(useLocale, /useI18n/, 'useLocale.ts must use Nuxt i18n locale state')
assertPattern(useLocale, /setLocale|setI18nLocale/, 'useLocale.ts must update locale through Nuxt i18n')
assertPattern(useLocale, /path:\s*route\.path/, 'useLocale.ts must preserve route path when switching language')

assertPattern(useSeo, /useSeoMeta|useHead/, 'useSeo.ts must call one Nuxt SEO helper')
assertPattern(useSeo, /useLocale/, 'useSeo.ts must follow the active locale')
assertPattern(useSeo, /useI18n/, 'useSeo.ts must use Nuxt i18n directly')
assertPattern(useSeo, /t\(`pages\.\$\{routeKey\}\.seo\.title`\)/, 'useSeo.ts must read SEO title through t()')
assertPattern(useSeo, /t\(`pages\.\$\{routeKey\}\.seo\.description`\)/, 'useSeo.ts must read SEO description through t()')
assert(!/page-content-adapter|localized-content-adapter|i18n\/messages|getLocalized|getPageSeo|localeMessages/.test(useSeo), 'useSeo.ts must not use custom i18n adapters')

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
