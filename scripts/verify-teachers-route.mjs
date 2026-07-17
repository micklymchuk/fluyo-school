import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  teachersPage: resolve(root, 'app/pages/teachers.vue'),
  teamSection: resolve(root, 'app/components/sections/teachers/TeachersTeamSection.vue'),
  showcase: resolve(root, 'app/components/teachers/TeacherShowcase.vue'),
  portrait: resolve(root, 'app/components/teachers/TeacherPortrait.vue'),
  founderIntro: resolve(root, 'app/components/teachers/FounderIntro.vue'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  teachers: resolve(root, 'app/data/content/teachers.ts')
}

// One unified list of profiles; the founder leads it, set apart by the founder badge.
const teacherIds = ['catherina', 'ksenia', 'diana']

// Sections that were retired when the page was reduced to the single teacher list.
const retiredComponents = [
  'TeachersHeaderSection',
  'TeachersFounderSection',
  'TeachersTestimonialsSection',
  'TeachersCtaStripSection'
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
    /"test:teachers-route":\s*"node scripts\/verify-teachers-route\.mjs"/,
    'package.json must expose test:teachers-route'
  )
}

function verifyTeachersRoute() {
  const teachersPage = read(files.teachersPage)

  assertPattern(teachersPage, /useSeo\(['"]\/teachers['"]\)/, 'teachers page must register /teachers SEO')
  assertNotIncludes(teachersPage, 'route-shell-anchor', 'teachers page starter shell')
  assertNotIncludes(teachersPage, 'NuxtWelcome', 'teachers page')
  assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(teachersPage), 'teachers page must not hard-code Ukrainian public copy')

  assertPattern(teachersPage, /<TeachersTeamSection/, 'teachers page must render the teacher list section')

  for (const retired of retiredComponents) {
    assertNotIncludes(teachersPage, retired, `teachers page must no longer render the retired ${retired}`)
  }

  assertNotIncludes(teachersPage, '<UiSection', 'teachers page must compose section components instead of inline sections')
  assertNotIncludes(teachersPage, 'v-for', 'teachers page must delegate loops to section components')
  assertNotIncludes(teachersPage, 'useI18n', 'teachers page (copy resolution belongs to section components)')
  assertNotIncludes(teachersPage, 'useTracking', 'teachers page (tracking belongs to section components)')
}

function verifySectionComponents() {
  const teamSection = read(files.teamSection)
  const showcase = read(files.showcase)
  const portrait = read(files.portrait)
  const founderIntro = read(files.founderIntro)

  const presentationalLeaves = [
    [showcase, 'teacher showcase'],
    [portrait, 'teacher portrait'],
    [founderIntro, 'founder intro']
  ]

  // The one remaining section resolves all copy through Nuxt i18n.
  assertPattern(teamSection, /useI18n\(\)/, 'team section must use Nuxt i18n directly')
  assertPattern(teamSection, /\bt\(/, 'team section must read public copy through t()')

  for (const [source, label] of [[teamSection, 'team section'], ...presentationalLeaves]) {
    assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not hard-code Ukrainian public copy`)
  }

  // Team — all three profiles (founder + two teachers) through one shared showcase.
  assertIncludes(teamSection, 'teachers-page__team', 'team section')
  assertPattern(teamSection, /teacherProfiles/, 'team section must render from shared teacher profiles')
  assertPattern(teamSection, /teacherProfiles\.\$\{teacherId\}\.facts/, 'team cards must render fact blocks from shared teacher copy')
  assertPattern(teamSection, /teacherProfiles\.\$\{teacherId\}\.focus/, 'team cards must render focus lists from shared teacher copy')
  assertPattern(teamSection, /<TeacherShowcase/, 'team section must compose the shared teacher showcase')
  assertPattern(teamSection, /isFounder/, 'team section must distinguish the founder profile')
  assertPattern(teamSection, /teachersSections\.founder\.badge/, 'team section must label the founder with the founder badge')

  // Presentational leaves — configured entirely through typed props.
  for (const [prop, label] of [
    ['scriptName: string', 'script name'],
    ['role: string', 'role'],
    ['facts: ShowcaseFact[]', 'facts'],
    ['focusTitle: string', 'focus title'],
    ['focusItems: string[]', 'focus items'],
    ['photoSrc: string', 'photo source'],
    ['photoAlt: string', 'photo alt']
  ]) {
    assertIncludes(showcase, prop, `teacher showcase must expose a typed ${label} prop`)
  }

  assertPattern(portrait, /alt:\s*string/, 'teacher portrait must expose a typed alt prop')
  assertPattern(portrait, /:alt="alt"/, 'teacher portrait must bind the provided alt text')
  assertPattern(portrait, /aspect-/, 'teacher portrait must reserve a stable aspect ratio')
  assertPattern(founderIntro, /scriptName:\s*string/, 'founder intro must expose a typed script name prop')

  for (const [source, label] of presentationalLeaves) {
    assertNotIncludes(source, 'useI18n', `${label} (translations come from the parent)`)
    assertNotIncludes(source, "from '~/data/content'", `${label} (content records are resolved by the parent)`)
    assertNotIncludes(source, 'useTelegramCta', `${label} (Telegram resolution is business logic)`)
    assertNotIncludes(source, 'useTracking', `${label} (tracking is business logic)`)
  }
}

function verifySharedContracts() {
  const contentTypes = read(files.contentTypes)
  const teachers = read(files.teachers)

  assertPattern(contentTypes, /export type TeacherProfile\b/, 'content types must define the teacher profile contract')
  assertPattern(teachers, /scriptName/, 'teacher profile data must carry a Latin script name for the lockup')
  assertPattern(teachers, /photo/, 'teacher profile data must carry a portrait photo path')
  assertPattern(teachers, /isFounder/, 'teacher profile data must flag the founder profile')

  for (const teacherId of teacherIds) {
    assertIncludes(teachers, `id: '${teacherId}'`, 'teacher profile data')
  }
}

function verifyTeachersMessages(messages, locale) {
  const teachersSections = messages.teachersSections

  assert(typeof teachersSections === 'object' && teachersSections !== null, `${locale}.json must contain teachersSections`)

  for (const field of ['eyebrow', 'heading', 'summary']) {
    assertNonEmptyString(messages.pages?.teachers?.intro?.[field], `${locale}.json pages.teachers.intro.${field}`)
  }

  assertNonEmptyString(teachersSections.founder?.badge, `${locale}.json teachersSections.founder.badge`)

  for (const field of ['eyebrow', 'title', 'description', 'focusTitle']) {
    assertNonEmptyString(teachersSections.team?.[field], `${locale}.json teachersSections.team.${field}`)
  }

  for (const teacherId of teacherIds) {
    const profile = messages.teacherProfiles?.[teacherId]

    for (const field of ['name', 'role']) {
      assertNonEmptyString(profile?.[field], `${locale}.json teacherProfiles.${teacherId}.${field}`)
    }

    assert(Array.isArray(profile?.facts) && profile.facts.length === 2, `${locale}.json teacherProfiles.${teacherId}.facts must contain two facts`)
    for (const fact of profile.facts) {
      for (const field of ['title', 'body']) {
        assertNonEmptyString(fact?.[field], `${locale}.json teacherProfiles.${teacherId}.facts.${field}`)
      }
    }

    assert(Array.isArray(profile?.focus) && profile.focus.length > 0, `${locale}.json teacherProfiles.${teacherId}.focus must be a non-empty array`)
    for (const item of profile.focus) {
      assertNonEmptyString(item, `${locale}.json teacherProfiles.${teacherId}.focus entry`)
    }
  }

  for (const assetId of ['portrait-catherina', 'portrait-diana', 'portrait-ksenia']) {
    assertNonEmptyString(messages.assets?.[assetId]?.alt, `${locale}.json assets.${assetId}.alt`)
  }
}

function verifyLocalization() {
  const ukMessages = readJson(files.ukMessages)
  const enMessages = readJson(files.enMessages)

  verifyTeachersMessages(ukMessages, 'uk')
  verifyTeachersMessages(enMessages, 'en')
  assert(
    JSON.stringify(getShape(ukMessages.teachersSections)) === JSON.stringify(getShape(enMessages.teachersSections)),
    'uk.json and en.json teachersSections must keep equivalent structure'
  )
}

verifyPackageScript()
verifyTeachersRoute()
verifySectionComponents()
verifySharedContracts()
verifyLocalization()

console.log('Teachers route verification passed')
