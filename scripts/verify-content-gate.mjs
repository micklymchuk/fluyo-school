import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  contentIndex: resolve(root, 'app/data/content/index.ts'),
  sourceStatus: resolve(root, 'app/data/content/source-status.ts'),
  localizedContentAdapter: resolve(root, 'app/data/localized-content-adapter.ts'),
  checkScript: resolve(root, 'scripts/check-content-gate.mjs'),
  docs: resolve(root, 'docs/content-gate.md')
}

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

function assertIncludes(source, value, label) {
  assert(source.includes(value), `${label} must include ${value}`)
}

function assertPattern(source, pattern, label) {
  assert(pattern.test(source), label)
}

function writeFixtureFile(path, source) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, source)
}

function verifyPackageScripts() {
  const packageJson = JSON.parse(read(files.packageJson))
  const scripts = packageJson.scripts ?? {}

  assert(
    scripts['test:content-gate'] === 'node scripts/verify-content-gate.mjs',
    'package.json must expose npm run test:content-gate'
  )

  assert(
    scripts['content:gate'] === 'node scripts/check-content-gate.mjs',
    'package.json must expose npm run content:gate'
  )
}

function verifyContentGateTypes() {
  const contentTypes = read(files.contentTypes)
  const contentIndex = read(files.contentIndex)
  const sourceStatus = read(files.sourceStatus)
  const localizedContentAdapter = read(files.localizedContentAdapter)

  assertPattern(
    contentTypes,
    /export type RenderMode\s*=\s*'preview' \| 'production'/,
    'content types must define preview and production render modes'
  )

  assertPattern(
    contentIndex,
    /export \* from ['"]\.\/source-status['"]/,
    'content index must export source-status helpers'
  )

  assertPattern(sourceStatus, /UNRESOLVED_SOURCE_STATUSES[\s\S]*'mock'[\s\S]*'needs_input'[\s\S]*'needs_review'/, 'source-status must name unresolved statuses')
  assertPattern(sourceStatus, /REQUIRED_BLOCKING_SOURCE_STATUSES[\s\S]*'hidden'/, 'source-status must treat required hidden records as a launch gate issue')
  assertPattern(sourceStatus, /canRenderSourceStatus\s*=\s*\(/, 'source-status must expose canRenderSourceStatus')
  assertPattern(sourceStatus, /filterRenderableContentRecords\s*=\s*</, 'source-status must expose a generic filterRenderableContentRecords helper')
  assertPattern(sourceStatus, /getLaunchGateIssues\s*=\s*</, 'source-status must expose a generic getLaunchGateIssues helper')
  assertPattern(sourceStatus, /assertLaunchContentReady\s*=\s*\(/, 'source-status must expose assertLaunchContentReady')
  assertPattern(sourceStatus, /sourceStatus === 'hidden'[\s\S]*return false/, 'hidden records must never render')
  assertPattern(sourceStatus, /mode === 'preview'[\s\S]*return true/, 'preview mode must allow non-hidden draft records')
  assertPattern(sourceStatus, /sourceStatus === 'approved'/, 'production mode must render approved records only')
  assertPattern(sourceStatus, /severity:\s*'blocking'[\s\S]*severity:\s*'warning'/, 'launch gate issues must distinguish blocking and warning records')

  assertPattern(localizedContentAdapter, /filterRenderableContentRecords/, 'localized adapter must use content gate filtering')
  assertPattern(localizedContentAdapter, /renderMode:\s*RenderMode\s*=\s*'production'/, 'localized adapter must default content adapters to production mode')
  assertPattern(localizedContentAdapter, /getLocalizedPriceItems\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'price adapter must accept a render mode')
  assertPattern(localizedContentAdapter, /getLocalizedTeacherProfiles\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'teacher adapter must accept a render mode')
  assertPattern(localizedContentAdapter, /getLocalizedProofAssets\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'proof adapter must accept a render mode')
  assertPattern(localizedContentAdapter, /getLocalizedTestimonials\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'testimonial adapter must accept a render mode')
  assertPattern(localizedContentAdapter, /getLocalizedFaqItems\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'FAQ adapter must accept a render mode')
  assertPattern(localizedContentAdapter, /getLocalizedAssetManifest\s*=\s*\(locale:\s*Locale,\s*renderMode:\s*RenderMode/, 'asset adapter must accept a render mode')
}

function verifyDocumentation() {
  const docs = read(files.docs)

  for (const status of ['approved', 'mock', 'needs_input', 'needs_review', 'hidden']) {
    assertIncludes(docs, status, `docs/content-gate.md`)
  }

  assertIncludes(docs, 'preview', 'docs/content-gate.md')
  assertIncludes(docs, 'production', 'docs/content-gate.md')
  assertIncludes(docs, 'filterRenderableContentRecords', 'docs/content-gate.md')
  assertIncludes(docs, 'npm run content:gate', 'docs/content-gate.md')
}

function verifyContentGateCommand() {
  const checkScript = read(files.checkScript)

  assertPattern(checkScript, /priceItems[\s\S]*teacherProfiles[\s\S]*proofAssets[\s\S]*testimonials[\s\S]*faqItems/s, 'content gate command must scan all launch-sensitive content collections')
  assertPattern(checkScript, /assetManifest/, 'content gate command must scan launch-sensitive assets')
  assertPattern(checkScript, /policy_sensitive/, 'content gate command must treat policy-sensitive FAQ answers as required')
  assertPattern(checkScript, /https:\/\/t\.me\/fluyo_manager/, 'content gate command must check the Telegram direct fallback')
  assertPattern(checkScript, /CONTENT_GATE_ROOT/, 'content gate command must support fixture roots for verification')

  const result = spawnSync('node', ['scripts/check-content-gate.mjs'], {
    cwd: root,
    encoding: 'utf8'
  })
  const output = `${result.stdout}\n${result.stderr}`

  assert(result.status === 0 || result.status === 1, 'content gate command must exit cleanly with a gate result')
  assertIncludes(output, 'Telegram direct fallback: ok', 'content gate command output')
}

function createContentGateFixture(records) {
  const fixtureRoot = mkdtempSync(resolve(tmpdir(), 'fluyo-content-gate-'))
  const arraySource = (exportName, items) => {
    return `export const ${exportName} = ${JSON.stringify(items, null, 2)} as const\n`
  }

  writeFixtureFile(resolve(fixtureRoot, 'app/data/content/pricing.ts'), arraySource('priceItems', records.priceItems))
  writeFixtureFile(resolve(fixtureRoot, 'app/data/content/teachers.ts'), arraySource('teacherProfiles', records.teacherProfiles))
  writeFixtureFile(resolve(fixtureRoot, 'app/data/content/proof.ts'), arraySource('proofAssets', records.proofAssets))
  writeFixtureFile(resolve(fixtureRoot, 'app/data/content/testimonials.ts'), arraySource('testimonials', records.testimonials))
  writeFixtureFile(resolve(fixtureRoot, 'app/data/content/faq.ts'), arraySource('faqItems', records.faqItems))
  writeFixtureFile(resolve(fixtureRoot, 'app/data/asset-manifest.ts'), arraySource('assetManifest', records.assetManifest))
  writeFixtureFile(resolve(fixtureRoot, 'app/composables/useTelegramCta.ts'), "const TELEGRAM_BASE_URL = 'https://t.me/fluyo_manager'\n")

  return fixtureRoot
}

function runContentGateFixture(records) {
  const fixtureRoot = createContentGateFixture(records)

  try {
    return spawnSync('node', ['scripts/check-content-gate.mjs'], {
      cwd: root,
      encoding: 'utf8',
      env: {
        ...process.env,
        CONTENT_GATE_ROOT: fixtureRoot
      }
    })
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true })
  }
}

function verifyContentGateCommandBehavior() {
  const baseRecords = {
    priceItems: [
      { id: 'trial', sourceStatus: 'approved', requiredForLaunch: true }
    ],
    teacherProfiles: [
      { id: 'teacher-a', sourceStatus: 'approved' }
    ],
    proofAssets: [
      { id: 'proof-a', sourceStatus: 'approved' }
    ],
    testimonials: [
      { id: 'testimonial-a', sourceStatus: 'approved' }
    ],
    faqItems: [
      { id: 'policy-a', policySensitivity: 'policy_sensitive', sourceStatus: 'approved' }
    ],
    assetManifest: [
      { id: 'asset-a', sourceStatus: 'approved', requiredForLaunch: true }
    ]
  }
  const passingResult = runContentGateFixture(baseRecords)
  const passingOutput = `${passingResult.stdout}\n${passingResult.stderr}`

  assert(passingResult.status === 0, 'content gate fixture must pass when every required record is approved')
  assertIncludes(passingOutput, 'Content gate passed', 'passing content gate fixture output')

  const failingResult = runContentGateFixture({
    ...baseRecords,
    priceItems: [
      { id: 'trial', sourceStatus: 'needs_input', requiredForLaunch: true }
    ]
  })
  const failingOutput = `${failingResult.stdout}\n${failingResult.stderr}`

  assert(failingResult.status === 1, 'content gate fixture must fail when a required record is unresolved')
  assertIncludes(failingOutput, 'Blocking launch content gate issues', 'failing content gate fixture output')
  assertIncludes(failingOutput, 'pricing/trial', 'failing content gate fixture output')
  assertIncludes(failingOutput, 'needs_input', 'failing content gate fixture output')
}

verifyPackageScripts()
verifyContentGateTypes()
verifyDocumentation()
verifyContentGateCommand()
verifyContentGateCommandBehavior()

console.log('Content gate verification passed')
