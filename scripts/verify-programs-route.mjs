import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  programsPage: resolve(root, 'app/pages/programs.vue'),
  surfaceViewObserver: resolve(root, 'app/composables/useSurfaceViewObserver.ts'),
  headerSection: resolve(root, 'app/components/sections/ProgramsHeaderSection.vue'),
  pathsSection: resolve(root, 'app/components/sections/ProgramsPathsSection.vue'),
  priceHintsSection: resolve(root, 'app/components/sections/ProgramsPriceHintsSection.vue'),
  ctaStripSection: resolve(root, 'app/components/sections/ProgramsCtaStripSection.vue'),
  pathPanel: resolve(root, 'app/components/programs/ProgramPathPanel.vue'),
  priceHintCard: resolve(root, 'app/components/programs/ProgramPriceHintCard.vue'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
  learningPaths: resolve(root, 'app/data/content/learning-paths.ts'),
  homePathCards: resolve(root, 'app/components/sections/HomePathCardsSection.vue')
}

const anchors = ['exam-preparation', 'kids-parents', 'adults-speaking']
const pathIds = ['exam', 'kids', 'adult']
const priceHintIds = ['trial', 'exam-group', 'kids-group', 'adult-individual']

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
    /"test:programs-route":\s*"node scripts\/verify-programs-route\.mjs"/,
    'package.json must expose test:programs-route'
  )
}

function verifyProgramsRoute() {
  const programsPage = read(files.programsPage)

  assertPattern(programsPage, /useSeo\(['"]\/programs['"]\)/, 'programs page must register /programs SEO')
  assertNotIncludes(programsPage, 'route-shell-anchor', 'programs page starter shell')
  assertNotIncludes(programsPage, 'NuxtWelcome', 'programs page')
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(programsPage), 'programs page must not hard-code Ukrainian public copy')

  assertOrdered(
    programsPage,
    [
      '<ProgramsHeaderSection',
      '<ProgramsPathsSection',
      '<ProgramsPriceHintsSection',
      '<ProgramsCtaStripSection'
    ],
    'programs page'
  )

  assertNotIncludes(programsPage, '<UiSection', 'programs page must compose section components instead of inline sections')
  assertNotIncludes(programsPage, 'v-for', 'programs page must delegate loops to section components')
  assertNotIncludes(programsPage, 'useI18n', 'programs page (copy resolution belongs to section components)')
  assertNotIncludes(programsPage, 'useTracking', 'programs page (tracking belongs to section components)')
  assertNotIncludes(programsPage, 'IntersectionObserver', 'programs page (surface observation belongs to useSurfaceViewObserver)')
}

function verifySurfaceViewObserver() {
  const composable = read(files.surfaceViewObserver)

  assertPattern(composable, /export (const|function) useSurfaceViewObserver/, 'surface view observer composable must export useSurfaceViewObserver')
  assertIncludes(composable, "rootMargin: '0px 0px -35% 0px'", 'surface view observer')
  assertIncludes(composable, 'threshold: [0.05, 0.1, 0.15, 0.2, 0.25]', 'surface view observer')
  assertPattern(composable, /intersectionRatio\s*>=\s*0\.25/, 'surface view observer must keep the intersection ratio rule')
  assertPattern(composable, /rootHeight\s*\*\s*0\.5/, 'surface view observer must keep the root-height visibility rule')
  assertPattern(composable, /typeof IntersectionObserver === ['"]undefined['"]/, 'surface view observer must guard environments without IntersectionObserver')
  assertPattern(composable, /new Set/, 'surface view observer must dedupe observed surfaces')
  assertPattern(composable, /onMounted\(/, 'surface view observer must attach on mount')
  assertPattern(composable, /onBeforeUnmount\(/, 'surface view observer must detach before unmount')
  assertPattern(composable, /disconnect\(\)/, 'surface view observer must disconnect its observer')
}

function verifySectionComponents() {
  const headerSection = read(files.headerSection)
  const pathsSection = read(files.pathsSection)
  const priceHintsSection = read(files.priceHintsSection)
  const ctaStripSection = read(files.ctaStripSection)
  const pathPanel = read(files.pathPanel)
  const priceHintCard = read(files.priceHintCard)
  const localizedSections = [
    [headerSection, 'header section'],
    [pathsSection, 'paths section'],
    [priceHintsSection, 'price hints section'],
    [ctaStripSection, 'CTA strip section']
  ]

  for (const [source, label] of localizedSections) {
    assertPattern(source, /useI18n\(\)/, `${label} must use Nuxt i18n directly`)
    assertPattern(source, /\bt\(/, `${label} must read public copy through t()`)
  }

  for (const [source, label] of [...localizedSections, [pathPanel, 'path panel'], [priceHintCard, 'price hint card']]) {
    assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not hard-code Ukrainian public copy`)
  }

  assertIncludes(headerSection, 'programs-page__header', 'header section')
  assertPattern(headerSection, /useTelegramCta\(/, 'header section must build Telegram URLs through useTelegramCta')
  assertPattern(headerSection, /trackTelegramClick/, 'header Telegram CTA must track clicks through the shared contract')
  assertPattern(headerSection, /['"]ask_program['"]/, 'header Telegram CTA must carry the ask_program intent')
  assertIncludes(headerSection, 'to="/pricing"', 'header actions must route to /pricing')
  assertIncludes(headerSection, 'to="/teachers"', 'header actions must route to /teachers')

  assertPattern(pathsSection, /learningPaths/, 'paths section must render from shared learning paths')
  assertPattern(pathsSection, /useSurfaceViewObserver\(/, 'paths section must observe path surfaces through the shared composable')
  assertNotIncludes(pathsSection, 'new IntersectionObserver', 'paths section (observer setup belongs to useSurfaceViewObserver)')
  assertIncludes(pathsSection, "'data-program-path'", 'paths section must observe the data-program-path attribute')
  assertPattern(pathsSection, /resolveTelegramCta\(/, 'paths section must resolve per-path Telegram CTAs through the shared contract')
  assertPattern(pathsSection, /trackEvent\(['"]program_path_view['"]/, 'paths section must emit program_path_view')
  assertPattern(pathsSection, /trackEvent\(['"]telegram_context['"]/, 'paths section must emit telegram_context on Telegram CTA clicks')
  assertPattern(pathsSection, /trackEvent\(['"]telegram_click['"]/, 'paths section must emit telegram_click on Telegram CTA clicks')
  assertPattern(pathsSection, /route:\s*route\.fullPath/, 'program_path_view must include current route')
  assertPattern(pathsSection, /locale:\s*locale\.value/, 'program_path_view must include locale')
  assertPattern(pathsSection, /path:\s*path\.id/, 'program_path_view must include path context')
  assertPattern(pathsSection, /\/pricing\?path=\$\{path\.id\}/, 'path CTAs must preserve pricing path context')
  assertPattern(pathsSection, /<ProgramPathPanel/, 'paths section must compose the presentational path panel')
  assertPattern(pathsSection, /@pricing-click=/, 'paths section must handle the panel pricing-click emit')
  assertPattern(pathsSection, /@telegram-click=/, 'paths section must handle the panel telegram-click emit')

  assertIncludes(priceHintsSection, 'programs-page__price-hints', 'price hints section')
  assertPattern(priceHintsSection, /priceHintIds/, 'price hints section must resolve path price hints from shared content data')
  assertPattern(priceHintsSection, /<ProgramPriceHintCard/, 'price hints section must compose the presentational price hint card')

  assertIncludes(ctaStripSection, 'programs-page__cta-strip', 'CTA strip section')
  assertPattern(ctaStripSection, /useTelegramCta\(/, 'CTA strip must build Telegram URLs through useTelegramCta')
  assertPattern(ctaStripSection, /trackTelegramClick/, 'CTA strip Telegram CTA must track clicks through the shared contract')
  assertIncludes(ctaStripSection, 'to="/pricing"', 'CTA strip must route to /pricing')
  assertIncludes(ctaStripSection, 'to="/teachers"', 'CTA strip must route to /teachers')

  assertPattern(
    pathPanel,
    /defineProps<\{\s*id:\s*string\s*anchorId:\s*string\s*eyebrow:\s*string\s*title:\s*string\s*summary:\s*string\s*signals:\s*ProgramPathPanelSignal\[\]\s*pricingCtaLabel:\s*string\s*pricingCtaTo:\s*string\s*telegramCtaLabel:\s*string\s*telegramCtaHref:\s*string\s*\}>/,
    'path panel must be configured entirely through typed presentational props'
  )
  assertPattern(pathPanel, /defineEmits/, 'path panel must emit its CTA clicks instead of tracking directly')
  assertPattern(pathPanel, /:id="anchorId"/, 'path panel must keep the anchor id on its root section')
  assertPattern(pathPanel, /:data-program-path="id"/, 'path panel must stay addressable by path id')
  assertPattern(pathPanel, /`program-\$\{id\}-title`/, 'path panel must keep the labelled title id')
  assertPattern(pathPanel, /scroll-mt-/, 'path panel anchors must provide readable header offset')
  assertNotIncludes(pathPanel, 'useI18n', 'path panel (translations come from the parent)')
  assertNotIncludes(pathPanel, "from '~/data/content'", 'path panel (content records are resolved by the parent)')
  assertNotIncludes(pathPanel, 'resolveTelegramCta', 'path panel (Telegram resolution is business logic)')
  assertNotIncludes(pathPanel, 'useTelegramCta', 'path panel (Telegram resolution is business logic)')
  assertNotIncludes(pathPanel, 'useTracking', 'path panel (tracking is business logic)')
  assertNotIncludes(pathPanel, 'useSurfaceViewObserver', 'path panel (surface observation is business logic)')

  assertPattern(
    priceHintCard,
    /defineProps<\{\s*title:\s*string\s*prices:\s*ProgramPriceHintCardPrice\[\]\s*\}>/,
    'price hint card must be configured entirely through typed presentational props'
  )
  assertNotIncludes(priceHintCard, 'useI18n', 'price hint card (translations come from the parent)')
  assertNotIncludes(priceHintCard, "from '~/data/content'", 'price hint card (content records are resolved by the parent)')
  assertNotIncludes(priceHintCard, 'useTracking', 'price hint card (tracking is business logic)')
  assertNotIncludes(priceHintCard, 'useTelegramCta', 'price hint card (Telegram resolution is business logic)')
}

function verifySharedPathContracts() {
  const learningPaths = read(files.learningPaths)
  const homePathCards = read(files.homePathCards)

  assertOrdered(
    learningPaths,
    [
      "id: 'exam'",
      "id: 'kids'",
      "id: 'adult'"
    ],
    'learning path data'
  )

  for (const anchor of anchors) {
    assertIncludes(learningPaths, `anchorId: '${anchor}'`, 'learning path data anchors')
    assertIncludes(homePathCards, `/programs#${anchor}`, 'home path card deep links')
  }
}

function verifyLocalization() {
  const ukMessages = readJson(files.ukMessages)
  const enMessages = readJson(files.enMessages)

  verifyProgramMessages(ukMessages, 'uk')
  verifyProgramMessages(enMessages, 'en')
  assert(
    JSON.stringify(getShape(ukMessages.programsSections)) === JSON.stringify(getShape(enMessages.programsSections)),
    'uk.json and en.json programsSections must keep equivalent structure'
  )
}

function verifyProgramMessages(messages, locale) {
  const programsSections = messages.programsSections

  assert(typeof programsSections === 'object' && programsSections !== null, `${locale}.json must contain programsSections`)

  for (const field of ['compareCta', 'teachersCta', 'telegramCta']) {
    assertNonEmptyString(programsSections.header?.[field], `${locale}.json programsSections.header.${field}`)
  }

  for (const field of ['eyebrow', 'heading', 'summary']) {
    assertNonEmptyString(messages.pages?.programs?.intro?.[field], `${locale}.json pages.programs.intro.${field}`)
  }

  for (const field of ['fit', 'method', 'start']) {
    assertNonEmptyString(programsSections.signalLabels?.[field], `${locale}.json programsSections.signalLabels.${field}`)
  }

  for (const pathId of pathIds) {
    const pathMessages = programsSections.paths?.[pathId]

    for (const field of ['eyebrow', 'summary', 'fit', 'method', 'diagnosticCue', 'pricingCta', 'telegramCta']) {
      assertNonEmptyString(pathMessages?.[field], `${locale}.json programsSections.paths.${pathId}.${field}`)
    }

    assertNonEmptyString(messages.learningPaths?.[pathId]?.title, `${locale}.json learningPaths.${pathId}.title`)
  }

  for (const field of ['eyebrow', 'title', 'description']) {
    assertNonEmptyString(programsSections.priceHints?.[field], `${locale}.json programsSections.priceHints.${field}`)
  }

  for (const priceId of priceHintIds) {
    assertNonEmptyString(messages.priceItems?.[priceId]?.label, `${locale}.json priceItems.${priceId}.label`)
    assertNonEmptyString(messages.priceItems?.[priceId]?.value, `${locale}.json priceItems.${priceId}.value`)
    assertNonEmptyString(messages.priceItems?.[priceId]?.caption, `${locale}.json priceItems.${priceId}.caption`)
  }

  for (const field of ['eyebrow', 'title', 'description', 'pricingCta', 'teachersCta', 'telegramCta']) {
    assertNonEmptyString(programsSections.ctaStrip?.[field], `${locale}.json programsSections.ctaStrip.${field}`)
  }
}

verifyPackageScript()
verifyProgramsRoute()
verifySurfaceViewObserver()
verifySectionComponents()
verifySharedPathContracts()
verifyLocalization()

console.log('Programs route verification passed')
