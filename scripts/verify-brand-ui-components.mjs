import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  mainScss: resolve(root, 'app/assets/scss/main.scss'),
  tailwindCss: resolve(root, 'app/assets/css/tailwind.css'),
  uiButton: resolve(root, 'app/components/ui/UiButton.vue'),
  uiCard: resolve(root, 'app/components/ui/UiCard.vue'),
  uiSection: resolve(root, 'app/components/sections/UiSection.vue'),
  uiEyebrowPill: resolve(root, 'app/components/ui/UiEyebrowPill.vue'),
  uiLockupHeading: resolve(root, 'app/components/ui/UiLockupHeading.vue'),
  uiFrameBox: resolve(root, 'app/components/ui/UiFrameBox.vue'),
  uiStampCard: resolve(root, 'app/components/ui/UiStampCard.vue'),
  uiUnderlineList: resolve(root, 'app/components/ui/UiUnderlineList.vue'),
  uiWatermark: resolve(root, 'app/components/ui/UiWatermark.vue'),
  fontsDir: resolve(root, 'public/fonts')
}

const newComponents = [
  'uiEyebrowPill',
  'uiLockupHeading',
  'uiFrameBox',
  'uiStampCard',
  'uiUnderlineList',
  'uiWatermark'
]

const checks = {
  fonts: verifyFonts,
  primitives: verifyRetrofittedPrimitives,
  components: verifyBrandComponents,
  typography: verifyStableTypeSizes,
  acceptance: verifyAcceptance
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

function assertPattern(source, pattern, label) {
  assert(pattern.test(source), label)
}

function assertNotPattern(source, pattern, label) {
  assert(!pattern.test(source), label)
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

function fontFaceBlocks(source) {
  return source.match(/@font-face\s*\{[^}]*\}/g) ?? []
}

function verifyFonts() {
  const fontFiles = listFiles(files.fontsDir).map((path) => relative(files.fontsDir, path))
  const interFiles = fontFiles.filter((name) => /^inter-.*\.woff2$/.test(name))
  const pinyonFiles = fontFiles.filter((name) => /^pinyon-script-.*\.woff2$/.test(name))

  assert(interFiles.some((name) => name.includes('latin')), 'public/fonts must contain an Inter latin woff2 file')
  assert(interFiles.some((name) => name.includes('cyrillic')), 'public/fonts must contain an Inter cyrillic woff2 file (Ukrainian copy is non-negotiable)')
  assert(pinyonFiles.some((name) => name.includes('latin')), 'public/fonts must contain a Pinyon Script latin woff2 file')
  assert(!pinyonFiles.some((name) => name.includes('cyrillic')), 'Pinyon Script must ship latin-only (no cyrillic file)')

  const mainScss = read(files.mainScss)
  const blocks = fontFaceBlocks(mainScss)
  const interBlocks = blocks.filter((block) => /font-family:\s*['"]Inter['"]/.test(block))
  const pinyonBlocks = blocks.filter((block) => /font-family:\s*['"]Pinyon Script['"]/.test(block))

  assert(interBlocks.length > 0, 'main.scss must declare @font-face for Inter')
  assert(pinyonBlocks.length > 0, 'main.scss must declare @font-face for Pinyon Script')

  for (const block of [...interBlocks, ...pinyonBlocks]) {
    assertPattern(block, /font-display:\s*swap/, 'every brand @font-face must use font-display: swap')
    assertPattern(block, /\/fonts\/[\w-]+\.woff2/, 'every brand @font-face must load a self-hosted woff2 from /fonts/')
  }

  assert(
    interBlocks.some((block) => /unicode-range:[^;]*U\+0400/i.test(block)),
    'Inter @font-face set must cover the cyrillic unicode-range for Ukrainian copy'
  )

  for (const block of pinyonBlocks) {
    assertNotPattern(block, /U\+0400/i, 'Pinyon Script @font-face must not declare a cyrillic unicode-range (script sets Latin only)')
  }

  assertNotPattern(mainScss, /fonts\.(?:googleapis|gstatic)\.com/, 'fonts must be self-hosted, never loaded from Google CDN')
}

function verifyRetrofittedPrimitives() {
  const button = read(files.uiButton)
  const card = read(files.uiCard)
  const section = read(files.uiSection)

  assertPattern(button, /\.ui-button\s*\{[^}]*rounded-pill/, 'UiButton base geometry must be pill (rounded-pill)')
  assertPattern(button, /\.ui-button\s*\{[^}]*min-h-11/, 'UiButton must keep a practical 44px base height')
  assertPattern(button, /\.ui-button--compact\s*\{[^}]*min-h-11/, 'UiButton compact variant must keep a practical 44px height')
  assertPattern(button, /ui-button--primary/, 'UiButton must keep the primary variant')
  assertPattern(button, /ui-button--secondary/, 'UiButton must keep the secondary variant')
  assertPattern(button, /ui-button--ghost/, 'UiButton must keep the ghost variant')
  assertPattern(button, /\.ui-button--secondary\s*\{[^}]*border-accent-burgundy/, 'UiButton secondary variant must use a burgundy border')
  assertPattern(button, /\.ui-button--secondary:hover\s*\{[^}]*bg-accent-subdued/, 'UiButton secondary hover must fill with blush (accent-subdued token)')

  assertPattern(card, /\.card-surface\s*\{[^}]*rounded-card/, 'UiCard surface must use the rounded-card token')

  assertPattern(section, /<UiEyebrowPill/, 'UiSection eyebrow must render through UiEyebrowPill')
  assertPattern(section, /import\s+UiEyebrowPill\s+from/, 'UiSection must explicitly import UiEyebrowPill')
  assertPattern(section, /\.section-title\s*\{[^}]*font-display[^}]*uppercase/, 'UiSection title must be display-sans uppercase')
  assertPattern(section, /\.section-title\s*\{[^}]*font-bold/, 'UiSection title must be bold')
  assertPattern(section, /\.section-title\s*\{[^}]*tracking-display/, 'UiSection title must use the tracking-display token')
  assertPattern(section, /\.section--inverse\s*\{[^}]*bg-surface-inverse/, 'UiSection inverse variant must stay the burgundy band')
  assertPattern(section, /\.section--inverse\s+:deep\(:focus-visible\)\s*\{[^}]*outline-text-inverse/, 'UiSection inverse variant must keep focus rings visible on the burgundy band')
  assertPattern(section, /\.section--inverse\s+:deep\(\.card-surface\s+:focus-visible\)[^{]*\{[^}]*outline-focus/, 'UiSection must restore the teal focus ring on light surfaces nested in the burgundy band')
  assertPattern(section, /\.section--inverse\s+:deep\(\.ui-button--primary\)\s*\{[^}]*bg-surface-muted/, 'UiSection inverse band must flip primary buttons to a cream fill')
  assertPattern(section, /\.section--inverse\s+:deep\(\.ui-button--secondary\)\s*\{[^}]*text-text-inverse/, 'UiSection inverse band must flip secondary buttons to cream border and text')
}

function verifyBrandComponents() {
  for (const key of newComponents) {
    const path = files[key]
    const source = read(path)
    const label = relative(root, path)

    assertPattern(source, /@reference\s+"~\/assets\/css\/tailwind\.css";/, `${label} scoped styles must start with @reference "~/assets/css/tailwind.css"`)
    assertNoRawColors(source, label)
    assertNoContentImports(source, label)
  }

  const eyebrowPill = read(files.uiEyebrowPill)
  assertPattern(eyebrowPill, /\.eyebrow-pill--script\s*\{[^}]*\bh-\d/, 'UiEyebrowPill script variant must be fixed-height (script font metrics overflow padding-driven pills)')
  assertPattern(eyebrowPill, /\.eyebrow-pill--caps\b/, 'UiEyebrowPill must style a caps variant')
  assertPattern(eyebrowPill, /rounded-pill/, 'UiEyebrowPill must use the rounded-pill token')
  assertNotPattern(eyebrowPill, /\.eyebrow-pill\s*\{[^}]*@apply[^;]*\bpy-\d/, 'UiEyebrowPill sizing must be height-driven, not vertical-padding-driven')

  const lockup = read(files.uiLockupHeading)
  assertPattern(lockup, /'h1'\s*\|\s*'h2'\s*\|\s*'h3'/, 'UiLockupHeading must render real h1–h3 heading levels')
  assertPattern(lockup, /font-script/, 'UiLockupHeading script line must use the script font token')
  assertPattern(lockup, /tracking-display/, 'UiLockupHeading caps line must use the tracking-display token')
  assertPattern(lockup, /uppercase/, 'UiLockupHeading caps line must be uppercase')

  const frameBox = read(files.uiFrameBox)
  assertPattern(frameBox, /bg-surface-inverse|bg-accent-burgundy/, 'UiFrameBox frame must be burgundy')
  assertPattern(frameBox, /<slot/, 'UiFrameBox must expose a content slot')

  const stampCard = read(files.uiStampCard)
  assertPattern(stampCard, /@supports[^{]*mask/, 'UiStampCard must gate the perforation behind an @supports mask query')
  assertPattern(stampCard, /radial-gradient/, 'UiStampCard perforation must use the radial-gradient hole recipe')
  assertPattern(stampCard, /-webkit-mask/, 'UiStampCard must include the -webkit-mask twin')
  assertPattern(stampCard, /rounded-card/, 'UiStampCard fallback must remain a plain rounded card')
  assertPattern(stampCard, /aria-hidden/, 'UiStampCard decorative edge must not affect reading order')

  const underlineList = read(files.uiUnderlineList)
  assertPattern(underlineList, /<ul/, 'UiUnderlineList must keep semantic list markup')
  assertPattern(underlineList, /list-none/, 'UiUnderlineList must suppress native bullets')
  assertPattern(underlineList, /inverse/, 'UiUnderlineList must support the inverse variant')

  const watermark = read(files.uiWatermark)
  assertPattern(watermark, /aria-hidden="true"/, 'UiWatermark must be aria-hidden decoration')
  assertPattern(watermark, /pointer-events-none|pointer-events:\s*none/, 'UiWatermark must not intercept pointer events')
  assertPattern(watermark, /absolute/, 'UiWatermark must be absolutely positioned inside its parent')
  assertPattern(watermark, /font-script/, 'UiWatermark glyphs must render in the script face')
  assertPattern(watermark, /inverse/, 'UiWatermark must support the on-inverse mode')
}

function verifyStableTypeSizes() {
  const appSources = listFiles(resolve(root, 'app'))
    .filter((path) => /\.(?:vue|scss|css)$/.test(path))
    .map((path) => [path, readFileSync(path, 'utf8')])

  for (const [path, source] of appSources) {
    assertNotPattern(
      source,
      /font-size:[^;]*\b(?:[sdl]?v(?:w|h|i|b|min|max)|cq(?:w|h|i|b|min|max))\b/,
      `${relative(root, path)} must not scale font-size with viewport or container units`
    )
    assertNotPattern(
      source,
      /text-\[[^\]]*\b(?:[sdl]?v[wh]|cqw|cqh)\b/,
      `${relative(root, path)} must not scale type with arbitrary viewport-unit utilities`
    )
  }
}

function verifyAcceptance() {
  verifyFonts()
  verifyRetrofittedPrimitives()
  verifyBrandComponents()
  verifyStableTypeSizes()

  const packageJson = read(files.packageJson)
  assertPattern(packageJson, /"test:brand-ui":\s*"node scripts\/verify-brand-ui-components\.mjs"/, 'package.json must wire the test:brand-ui script')
}

function assertNoRawColors(source, label) {
  const styleBlocks = source.match(/<style[^>]*>[\s\S]*?<\/style>/g) ?? []

  for (const block of styleBlocks) {
    assertNotPattern(block, /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/i, `${label} styles must not contain raw hex colors — consume tokens`)
    assertNotPattern(block, /\brgba?\(\s*\d/, `${label} styles must not contain raw rgb() colors — consume tokens`)
    assertNotPattern(block, /\b(?:hsla?|oklch|oklab|lch|lab)\(/, `${label} styles must not contain raw color functions — consume tokens`)
    // Color keywords (black/transparent) stay allowed: mask gradients use them as alpha channels, not brand colors.
  }
}

function assertNoContentImports(source, label) {
  const forbiddenImport = /from\s+['"](?:~\/|@\/|\.\.?\/)*(?:pages|content|server|shared|composables)\b/
  const forbiddenRuntime = /\buse(?:I18n|Telegram\w*|Tracking|Content|Locale|Route|Router|Fetch|AsyncData|State|Cookie|Head|Seo\w*)\b/

  assert(!forbiddenImport.test(source), `${label} must stay presentational (no content/composable imports)`)
  assert(!forbiddenRuntime.test(source), `${label} must stay presentational (no i18n/routing/tracking composables)`)
}

const requestedChecks = process.argv.slice(2)
const selectedChecks = requestedChecks.length > 0 ? requestedChecks : Object.keys(checks)

for (const check of selectedChecks) {
  assert(Object.hasOwn(checks, check), `Unknown brand UI verification scope: ${check}`)
  checks[check]()
}

console.log(`Brand UI verification passed: ${selectedChecks.join(', ')}`)
