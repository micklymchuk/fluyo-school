import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  pricingPage: resolve(root, 'app/pages/pricing.vue'),
  pathContextComposable: resolve(root, 'app/composables/usePricingPathContext.ts'),
  trialSection: resolve(root, 'app/components/sections/pricing/PricingTrialSection.vue'),
  startOfferCard: resolve(root, 'app/components/pricing/PricingStartOfferCard.vue'),
  formatsSection: resolve(root, 'app/components/sections/pricing/PricingFormatsSection.vue'),
  formatCard: resolve(root, 'app/components/pricing/PricingFormatCard.vue'),
  packagesSection: resolve(root, 'app/components/sections/pricing/PricingPackagesSection.vue'),
  packageCard: resolve(root, 'app/components/pricing/PricingPackageCard.vue'),
  specialConditionsSection: resolve(root, 'app/components/sections/pricing/PricingSpecialConditionsSection.vue'),
  includedSection: resolve(root, 'app/components/sections/pricing/PricingIncludedSection.vue'),
  faqSection: resolve(root, 'app/components/sections/pricing/PricingFaqSection.vue'),
  faqItemComponent: resolve(root, 'app/components/pricing/PricingFaqItem.vue'),
  finalCtaSection: resolve(root, 'app/components/sections/pricing/PricingFinalCtaSection.vue'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  pricing: resolve(root, 'app/data/content/pricing.ts'),
  faq: resolve(root, 'app/data/content/faq.ts'),
  tracking: resolve(root, 'app/composables/useTracking.ts')
}

const pricingFormatIds = ['individual', 'mini-group', 'kids-group']
const priceItemIds = ['TRIAL', 'TRIAL_LESSON', 'EXAM_PREP', 'MINI_GROUP', 'KIDS_GROUP', 'INDIVIDUAL', 'PAIR']
const packageTrackIds = ['general', 'exam-prep']
const specialConditionIds = ['first-package', 'military-family']
const includedItemIds = ['teacher-matching', 'live-lesson', 'materials', 'feedback-progress']
const faqItemIds = [
  'enrollment',
  'consultation-vs-trial',
  'subscription-benefit',
  'teacher-match',
  'online-format',
  'why-miro',
  'progress-time',
  'pair-lessons',
  'format-choice'
]
const pathContexts = ['generic', 'exam', 'kids', 'adult']

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
  const source = read(path)

  try {
    return JSON.parse(source)
  } catch (error) {
    fail(`Invalid JSON in ${relative(root, path)}: ${error.message}`)
  }
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

function assertNonEmptyString(value, label) {
  assert(typeof value === 'string' && value.length > 0, `${label} must be a non-empty string`)
}

function getShape(value) {
  if (Array.isArray(value)) {
    return value.map((item) => getShape(item))
  }

  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, getShape(value[key])])
    )
  }

  return typeof value
}

function verifyPackageScript() {
  const packageJson = read(files.packageJson)

  assertPattern(
    packageJson,
    /"test:pricing-route":\s*"node scripts\/verify-pricing-route\.mjs"/,
    'package.json must expose test:pricing-route'
  )
}

function verifyPricingRoute() {
  const pricingPage = read(files.pricingPage)

  assertPattern(pricingPage, /useSeo\(['"]\/pricing['"]\)/, 'pricing page must register /pricing SEO')
  assertNotIncludes(pricingPage, 'route-shell-anchor', 'pricing page starter shell')
  assertNotIncludes(pricingPage, 'NuxtWelcome', 'pricing page')
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(pricingPage), 'pricing page must not hard-code Ukrainian public copy')

  assertOrdered(
    pricingPage,
    [
      '<PricingTrialSection',
      '<PricingFormatsSection',
      '<PricingPackagesSection',
      '<PricingSpecialConditionsSection',
      '<PricingIncludedSection',
      '<PricingFaqSection',
      '<PricingFinalCtaSection'
    ],
    'pricing page'
  )

  assertNotIncludes(pricingPage, '<UiSection', 'pricing page must compose section components instead of inline sections')
  assertPattern(pricingPage, /trackEvent\(['"]pricing_view['"]/, 'pricing page must emit pricing_view')
  assertPattern(pricingPage, /route:\s*route\.fullPath/, 'pricing_view must include current route')
  assertPattern(pricingPage, /locale:\s*locale\.value/, 'pricing_view must include locale')
  assertPattern(pricingPage, /usePricingPathContext\(/, 'pricing page must resolve path context through the shared composable')
}

function verifyPathContextComposable() {
  const composable = read(files.pathContextComposable)

  assertPattern(composable, /route\.query\.path/, 'path context composable must read the path query context')
  assertPattern(composable, /['"]generic['"]/, 'path context composable must fall back to generic context')
  assertPattern(composable, /learningPaths/, 'path context composable must validate paths against shared learning paths')
}

function verifySectionComponents() {
  const trialSection = read(files.trialSection)
  const formatsSection = read(files.formatsSection)
  const formatCard = read(files.formatCard)
  const includedSection = read(files.includedSection)
  const faqSection = read(files.faqSection)
  const faqItemComponent = read(files.faqItemComponent)
  const finalCtaSection = read(files.finalCtaSection)
  const localizedSections = [
    [trialSection, 'trial section'],
    [formatsSection, 'formats section'],
    [includedSection, 'included section'],
    [faqSection, 'faq section'],
    [finalCtaSection, 'final CTA section']
  ]

  for (const [source, label] of localizedSections) {
    assertPattern(source, /useI18n\(\)/, `${label} must use Nuxt i18n directly`)
    assertPattern(source, /\bt\(/, `${label} must read public copy through t()`)
  }

  for (const [source, label] of [...localizedSections, [formatCard, 'format card'], [faqItemComponent, 'faq item']]) {
    assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not hard-code Ukrainian public copy`)
  }

  assertIncludes(trialSection, 'pricing-page__trial', 'trial section')
  assertPattern(trialSection, /priceItemId: 'TRIAL'/, 'trial section must render the shared consultation price item')
  assertPattern(trialSection, /priceItemId: 'TRIAL_LESSON'/, 'trial section must offer the trial lesson next to the consultation')
  assertPattern(trialSection, /messageIntent: 'book_consultation'/, 'consultation CTA must carry the consultation intent')
  assertPattern(trialSection, /messageIntent: 'book_trial'/, 'trial lesson CTA must carry the trial booking intent')
  assertPattern(trialSection, /pathNotes/, 'trial section must adapt its helper note to path context')
  assertPattern(trialSection, /usePricingPathContext\(/, 'trial section must resolve path context through the shared composable')
  assertPattern(trialSection, /resolveTelegramCta\(/, 'trial section must build Telegram URLs through the shared contract')
  assertPattern(trialSection, /trackEvent\(['"]telegram_context['"]/, 'trial section must emit telegram_context on CTA clicks')
  assertPattern(trialSection, /trackEvent\(['"]telegram_click['"]/, 'trial section must emit telegram_click on CTA clicks')
  assertPattern(trialSection, /<PricingStartOfferCard/, 'trial section must compose the start offer card')
  assertPattern(trialSection, /@cta-click=/, 'trial section must handle the start offer CTA click emit')

  assertIncludes(formatsSection, 'pricing-page__formats', 'formats section')
  assertPattern(formatsSection, /pricingFormats/, 'formats section must render from shared pricing formats')
  assertPattern(formatsSection, /priceItems/, 'formats section must resolve prices from shared price items')
  assertPattern(formatsSection, /usePricingPathContext\(/, 'formats section must resolve path context through the shared composable')
  assertPattern(formatsSection, /resolveTelegramCta\(/, 'formats section must resolve Telegram CTAs through the shared contract')
  assertPattern(formatsSection, /trackEvent\(['"]telegram_context['"]/, 'formats section must emit telegram_context on card CTA clicks')
  assertPattern(formatsSection, /trackEvent\(['"]telegram_click['"]/, 'formats section must emit telegram_click on card CTA clicks')
  assertPattern(formatsSection, /<PricingFormatCard/, 'formats section must compose the configurable format card')
  assertPattern(formatsSection, /:cta-href="card\.ctaHref"/, 'formats section must pass the resolved Telegram URL into the card')
  assertPattern(formatsSection, /@cta-click=/, 'formats section must handle the card CTA click emit')

  assertPattern(
    formatCard,
    /defineProps<\{\s*id:\s*string\s*title:\s*string\s*recommended:\s*boolean\s*recommendedLabel:\s*string\s*prices:\s*PricingFormatCardPrice\[\]\s*fitLabel:\s*string\s*fit:\s*string\s*termsLabel:\s*string\s*terms:\s*string\s*ctaLabel:\s*string\s*ctaHref:\s*string\s*\}>/,
    'format card must be configured entirely through typed presentational props'
  )
  assertPattern(formatCard, /defineEmits/, 'format card must emit its CTA click instead of tracking directly')
  assertPattern(formatCard, /:data-pricing-format="id"/, 'format card must be addressable by format id')
  assertNotIncludes(formatCard, 'useI18n', 'format card (translations come from the parent)')
  assertNotIncludes(formatCard, "from '~/data/content'", 'format card (content records are resolved by the parent)')
  assertNotIncludes(formatCard, 'resolveTelegramCta', 'format card (Telegram resolution is business logic)')
  assertNotIncludes(formatCard, 'useTracking', 'format card (tracking is business logic)')
  assertNotIncludes(formatCard, 'usePricingPathContext', 'format card (path context is business logic)')

  const startOfferCard = read(files.startOfferCard)

  assertPattern(startOfferCard, /defineEmits/, 'start offer card must emit its CTA click instead of tracking directly')
  assertPattern(startOfferCard, /:data-pricing-start-offer="id"/, 'start offer card must be addressable by offer id')
  assertNotIncludes(startOfferCard, 'useI18n', 'start offer card (translations come from the parent)')
  assertNotIncludes(startOfferCard, "from '~/data/content'", 'start offer card (content records are resolved by the parent)')
  assertNotIncludes(startOfferCard, 'resolveTelegramCta', 'start offer card (Telegram resolution is business logic)')
  assertNotIncludes(startOfferCard, 'useTracking', 'start offer card (tracking is business logic)')
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(startOfferCard), 'start offer card must not hard-code Ukrainian public copy')

  const packagesSection = read(files.packagesSection)
  const packageCard = read(files.packageCard)
  const specialConditionsSection = read(files.specialConditionsSection)

  for (const [source, label] of [
    [packagesSection, 'packages section'],
    [specialConditionsSection, 'special conditions section']
  ]) {
    assertPattern(source, /useI18n\(\)/, `${label} must use Nuxt i18n directly`)
    assertPattern(source, /\bt\(/, `${label} must read public copy through t()`)
    assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not hard-code Ukrainian public copy`)
  }
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(packageCard), 'package card must not hard-code Ukrainian public copy')

  assertIncludes(packagesSection, 'pricing-page__packages', 'packages section')
  assertPattern(packagesSection, /pricePackages/, 'packages section must render from shared package tracks')
  assertPattern(packagesSection, /resolveTelegramCta\(/, 'packages section must resolve Telegram CTAs through the shared contract')
  assertPattern(packagesSection, /<PricingPackageCard/, 'packages section must compose the package tier card')
  assertPattern(packageCard, /defineEmits/, 'package card must emit its CTA click instead of tracking directly')
  assertNotIncludes(packageCard, "from '~/data/content'", 'package card (content records are resolved by the parent)')

  assertIncludes(specialConditionsSection, 'pricing-page__special-conditions', 'special conditions section')

  assertIncludes(includedSection, 'pricing-page__included', 'included section')
  assertPattern(includedSection, /pricingIncludedItems/, 'included section must render from shared records')

  assertIncludes(faqSection, 'pricing-page__faq', 'faq section')
  assertPattern(faqSection, /faqItems/, 'faq section must render from shared records')
  assertPattern(faqSection, /<PricingFaqItem/, 'faq section must compose the configurable faq item component')
  assertPattern(faqSection, /:id="`faq-\$\{faqItem\.id\}`"/, 'faq section must pass a stable id into each faq item')
  assertPattern(faqSection, /:question="t\(`faqItems\.\$\{faqItem\.id\}\.question`\)"/, 'faq section must pass the localized question into each faq item')
  assertPattern(faqSection, /:answer="t\(`faqItems\.\$\{faqItem\.id\}\.answer`\)"/, 'faq section must pass the localized answer into each faq item')

  assertPattern(faqItemComponent, /defineProps<\{\s*id:\s*string\s*question:\s*string\s*answer:\s*string\s*\}>/, 'faq item must be configurable through typed id, question, and answer props')
  assertPattern(faqItemComponent, /UiAccordion/, 'faq item must use the accessible accordion primitive')

  assertIncludes(finalCtaSection, 'pricing-page__final-cta', 'final CTA section')
  assertPattern(finalCtaSection, /pathDescriptions/, 'final CTA section must adapt its description to path context')
  assertPattern(finalCtaSection, /useTelegramCta\(/, 'final CTA must build Telegram URLs through useTelegramCta')
  assertPattern(finalCtaSection, /trackTelegramClick/, 'final booking CTA must track clicks through the shared contract')
  assertIncludes(finalCtaSection, 'to="/programs"', 'final booking section must keep a route back to /programs')
}

function verifySharedContracts() {
  const contentTypes = read(files.contentTypes)
  const pricing = read(files.pricing)
  const faq = read(files.faq)
  const tracking = read(files.tracking)

  assertPattern(contentTypes, /PricingFormatId/, 'content types must define the pricing format id contract')
  assertPattern(contentTypes, /PricingFormat\b/, 'content types must define the pricing format contract')
  assertPattern(contentTypes, /PricePackageTrack\b/, 'content types must define the package track contract')
  assertPattern(contentTypes, /PricingIncludedItem/, 'content types must define the included item contract')
  assertPattern(pricing, /pricePackages/, 'pricing data must define package tracks')

  for (const trackId of packageTrackIds) {
    assertIncludes(pricing, `id: '${trackId}'`, 'package track data')
  }
  assertPattern(contentTypes, /telegramFormat:\s*TelegramFormatContext/, 'pricing formats must carry a Telegram format context')
  assertPattern(tracking, /['"]pricing_view['"]/, 'tracking adapter must accept pricing_view')

  for (const formatId of pricingFormatIds) {
    assertIncludes(pricing, `id: '${formatId}'`, 'pricing format data')
  }

  for (const priceItemId of priceItemIds) {
    assertIncludes(pricing, `id: '${priceItemId}'`, 'price item data')
  }

  for (const includedItemId of includedItemIds) {
    assertIncludes(pricing, `id: '${includedItemId}'`, 'included item data')
  }

  for (const faqItemId of faqItemIds) {
    assertIncludes(faq, `id: '${faqItemId}'`, 'faq item data')
  }
}

function verifyPricingMessages(messages, locale) {
  const pricingSections = messages.pricingSections

  assert(typeof pricingSections === 'object' && pricingSections !== null, `${locale}.json must contain pricingSections`)

  for (const field of ['eyebrow', 'heading', 'summary']) {
    assertNonEmptyString(messages.pages?.pricing?.intro?.[field], `${locale}.json pages.pricing.intro.${field}`)
  }

  assertNonEmptyString(pricingSections.trial?.telegramCta, `${locale}.json pricingSections.trial.telegramCta`)
  assertNonEmptyString(pricingSections.trial?.trialLessonCta, `${locale}.json pricingSections.trial.trialLessonCta`)
  assertNonEmptyString(pricingSections.trial?.includedLabel, `${locale}.json pricingSections.trial.includedLabel`)

  for (const pathContext of pathContexts) {
    assertNonEmptyString(pricingSections.trial?.pathNotes?.[pathContext], `${locale}.json pricingSections.trial.pathNotes.${pathContext}`)
    assertNonEmptyString(pricingSections.finalCta?.pathDescriptions?.[pathContext], `${locale}.json pricingSections.finalCta.pathDescriptions.${pathContext}`)
  }

  for (const field of ['eyebrow', 'title', 'description', 'fitLabel', 'termsLabel', 'recommendedLabel']) {
    assertNonEmptyString(pricingSections.formats?.[field], `${locale}.json pricingSections.formats.${field}`)
  }

  for (const formatId of pricingFormatIds) {
    for (const field of ['title', 'fit', 'terms', 'telegramCta']) {
      assertNonEmptyString(pricingSections.formats?.items?.[formatId]?.[field], `${locale}.json pricingSections.formats.items.${formatId}.${field}`)
    }
  }

  for (const field of ['eyebrow', 'title', 'description', 'totalLabel', 'popularLabel']) {
    assertNonEmptyString(pricingSections.packages?.[field], `${locale}.json pricingSections.packages.${field}`)
  }

  for (const count of ['1', '4', '8', '16']) {
    assertNonEmptyString(pricingSections.packages?.lessonLabels?.[count], `${locale}.json pricingSections.packages.lessonLabels.${count}`)
  }

  for (const trackId of packageTrackIds) {
    for (const field of ['title', 'telegramCta']) {
      assertNonEmptyString(pricingSections.packages?.tracks?.[trackId]?.[field], `${locale}.json pricingSections.packages.tracks.${trackId}.${field}`)
    }
  }

  for (const field of ['eyebrow', 'title', 'description']) {
    assertNonEmptyString(pricingSections.specialConditions?.[field], `${locale}.json pricingSections.specialConditions.${field}`)
  }

  for (const conditionId of specialConditionIds) {
    for (const field of ['title', 'description']) {
      assertNonEmptyString(pricingSections.specialConditions?.items?.[conditionId]?.[field], `${locale}.json pricingSections.specialConditions.items.${conditionId}.${field}`)
    }
  }

  for (const field of ['eyebrow', 'title', 'description']) {
    assertNonEmptyString(pricingSections.included?.[field], `${locale}.json pricingSections.included.${field}`)
    assertNonEmptyString(pricingSections.faq?.[field], `${locale}.json pricingSections.faq.${field}`)
  }

  for (const includedItemId of includedItemIds) {
    for (const field of ['title', 'description']) {
      assertNonEmptyString(pricingSections.included?.items?.[includedItemId]?.[field], `${locale}.json pricingSections.included.items.${includedItemId}.${field}`)
    }
  }

  for (const field of ['eyebrow', 'title', 'telegramCta', 'programsCta']) {
    assertNonEmptyString(pricingSections.finalCta?.[field], `${locale}.json pricingSections.finalCta.${field}`)
  }

  for (const priceItemId of priceItemIds) {
    for (const field of ['label', 'caption']) {
      assertNonEmptyString(messages.priceItems?.[priceItemId]?.[field], `${locale}.json priceItems.${priceItemId}.${field}`)
    }
  }

  for (const faqItemId of faqItemIds) {
    for (const field of ['question', 'answer']) {
      assertNonEmptyString(messages.faqItems?.[faqItemId]?.[field], `${locale}.json faqItems.${faqItemId}.${field}`)
    }
  }
}

function verifyLocalization() {
  const ukMessages = readJson(files.ukMessages)
  const enMessages = readJson(files.enMessages)

  verifyPricingMessages(ukMessages, 'uk')
  verifyPricingMessages(enMessages, 'en')
  assert(
    JSON.stringify(getShape(ukMessages.pricingSections)) === JSON.stringify(getShape(enMessages.pricingSections)),
    'uk.json and en.json pricingSections must keep equivalent structure'
  )
  assert(
    JSON.stringify(getShape(ukMessages.faqItems)) === JSON.stringify(getShape(enMessages.faqItems)),
    'uk.json and en.json faqItems must keep equivalent structure'
  )
}

verifyPackageScript()
verifyPricingRoute()
verifyPathContextComposable()
verifySectionComponents()
verifySharedContracts()
verifyLocalization()

console.log('Pricing route verification passed')
