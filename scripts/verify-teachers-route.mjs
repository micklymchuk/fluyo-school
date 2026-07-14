import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  teachersPage: resolve(root, 'app/pages/teachers.vue'),
  surfaceViewObserver: resolve(root, 'app/composables/useSurfaceViewObserver.ts'),
  headerSection: resolve(root, 'app/components/sections/TeachersHeaderSection.vue'),
  proofColumnsSection: resolve(root, 'app/components/sections/TeachersProofColumnsSection.vue'),
  testimonialsSection: resolve(root, 'app/components/sections/TeachersTestimonialsSection.vue'),
  ctaStripSection: resolve(root, 'app/components/sections/TeachersCtaStripSection.vue'),
  teacherCard: resolve(root, 'app/components/teachers/TeacherCard.vue'),
  proofItem: resolve(root, 'app/components/teachers/TeacherProofItem.vue'),
  credentialStripItem: resolve(root, 'app/components/teachers/TeacherCredentialStripItem.vue'),
  testimonial: resolve(root, 'app/components/teachers/TeacherTestimonial.vue'),
  ukMessages: resolve(root, 'app/i18n/locales/uk.json'),
  enMessages: resolve(root, 'app/i18n/locales/en.json'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  teachers: resolve(root, 'app/data/content/teachers.ts'),
  proof: resolve(root, 'app/data/content/proof.ts'),
  testimonials: resolve(root, 'app/data/content/testimonials.ts'),
  tracking: resolve(root, 'app/composables/useTracking.ts')
}

const teacherIds = ['olena-bondar', 'marta-koval', 'andriy-lev']
const teachersProofAssetIds = ['student-result-ielts', 'kids-class-snapshot', 'adult-speaking-note']
const testimonialIds = ['danylo-exam', 'olena-parent', 'marta-adult']
const proofColumnSurfaces = ['teacher-cards', 'credentials-proof', 'lesson-proof']

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

  assertOrdered(
    teachersPage,
    [
      '<TeachersHeaderSection',
      '<TeachersProofColumnsSection',
      '<TeachersTestimonialsSection',
      '<TeachersCtaStripSection'
    ],
    'teachers page'
  )

  assertNotIncludes(teachersPage, '<UiSection', 'teachers page must compose section components instead of inline sections')
  assertNotIncludes(teachersPage, 'v-for', 'teachers page must delegate loops to section components')
  assertNotIncludes(teachersPage, 'useI18n', 'teachers page (copy resolution belongs to section components)')
  assertNotIncludes(teachersPage, 'useTracking', 'teachers page (tracking belongs to section components)')
  assertNotIncludes(teachersPage, 'IntersectionObserver', 'teachers page (surface observation belongs to useSurfaceViewObserver)')
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
  const proofColumnsSection = read(files.proofColumnsSection)
  const testimonialsSection = read(files.testimonialsSection)
  const ctaStripSection = read(files.ctaStripSection)
  const teacherCard = read(files.teacherCard)
  const proofItem = read(files.proofItem)
  const credentialStripItem = read(files.credentialStripItem)
  const testimonial = read(files.testimonial)
  const localizedSections = [
    [headerSection, 'header section'],
    [proofColumnsSection, 'proof columns section'],
    [testimonialsSection, 'testimonials section'],
    [ctaStripSection, 'CTA strip section']
  ]
  const presentationalLeaves = [
    [teacherCard, 'teacher card'],
    [proofItem, 'proof item'],
    [credentialStripItem, 'credential strip item'],
    [testimonial, 'testimonial']
  ]

  for (const [source, label] of localizedSections) {
    assertPattern(source, /useI18n\(\)/, `${label} must use Nuxt i18n directly`)
    assertPattern(source, /\bt\(/, `${label} must read public copy through t()`)
  }

  for (const [source, label] of [...localizedSections, ...presentationalLeaves]) {
    assert(!/[А-Яа-яІіЇїЄєҐґ]/.test(source), `${label} must not hard-code Ukrainian public copy`)
  }

  assertIncludes(headerSection, 'teachers-page__header', 'header section')
  assertIncludes(headerSection, 'trust-note', 'header section must keep the trust note')

  assertPattern(proofColumnsSection, /teacherProfiles/, 'proof columns section must render from shared teacher profiles')
  assertPattern(proofColumnsSection, /proofAssets/, 'proof columns section must render from shared proof assets')
  assertPattern(
    proofColumnsSection,
    /usageContext\.includes\(['"]teachers['"]\)/,
    'proof columns section must hide proof assets outside the teachers usage context'
  )
  assertPattern(proofColumnsSection, /audienceFit/, 'teacher cards must render audience fit from shared data')
  assertOrdered(
    proofColumnsSection,
    [
      'data-proof-surface="teacher-cards"',
      'data-proof-surface="credentials-proof"',
      'data-proof-surface="lesson-proof"'
    ],
    'proof columns section'
  )
  assertPattern(proofColumnsSection, /useSurfaceViewObserver\(/, 'proof columns section must observe proof surfaces through the shared composable')
  assertNotIncludes(proofColumnsSection, 'new IntersectionObserver', 'proof columns section (observer setup belongs to useSurfaceViewObserver)')
  assertPattern(proofColumnsSection, /trackEvent\(['"]teacher_proof_view['"]/, 'proof columns section must emit teacher_proof_view')
  assertPattern(proofColumnsSection, /route:\s*route\.fullPath/, 'teacher_proof_view must include current route')
  assertPattern(proofColumnsSection, /locale:\s*locale\.value/, 'teacher_proof_view must include locale')
  assertPattern(proofColumnsSection, /surface,\s*\n\s*trigger/, 'teacher_proof_view payload must carry the proof surface and trigger context')
  assertPattern(proofColumnsSection, /trackTeacherProofView\(surface, ['"]observe['"]\)/, 'proof columns must report observed surfaces with the observe trigger')
  assertPattern(proofColumnsSection, /<TeacherCard/, 'proof columns section must compose the presentational teacher card')
  assertPattern(proofColumnsSection, /<TeacherProofItem/, 'proof columns section must compose the presentational proof item')
  assertPattern(proofColumnsSection, /<TeacherCredentialStripItem/, 'proof columns section must compose the presentational credential strip item')

  assertIncludes(testimonialsSection, 'teachers-page__testimonials', 'testimonials section')
  assertIncludes(testimonialsSection, 'data-proof-surface="testimonials"', 'testimonials section must keep its proof surface attribute')
  assertPattern(testimonialsSection, /useSurfaceViewObserver\(/, 'testimonials section must observe its proof surface through the shared composable')
  assertNotIncludes(testimonialsSection, 'new IntersectionObserver', 'testimonials section (observer setup belongs to useSurfaceViewObserver)')
  assertPattern(testimonialsSection, /trackEvent\(['"]teacher_proof_view['"]/, 'testimonials section must emit teacher_proof_view')
  assertPattern(testimonialsSection, /<TeacherProofItem/, 'testimonials section must compose the presentational proof item')
  assertPattern(testimonialsSection, /<TeacherTestimonial/, 'testimonials section must compose the presentational testimonial')

  assertIncludes(ctaStripSection, 'teachers-page__cta-strip', 'CTA strip section')
  assertPattern(ctaStripSection, /useTelegramCta\(/, 'CTA strip must build Telegram URLs through useTelegramCta')
  assertPattern(ctaStripSection, /['"]ask_teacher['"]/, 'CTA strip Telegram CTA must carry the ask_teacher intent')
  assertPattern(ctaStripSection, /trackTelegramClick/, 'CTA strip Telegram CTA must track clicks through the shared contract')
  assertPattern(ctaStripSection, /trackEvent\(['"]teacher_proof_view['"]/, 'CTA strip must emit teacher_proof_view on CTA activation')
  assertPattern(ctaStripSection, /['"]trust-cta['"]/, 'CTA strip must report the trust-cta surface')
  assertPattern(ctaStripSection, /['"]activate['"]/, 'CTA strip must report the activate trigger')
  assertIncludes(ctaStripSection, 'to="/pricing"', 'Trust CTA strip must route to /pricing')
  assertIncludes(ctaStripSection, 'to="/programs"', 'Trust CTA strip must route to /programs')

  assertPattern(
    teacherCard,
    /defineProps<\{\s*id:\s*string\s*initials:\s*string\s*name:\s*string\s*role:\s*string\s*bio:\s*string\s*fitLabel:\s*string\s*fitItems:\s*string\[\]\s*credentials:\s*string\[\]\s*\}>/,
    'teacher card must be configured entirely through typed presentational props'
  )
  assertPattern(teacherCard, /aria-hidden="true"/, 'decorative teacher portraits must stay hidden from assistive tech')
  assertPattern(teacherCard, /aspect-/, 'portrait panels must reserve a stable aspect ratio')

  assertPattern(
    proofItem,
    /defineProps<\{\s*kindLabel:\s*string\s*title:\s*string\s*caption:\s*string\s*\}>/,
    'proof item must be configured entirely through typed presentational props'
  )

  assertPattern(
    credentialStripItem,
    /defineProps<\{\s*owner:\s*string\s*facts:\s*string\s*\}>/,
    'credential strip item must be configured entirely through typed presentational props'
  )

  assertPattern(
    testimonial,
    /defineProps<\{\s*quote:\s*string\s*sourceLabel:\s*string\s*\}>/,
    'testimonial must be configured entirely through typed presentational props'
  )

  for (const [source, label] of presentationalLeaves) {
    assertNotIncludes(source, 'useI18n', `${label} (translations come from the parent)`)
    assertNotIncludes(source, "from '~/data/content'", `${label} (content records are resolved by the parent)`)
    assertNotIncludes(source, 'resolveTelegramCta', `${label} (Telegram resolution is business logic)`)
    assertNotIncludes(source, 'useTelegramCta', `${label} (Telegram resolution is business logic)`)
    assertNotIncludes(source, 'useTracking', `${label} (tracking is business logic)`)
    assertNotIncludes(source, 'useSurfaceViewObserver', `${label} (surface observation is business logic)`)
  }
}

function verifySharedContracts() {
  const contentTypes = read(files.contentTypes)
  const tracking = read(files.tracking)
  const teachers = read(files.teachers)
  const proof = read(files.proof)
  const testimonialsData = read(files.testimonials)

  assertPattern(contentTypes, /TeacherProofSurface/, 'content types must define the teacher proof surface contract')
  assertPattern(contentTypes, /surface\?:/, 'TrackingPayload must carry an optional proof surface')
  assertPattern(tracking, /surface:\s*payload\.surface/, 'sanitizeTrackingPayload must preserve the proof surface')

  for (const teacherId of teacherIds) {
    assertIncludes(teachers, `id: '${teacherId}'`, 'teacher profile data')
  }

  for (const assetId of teachersProofAssetIds) {
    assertIncludes(proof, `id: '${assetId}'`, 'proof asset data')
  }

  for (const testimonialId of testimonialIds) {
    assertIncludes(testimonialsData, `id: '${testimonialId}'`, 'testimonial data')
  }

  for (const surface of proofColumnSurfaces) {
    assertIncludes(read(files.proofColumnsSection), `data-proof-surface="${surface}"`, 'proof columns section surfaces')
  }

  assertIncludes(read(files.testimonialsSection), 'data-proof-surface="testimonials"', 'testimonials section surface')
}

function verifyTeachersMessages(messages, locale) {
  const teachersSections = messages.teachersSections

  assert(typeof teachersSections === 'object' && teachersSections !== null, `${locale}.json must contain teachersSections`)

  for (const field of ['eyebrow', 'heading', 'summary']) {
    assertNonEmptyString(messages.pages?.teachers?.intro?.[field], `${locale}.json pages.teachers.intro.${field}`)
  }

  assertNonEmptyString(teachersSections.header?.trustNote, `${locale}.json teachersSections.header.trustNote`)

  for (const field of ['title', 'description', 'audienceFitLabel']) {
    assertNonEmptyString(teachersSections.teacherCards?.[field], `${locale}.json teachersSections.teacherCards.${field}`)
  }

  for (const pathId of ['exam', 'kids', 'adult']) {
    assertNonEmptyString(messages.learningPaths?.[pathId]?.title, `${locale}.json learningPaths.${pathId}.title`)
  }

  for (const field of ['title', 'description', 'proofNote']) {
    assertNonEmptyString(teachersSections.credentials?.[field], `${locale}.json teachersSections.credentials.${field}`)
  }

  for (const field of ['title', 'description', 'privacyNote']) {
    assertNonEmptyString(teachersSections.lessonProof?.[field], `${locale}.json teachersSections.lessonProof.${field}`)
  }

  for (const field of ['eyebrow', 'title', 'description']) {
    assertNonEmptyString(teachersSections.testimonials?.[field], `${locale}.json teachersSections.testimonials.${field}`)
  }

  for (const field of ['eyebrow', 'title', 'description', 'pricingCta', 'programsCta', 'telegramCta']) {
    assertNonEmptyString(teachersSections.ctaStrip?.[field], `${locale}.json teachersSections.ctaStrip.${field}`)
  }

  for (const kind of ['result', 'classroom', 'method']) {
    assertNonEmptyString(teachersSections.proofKindLabels?.[kind], `${locale}.json teachersSections.proofKindLabels.${kind}`)
  }

  for (const teacherId of teacherIds) {
    const profile = messages.teacherProfiles?.[teacherId]

    for (const field of ['name', 'role', 'bio']) {
      assertNonEmptyString(profile?.[field], `${locale}.json teacherProfiles.${teacherId}.${field}`)
    }

    assert(Array.isArray(profile?.credentials) && profile.credentials.length > 0, `${locale}.json teacherProfiles.${teacherId}.credentials must be a non-empty array`)

    for (const credential of profile.credentials) {
      assertNonEmptyString(credential, `${locale}.json teacherProfiles.${teacherId}.credentials entry`)
    }
  }

  for (const assetId of teachersProofAssetIds) {
    for (const field of ['title', 'caption']) {
      assertNonEmptyString(messages.proofAssets?.[assetId]?.[field], `${locale}.json proofAssets.${assetId}.${field}`)
    }
  }

  for (const testimonialId of testimonialIds) {
    for (const field of ['quote', 'sourceLabel']) {
      assertNonEmptyString(messages.testimonials?.[testimonialId]?.[field], `${locale}.json testimonials.${testimonialId}.${field}`)
    }
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
verifySurfaceViewObserver()
verifySectionComponents()
verifySharedContracts()
verifyLocalization()

console.log('Teachers route verification passed')
