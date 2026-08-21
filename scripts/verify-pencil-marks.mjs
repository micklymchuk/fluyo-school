import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  tailwindCss: resolve(root, 'app/assets/css/tailwind.css'),
  uiPencilMark: resolve(root, 'app/components/ui/UiPencilMark.vue')
}

const checks = {
  svgAttributes: verifySvgAttributeCasing,
  drawing: verifyDrawMechanism,
  decorative: verifyDecorativeContract,
  fallbacks: verifyNoJsAndReducedMotion,
  tokens: verifyTokens,
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

function styleBlock(source) {
  const match = source.match(/<style[^>]*>([\s\S]*?)<\/style>/)
  assert(match, 'UiPencilMark must define a scoped style block')
  return match[1]
}

// Vue passes attribute names through verbatim, so a kebab-cased SVG attribute is
// silently ignored by the browser. For feTurbulence that means baseFrequency
// falls back to 0, the grain alpha goes negative, and feComposite operator="in"
// renders every stroke completely invisible. Cheap to write, near-impossible to
// spot by reading the diff — hence this check.
function verifySvgAttributeCasing() {
  const source = read(files.uiPencilMark)
  const camelCaseRequired = ['baseFrequency', 'numOctaves', 'xChannelSelector', 'yChannelSelector', 'pathLength', 'preserveAspectRatio']

  for (const name of camelCaseRequired) {
    const kebab = name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
    assert(!new RegExp(`[\\s:"']${kebab}\\s*=`).test(source), `UiPencilMark must spell ${name} in camelCase — "${kebab}" is not a real SVG attribute and fails silently`)
    assert(new RegExp(`[\\s:]${name}\\s*=`).test(source), `UiPencilMark must set ${name}`)
  }
}

function verifyDrawMechanism() {
  const source = read(files.uiPencilMark)
  const styles = styleBlock(source)

  assert(/pathLength="1"/.test(source), 'strokes must declare pathLength="1" so the dash maths needs no measurement JS')
  // Leading dot so this matches a real call, not the comment explaining its absence.
  assert(!/\.getTotalLength\(/.test(source), 'UiPencilMark must not measure path length at runtime — pathLength normalization replaces it')
  assert(/stroke-dasharray:\s*1;/.test(styles), 'the dash pattern must match the normalized path length')
  assert(/stroke-dashoffset:\s*1;/.test(styles), 'strokes must start fully undrawn')
  assert(/\.pencil-mark--drawn\s+\.pencil-mark__stroke\s*\{[^}]*stroke-dashoffset:\s*0/.test(styles), 'the drawn state must run the dash offset to 0')

  // Multi-part marks must draw in sequence: an arrow whose head appears with its
  // shaft is the most artificial-looking failure of the whole effect.
  const arrowBlock = source.slice(source.indexOf('arrow: {'), source.indexOf('const props'))
  const offsets = [...arrowBlock.matchAll(/offset:\s*(\d+)/g)].map((m) => Number(m[1]))
  assert(offsets.length >= 3, 'the arrow must be built from a shaft plus two head strokes')
  assert(Math.max(...offsets) > 0, 'the arrow head strokes must start after the shaft, not with it')
}

function verifyDecorativeContract() {
  const source = read(files.uiPencilMark)
  const styles = styleBlock(source)

  assert(/aria-hidden="true"/.test(source), 'the mark is decorative and must be hidden from assistive tech')
  assert(/focusable="false"/.test(source), 'the mark must not be focusable')
  assert(/@apply[^;]*pointer-events-none/.test(styles), 'the mark must never intercept pointer events')
  assert(/@apply[^;]*absolute/.test(styles), 'the mark must be absolutely positioned so it costs no layout')

  // The caller owns placement and size; the primitive must not assert either.
  const forbidden = [/(?:^|[\s;{])(?:width|height)\s*:/, /(?:^|[\s;{])(?:top|right|bottom|left|inset)\s*:/, /(?:^|[\s;{])(?:margin|padding)(?:-\w+)?\s*:/]
  const ownRules = styles.slice(0, styles.indexOf('@media'))

  for (const pattern of forbidden) {
    assert(!pattern.test(ownRules), `UiPencilMark must leave placement and size to the caller (matched ${pattern})`)
  }
}

function verifyNoJsAndReducedMotion() {
  const styles = styleBlock(read(files.uiPencilMark))

  assert(/@media \(prefers-reduced-motion: reduce\)/.test(styles), 'reduced motion must show the mark already drawn')
  assert(/@media \(scripting: none\)/.test(styles), 'no-scripting must show the mark already drawn')

  const head = styles.slice(0, styles.indexOf('@media'))
  assert(head.includes('.pencil-mark__stroke {'), 'the base stroke rule must precede the fallback media blocks so the fallbacks outrank it')
  assert(head.includes('.pencil-mark--drawn .pencil-mark__stroke {'), 'the drawn rule must precede the fallback media blocks')
}

function verifyTokens() {
  assert(/--ease-pencil:\s*cubic-bezier\([^)]*\);/.test(read(files.tailwindCss)), 'tailwind.css @theme must define --ease-pencil')

  const styles = styleBlock(read(files.uiPencilMark))
  assert(/var\(--ease-pencil\)/.test(styles), 'UiPencilMark must consume the --ease-pencil token rather than inlining a curve')
  assert(!/cubic-bezier\(/.test(styles), 'UiPencilMark must not hard-code an easing curve')
  assert(/@apply stroke-/.test(styles), 'stroke colours must come from brand token utilities')
}

function verifyAcceptance() {
  verifySvgAttributeCasing()
  verifyDrawMechanism()
  verifyDecorativeContract()
  verifyNoJsAndReducedMotion()
  verifyTokens()

  assert(
    /"test:pencil-marks":\s*"node scripts\/verify-pencil-marks\.mjs"/.test(read(files.packageJson)),
    'package.json must wire the test:pencil-marks script'
  )
}

const requestedChecks = process.argv.slice(2)
const selectedChecks = requestedChecks.length > 0 ? requestedChecks : Object.keys(checks)

for (const check of selectedChecks) {
  assert(Object.hasOwn(checks, check), `Unknown pencil mark verification scope: ${check}`)
  checks[check]()
}

console.log(`Pencil mark verification passed: ${selectedChecks.join(', ')}`)
