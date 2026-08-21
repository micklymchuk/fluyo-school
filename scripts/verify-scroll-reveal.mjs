import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  tailwindCss: resolve(root, 'app/assets/css/tailwind.css'),
  useReveal: resolve(root, 'app/composables/useReveal.ts'),
  uiReveal: resolve(root, 'app/components/ui/UiReveal.vue'),
  homeHero: resolve(root, 'app/components/sections/home/HomeHeroSection.vue')
}

const checks = {
  tokens: verifyTokens,
  observer: verifySharedObserver,
  neutrality: verifyLayoutNeutrality,
  fallbacks: verifyNoJsAndReducedMotion,
  lcp: verifyHeroNotGated,
  acceptance: verifyAcceptance
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${relative(root, path)}`)
  return readFileSync(path, 'utf8')
}

function styleBlock(source, label) {
  const match = source.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  assert(match, `${label} must define a scoped style block`)
  return match[1]
}

function verifyTokens() {
  const tailwind = read(files.tailwindCss)

  assert(/--transition-duration-long:\s*\d+ms;/.test(tailwind), 'tailwind.css @theme must define --transition-duration-long')
  assert(/--reveal-distance:\s*[\d.]+rem;/.test(tailwind), 'tailwind.css @theme must define --reveal-distance')

  const styles = styleBlock(read(files.uiReveal), 'UiReveal')

  assert(/var\(--transition-duration-long\)/.test(styles), 'UiReveal must consume the --transition-duration-long token, not a hard-coded duration')
  assert(/var\(--ease-standard\)/.test(styles), 'UiReveal must consume the --ease-standard token, not a hard-coded easing curve')
  assert(/var\(--reveal-distance\)/.test(styles), 'UiReveal must consume the --reveal-distance token, not a hard-coded offset')
  assert(!/transition-duration:\s*\d/.test(styles), 'UiReveal must not hard-code a transition duration')
}

function verifySharedObserver() {
  const composable = read(files.useReveal)
  const component = read(files.uiReveal)

  const constructions = composable.match(/new IntersectionObserver/g) ?? []
  assert(constructions.length === 1, 'useReveal must construct exactly ONE shared IntersectionObserver')
  assert(/let observer: IntersectionObserver \| undefined/.test(composable), 'the shared observer must live in module scope, not per composable call')
  assert(/unobserve/.test(composable), 'useReveal must unobserve settled and unmounted targets')
  assert(/typeof IntersectionObserver === 'undefined'/.test(composable), 'useReveal must reveal immediately when IntersectionObserver is unavailable')

  assert(!/IntersectionObserver/.test(component), 'UiReveal must delegate observation to useReveal instead of running its own observer')
}

function verifyLayoutNeutrality() {
  const styles = styleBlock(read(files.uiReveal), 'UiReveal')

  // The whole contract of this component: it may only touch compositor
  // properties. Anything below would change its parent's layout math.
  const forbidden = [
    /@apply/,
    /(?:^|[\s;{])display\s*:/,
    /(?:^|[\s;{])(?:margin|padding)(?:-\w+)?\s*:/,
    /(?:^|[\s;{])(?:width|height|min-width|min-height|max-width|max-height)\s*:/,
    /(?:^|[\s;{])(?:position|inset|top|right|bottom|left)\s*:/,
    /(?:^|[\s;{])(?:flex|grid|gap|align-items|justify-content)(?:-\w+)?\s*:/,
    /(?:^|[\s;{])(?:background|border|color|font)(?:-\w+)?\s*:/
  ]

  for (const pattern of forbidden) {
    assert(!pattern.test(styles), `UiReveal styles must stay layout- and paint-neutral (matched ${pattern})`)
  }

  assert(/:is=["']as["']/.test(read(files.uiReveal)), 'UiReveal must render a caller-chosen tag so wrapping never breaks a grid or list relationship')
}

function verifyNoJsAndReducedMotion() {
  const source = read(files.uiReveal)
  const styles = styleBlock(source, 'UiReveal')

  assert(/@media \(prefers-reduced-motion: reduce\)/.test(styles), 'UiReveal must show content outright under prefers-reduced-motion')
  assert(/@media \(scripting: none\)/.test(styles), 'UiReveal must show content outright when scripting is unavailable')

  // Equal specificity ⇒ source order decides. Every base/variant rule has to sit
  // ahead of the fallback media blocks, or a fallback loses to a variant.
  const head = styles.slice(0, styles.indexOf('@media'))
  const orderedRules = ['.reveal {', '.reveal--up {', '.reveal--left {', '.reveal--right {', '.reveal--scale {', '.reveal--visible {']

  for (const rule of orderedRules) {
    assert(head.includes(rule), `UiReveal must declare ${rule} ahead of the fallback media blocks so the fallbacks outrank it`)
  }
}

function verifyHeroNotGated() {
  // Hiding above-the-fold copy behind a JS-driven reveal delays LCP directly.
  assert(!/UiReveal/.test(read(files.homeHero)), 'HomeHeroSection must not gate above-the-fold content behind UiReveal (LCP)')
}

function verifyAcceptance() {
  verifyTokens()
  verifySharedObserver()
  verifyLayoutNeutrality()
  verifyNoJsAndReducedMotion()
  verifyHeroNotGated()

  assert(
    /"test:scroll-reveal":\s*"node scripts\/verify-scroll-reveal\.mjs"/.test(read(files.packageJson)),
    'package.json must wire the test:scroll-reveal script'
  )
}

const requestedChecks = process.argv.slice(2)
const selectedChecks = requestedChecks.length > 0 ? requestedChecks : Object.keys(checks)

for (const check of selectedChecks) {
  assert(Object.hasOwn(checks, check), `Unknown scroll reveal verification scope: ${check}`)
  checks[check]()
}

console.log(`Scroll reveal verification passed: ${selectedChecks.join(', ')}`)
