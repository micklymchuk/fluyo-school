import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  programsPage: resolve(root, 'app/pages/programs.vue'),
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

function verifyProgramMessages(messages, locale) {
  const programsSections = messages.programsSections

  assert(typeof programsSections === 'object' && programsSections !== null, `${locale}.json must contain programsSections`)

  for (const field of ['compareCta', 'teachersCta', 'telegramCta']) {
    assertNonEmptyString(programsSections.header?.[field], `${locale}.json programsSections.header.${field}`)
  }

  for (const field of ['eyebrow', 'heading', 'summary']) {
    assertNonEmptyString(messages.pages?.programs?.intro?.[field], `${locale}.json pages.programs.intro.${field}`)
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

function verifyProgramsRoute() {
  const programsPage = read(files.programsPage)

  assertPattern(programsPage, /useSeo\(['"]\/programs['"]\)/, 'programs page must register /programs SEO')
  assertPattern(programsPage, /useI18n\(\)/, 'programs page must use Nuxt i18n directly')
  assertPattern(programsPage, /\bt\(/, 'programs page must read public copy through t()')
  assertNotIncludes(programsPage, 'route-shell-anchor', 'programs page starter shell')
  assertNotIncludes(programsPage, 'NuxtWelcome', 'programs page')
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(programsPage), 'programs page must not hard-code Ukrainian public copy')

  assertOrdered(
    programsPage,
    [
      'programs-page__header',
      'v-for="path in learningPaths"',
      'programs-page__price-hints',
      'programs-page__cta-strip'
    ],
    'programs page'
  )

  assertIncludes(programsPage, ':id="path.anchorId"', 'programs page anchors')
  assertPattern(programsPage, /scroll-margin-top|scroll-mt-/, 'program anchors must provide readable header offset')
  assertPattern(programsPage, /learningPaths/, 'programs page must render from shared learning paths')
  assertPattern(programsPage, /priceHintIds/, 'programs page must render path price hints from shared content data')
  assertPattern(programsPage, /\/pricing\?path=\$\{path\.id\}/, 'path CTAs must preserve pricing path context')
  assertPattern(programsPage, /useTelegramCta\(/, 'programs page must build Telegram URLs through useTelegramCta')
  assertPattern(programsPage, /trackTelegramClick/, 'programs page must track Telegram CTA clicks through shared contract')
  assertPattern(programsPage, /trackEvent\(['"]program_path_view['"]/, 'programs page must emit program_path_view')
  assertPattern(programsPage, /IntersectionObserver|onMounted/, 'programs page must track observed path sections')
  assertPattern(programsPage, /route:\s*route\.fullPath/, 'program_path_view must include current route')
  assertPattern(programsPage, /locale:\s*locale\.value/, 'program_path_view must include locale')
  assertPattern(programsPage, /path:\s*path\.id/, 'program_path_view must include path context')
  assertIncludes(programsPage, 'to="/pricing"', 'CTA strip must route to /pricing')
  assertIncludes(programsPage, 'to="/teachers"', 'CTA strip must route to /teachers')
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

verifyPackageScript()
verifyProgramsRoute()
verifySharedPathContracts()
verifyLocalization()

console.log('Programs route verification passed')
