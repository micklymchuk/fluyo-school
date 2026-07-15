import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  indexPage: resolve(root, 'app/pages/index.vue'),
  homeHero: resolve(root, 'app/components/sections/HomeHeroSection.vue'),
  homePathCards: resolve(root, 'app/components/sections/HomePathCardsSection.vue'),
  homeLessons: resolve(root, 'app/components/sections/HomeLessonsSection.vue'),
  homeSpeakingClub: resolve(root, 'app/components/sections/HomeSpeakingClubSection.vue'),
  homeReviews: resolve(root, 'app/components/sections/HomeReviewsSection.vue'),
  homeTrialPricing: resolve(root, 'app/components/sections/HomeTrialPricingSection.vue'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
  defaultLayout: resolve(root, 'app/layouts/default.vue'),
  appHeader: resolve(root, 'app/components/navigation/AppHeader.vue'),
  footerContactStrip: resolve(root, 'app/components/navigation/FooterContactStrip.vue'),
  navigationLinks: resolve(root, 'app/components/navigation/navigationLinks.ts'),
  learningPaths: resolve(root, 'app/data/content/learning-paths.ts')
}

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

function assertNotIncludes(source, value, label) {
  assert(!source.includes(value), `${label} must not include ${value}`)
}

function assertPattern(source, pattern, label) {
  assert(pattern.test(source), label)
}

function assertOrdered(source, values, label) {
  let cursor = -1

  for (const value of values) {
    const nextIndex = source.indexOf(value, cursor + 1)

    assert(nextIndex > cursor, `${label} must render ${values.join(', ')} in order`)
    cursor = nextIndex
  }
}

function assertNoLocalBilingualCopy(source, label) {
  const blockedCopyObjects = ['heroCopy', 'sectionCopy', 'proofItems', 'pricingSummaryCopy']

  for (const objectName of blockedCopyObjects) {
    assertNotIncludes(source, objectName, `${label} local copy`)
  }

  assert(!/Record<Locale,/.test(source), `${label} must not type component-local bilingual copy`)
  assert(!/^\s*uk:\s*\{/m.test(source), `${label} must not define local Ukrainian copy objects`)
  assert(!/^\s*en:\s*\{/m.test(source), `${label} must not define local English copy objects`)
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not contain Ukrainian public copy`)
  assert(!/getLocalized|localized-content-adapter|page-content-adapter|i18n\/messages/.test(source), `${label} must not use custom i18n adapters`)
}

function assertNonEmptyString(value, label) {
  assert(typeof value === 'string' && value.length > 0, `${label} must be a non-empty string`)
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

function assertHomeSectionMessages(messages, locale) {
  assert(typeof messages.homeSections === 'object' && messages.homeSections !== null, `${locale}.json must contain homeSections`)

  for (const field of ['scriptWord', 'primaryCta', 'telegramCta']) {
    assertNonEmptyString(messages.homeSections.hero?.[field], `${locale}.json homeSections.hero.${field}`)
  }

  for (const field of ['eyebrow', 'title', 'description', 'cardCta']) {
    assertNonEmptyString(messages.homeSections.pathCards?.[field], `${locale}.json homeSections.pathCards.${field}`)
  }

  const lessons = messages.homeSections.lessons
  for (const field of ['eyebrow', 'title', 'description']) {
    assertNonEmptyString(lessons?.[field], `${locale}.json homeSections.lessons.${field}`)
  }

  assert(Array.isArray(lessons?.items) && lessons.items.length === 3, `${locale}.json homeSections.lessons.items must contain three items`)
  for (const item of lessons.items) {
    for (const field of ['title', 'body']) {
      assertNonEmptyString(item[field], `${locale}.json homeSections.lessons.items.${field}`)
    }
  }

  const speakingClub = messages.homeSections.speakingClub
  for (const field of ['capsWord', 'scriptWord', 'noteText', 'line', 'telegramCta']) {
    assertNonEmptyString(speakingClub?.[field], `${locale}.json homeSections.speakingClub.${field}`)
  }

  const reviews = messages.homeSections.reviews
  for (const field of ['eyebrow', 'title', 'scriptWord', 'description']) {
    assertNonEmptyString(reviews?.[field], `${locale}.json homeSections.reviews.${field}`)
  }

  const trialPricing = messages.homeSections.trialPricing
  for (const field of ['eyebrow', 'title', 'description', 'trialBadge', 'trialValue', 'trialUnit', 'formatSignalsAriaLabel', 'pricingCta', 'telegramCta']) {
    assertNonEmptyString(trialPricing?.[field], `${locale}.json homeSections.trialPricing.${field}`)
  }

  assert(Array.isArray(trialPricing?.formatSignals) && trialPricing.formatSignals.length === 2, `${locale}.json homeSections.trialPricing.formatSignals must contain two signals`)
  for (const signal of trialPricing.formatSignals) {
    assertNonEmptyString(signal, `${locale}.json homeSections.trialPricing.formatSignals item`)
  }
}

function verifyPackageScript() {
  const packageJson = read(files.packageJson)

  assertPattern(
    packageJson,
    /"test:home-route":\s*"node scripts\/verify-home-route\.mjs"/,
    'package.json must expose test:home-route'
  )
}

function verifyShellContracts() {
  const defaultLayout = read(files.defaultLayout)
  const appHeader = read(files.appHeader)
  const footer = read(files.footerContactStrip)
  const navigationLinks = read(files.navigationLinks)

  assertPattern(defaultLayout, /<AppHeader\s*\/>/, 'default layout must render the global header')
  assertPattern(defaultLayout, /<FooterContactStrip\s*\/>/, 'default layout must render the footer contact strip')

  for (const link of ['Home', 'Learning Paths', 'Teachers & Proof', 'Trial & Pricing']) {
    assertIncludes(navigationLinks, link, 'primary navigation')
  }

  assertPattern(appHeader, /LanguageControl/, 'header must expose the language control')
  assertPattern(appHeader, /instagram/i, 'header must expose Instagram')
  assertPattern(appHeader, /telegram/i, 'header must expose Telegram CTA')
  assertPattern(footer, /telegram/i, 'footer contact strip must expose Telegram CTA')
}

function verifyHomePageComposition() {
  const indexPage = read(files.indexPage)

  assertPattern(indexPage, /useSeo\(['"]\/['"]\)/, 'home page must register / SEO')
  assertOrdered(
    indexPage,
    [
      '<HomeHeroSection',
      '<HomePathCardsSection',
      '<HomeSpeakingClubSection',
      '<HomeTrialPricingSection',
      '<HomeLessonsSection',
      '<HomeReviewsSection'
    ],
    'home page'
  )
  assertNotIncludes(indexPage, 'NuxtWelcome', 'home page')
}

function verifyPathCards() {
  const homePathCards = read(files.homePathCards)
  const learningPaths = read(files.learningPaths)

  assertIncludes(learningPaths, "anchorId: 'exam-preparation'", 'exam learning path')
  assertIncludes(learningPaths, "anchorId: 'kids-parents'", 'kids learning path')
  assertIncludes(learningPaths, "anchorId: 'adults-speaking'", 'adult learning path')

  for (const route of ['/programs#exam-preparation', '/programs#kids-parents', '/programs#adults-speaking']) {
    assertIncludes(homePathCards, route, 'home path cards')
  }

  assertPattern(homePathCards, /NuxtLink/, 'path cards must be accessible links')
  assertPattern(homePathCards, /trackEvent\(['"]path_card_click['"]/, 'path cards must emit path_card_click')
  assertPattern(homePathCards, /route:\s*route\.fullPath/, 'path card tracking must include the current route')
  assertPattern(homePathCards, /locale:\s*locale\.value/, 'path card tracking must include locale')
  assertPattern(homePathCards, /path:\s*path\.id/, 'path card tracking must include path context')
}

function verifyBrandSections() {
  const homeLessons = read(files.homeLessons)
  const homeSpeakingClub = read(files.homeSpeakingClub)
  const homeReviews = read(files.homeReviews)

  assertPattern(homeLessons, /t\(`homeSections\.lessons\.items\[\$\{itemIndex\}\]\.title`\)/, 'lessons section must read item titles through t()')
  assertPattern(homeSpeakingClub, /useTelegramCta/, 'speaking club must use the Telegram CTA contract')
  assertPattern(homeReviews, /t\(`testimonials\.\$\{testimonial\.id\}\.quote`\)/, 'reviews section must read testimonial quotes through t()')
}

function verifyTrialPricing() {
  const homeTrialPricing = read(files.homeTrialPricing)

  assertPattern(homeTrialPricing, /useI18n\(\)/, 'trial pricing must use Nuxt i18n')
  assertPattern(homeTrialPricing, /t\(`priceItems\.\$\{item\.id\}\.label`\)/, 'trial pricing must read labels through t()')
  assertPattern(homeTrialPricing, /:value="priceValue\(item\.id\)"/, 'trial pricing must resolve values through the shared price config')
  assertPattern(homeTrialPricing, /t\(`priceItems\.\$\{item\.id\}\.caption`\)/, 'trial pricing must read captions through t()')
  assertPattern(homeTrialPricing, /trackEvent\(['"]pricing_summary_view['"]/, 'trial pricing must emit pricing_summary_view')
  assertPattern(homeTrialPricing, /IntersectionObserver|onMounted/, 'trial pricing must track when observed or mounted')
  assertPattern(homeTrialPricing, /\/pricing/, 'trial pricing must route to the pricing page')
}

function verifyLocalization() {
  const homeSections = [
    [files.homeHero, 'home hero'],
    [files.homePathCards, 'home path cards'],
    [files.homeLessons, 'home lessons'],
    [files.homeSpeakingClub, 'home speaking club'],
    [files.homeReviews, 'home reviews'],
    [files.homeTrialPricing, 'home trial pricing']
  ]
  const ukMessages = readJson(files.ukMessages)
  const enMessages = readJson(files.enMessages)

  for (const path of forbiddenRuntimeI18nAdapters) {
    assertMissingFile(path)
  }

  for (const [path, label] of homeSections) {
    const source = read(path)

    assertNoLocalBilingualCopy(source, label)
    assertPattern(source, /useI18n\(\)/, `${label} must use Nuxt i18n directly`)
    assertPattern(source, /\bt\(/, `${label} must read public copy through t()`)
  }

  assertPattern(read(files.homeHero), /t\(['"]pages\.home\.intro\.heading['"]\)/, 'home hero must read page intro through t()')
  assertPattern(read(files.homePathCards), /t\(`learningPaths\.\$\{path\.id\}\.title`\)/, 'home path cards must read path titles through t()')
  assertHomeSectionMessages(ukMessages, 'uk')
  assertHomeSectionMessages(enMessages, 'en')
  assert(
    JSON.stringify(getMessageShape(ukMessages.homeSections)) === JSON.stringify(getMessageShape(enMessages.homeSections)),
    'uk.json and en.json homeSections must keep equivalent structure'
  )
}

verifyPackageScript()
verifyShellContracts()
verifyHomePageComposition()
verifyPathCards()
verifyBrandSections()
verifyTrialPricing()
verifyLocalization()

console.log('Home route verification passed')
