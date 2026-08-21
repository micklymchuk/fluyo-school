import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  svgDir: resolve(root, 'public/images/svg'),
  pagesDir: resolve(root, 'app/pages'),
  uiSection: resolve(root, 'app/components/sections/UiSection.vue'),
  uiWatermark: resolve(root, 'app/components/ui/UiWatermark.vue'),
  uiWatermarkField: resolve(root, 'app/components/ui/UiWatermarkField.vue')
}

// Every host that mounts a field directly. The field is absolutely positioned
// with an auto z-index, so for each host BOTH facts must hold or the marks
// paint over the copy instead of behind it: the field comes first in the DOM,
// and the content wrapper that follows it is itself positioned.
const hosts = [
  { path: 'app/components/sections/UiSection.vue', content: 'section-inner' },
  { path: 'app/components/sections/home/HomeHeroSection.vue', content: 'home-hero__container' },
  { path: 'app/components/sections/home/HomeSpeakingClubSection.vue', content: 'speaking-club__container' },
  { path: 'app/components/sections/home/HomeFounderSection.vue', content: 'founder__container' },
  { path: 'app/components/sections/home/HomeTeachersSection.vue', content: 'teachers__container' },
  { path: 'app/components/sections/home/HomeTrialPricingSection.vue', content: 'trial-pricing__container' },
  { path: 'app/components/programs/ProgramPathPanel.vue', content: 'program-panel__inner' },
  { path: 'app/components/navigation/FooterContactStrip.vue', content: 'footer-inner' }
]

// Tailwind's max-w-* scale, in rem. A field has to be told how wide the content
// column it sits behind can get, and this is how that claim gets checked.
const containerWidths = {
  'max-w-2xl': 42,
  'max-w-3xl': 48,
  'max-w-4xl': 56,
  'max-w-5xl': 64,
  'max-w-6xl': 72,
  'max-w-7xl': 80
}

const checks = {
  assets: verifyAssetsAndRatios,
  determinism: verifyDeterministicScatter,
  edges: verifyEdgeSafety,
  overlap: verifyNoOverlap,
  motion: verifyMotion,
  decorative: verifyDecorativeContract,
  recolor: verifyMaskRecolouring,
  layering: verifyLayeringContract,
  fallbacks: verifyNoJsAndReducedMotion,
  coverage: verifyRouteCoverage,
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

// Comments in these components explain the very traps being checked for, so a
// naive grep would match its own explanation. Strip them first.
function withoutComments(source) {
  return source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(?<!:)\/\/[^\n]*/g, '')
}

function shapeRatios() {
  const source = read(files.uiWatermark)
  const block = source.match(/const aspects: Record<WatermarkShape, number> = \{([\s\S]*?)\n\}/)
  assert(block, 'UiWatermark must declare the intrinsic aspect ratio of every shape')

  const ratios = new Map()
  for (const entry of block[1].matchAll(/'([\w-]+)':\s*(\d+)\s*\/\s*(\d+)/g)) {
    ratios.set(entry[1], { width: Number(entry[2]), height: Number(entry[3]) })
  }

  assert(ratios.size > 0, 'UiWatermark aspect map must list at least one shape')
  return ratios
}

// The mark's box carries the asset's ratio; `mask-size: contain` then fills it
// exactly. Get the ratio wrong and the mask letterboxes inside the box, so the
// mark silently drifts away from the coordinates the field gave it.
function verifyAssetsAndRatios() {
  const ratios = shapeRatios()
  const available = readdirSync(files.svgDir).filter((name) => name.endsWith('.svg'))

  for (const [shape, ratio] of ratios) {
    const file = resolve(files.svgDir, `${shape}.svg`)
    assert(existsSync(file), `UiWatermark references ${shape}.svg, which is not in public/images/svg`)

    const svg = readFileSync(file, 'utf8')
    const width = svg.match(/\swidth="(\d+(?:\.\d+)?)"/)
    const height = svg.match(/\sheight="(\d+(?:\.\d+)?)"/)
    assert(width && height, `${shape}.svg must declare width and height so its ratio can be verified`)
    assert(
      Number(width[1]) === ratio.width && Number(height[1]) === ratio.height,
      `UiWatermark records ${shape} as ${ratio.width}/${ratio.height}, but ${shape}.svg is ${width[1]}x${height[1]}`
    )
  }

  // A new asset dropped into the folder has to be declared, or it is unreachable.
  for (const name of available) {
    const shape = name.replace(/\.svg$/, '')
    assert(ratios.has(shape), `public/images/svg/${name} is unreachable: give ${shape} a ratio in UiWatermark`)
  }

  const field = read(files.uiWatermarkField)
  const poolBlock = field.match(/const pool: WatermarkShape\[\] = \[([\s\S]*?)\]/)?.[1] ?? ''

  for (const shape of ratios.keys()) {
    assert(new RegExp(`'${shape}':`).test(field), `UiWatermarkField must give ${shape} a size range`)
  }

  for (const entry of poolBlock.matchAll(/'([\w-]+)'/g)) {
    assert(ratios.has(entry[1]), `UiWatermarkField pool draws ${entry[1]}, which UiWatermark has no ratio for`)
  }

  // star-line is a star trailing a long rule. Held out of the automatic scatter
  // on purpose: run into the reading column it looks like a strikethrough.
  assert(!/'star-line'/.test(poolBlock), 'UiWatermarkField must keep star-line out of the scatter pool')
}

// The scatter has to be a pure function of the seed. Math.random() (or a Date)
// would produce different marks on the server and on the client, i.e. a
// hydration mismatch on every mark in every field on the page.
function verifyDeterministicScatter() {
  const field = withoutComments(read(files.uiWatermarkField))

  assert(!/Math\.random\(/.test(field), 'UiWatermarkField must not call Math.random — the scatter must be seed-derived so SSR and the client agree')
  assert(!/Date\.now\(|new Date\(/.test(field), 'UiWatermarkField must not derive the scatter from the clock')
  assert(/function hashSeed\(/.test(field), 'UiWatermarkField must hash the seed string')
  assert(/function randomizer\(/.test(field), 'UiWatermarkField must run a seeded pseudo-random generator')
  assert(/hashSeed\(props\.seed\)/.test(field), 'the generator must be seeded from the seed prop')

  // Upright by design: every asset is drawn on its own axis, so a tilt turns the
  // star into a pinwheel and the ruled line into a scratch across the copy.
  const mark = withoutComments(read(files.uiWatermark))
  assert(!/rotate\(/.test(mark), 'UiWatermark must not rotate its marks')
  assert(!/\brotate\b/.test(field), 'UiWatermarkField must not hand the marks a rotation')

  // The right gutter carries the denser half of the scatter.
  assert(/rightExtra/.test(field), 'UiWatermarkField must offer the extra right-gutter pass')
  assert(/mark\(`right-\$\{index\}`, 'right'/.test(field), 'the extra pass must place its marks in the right gutter')

  const section = read(files.uiSection)
  assert(/const watermarkSeed = computed\(/.test(section), 'UiSection must derive a stable per-section seed')
  assert(/generatedId/.test(section.match(/const watermarkSeed = computed\(\(\) => \{([\s\S]*?)\n\}\)/)?.[1] ?? ''), 'the section seed must include the SSR-stable generated id so two same-titled sections still differ')
}

// The next section paints its own opaque background over anything that bleeds
// past a boundary, so a mark crossing one reads as sliced rather than bleeding.
// Both halves of the guard have to stay in place: the geometry that keeps a mark
// inside its box, and the caps that shrink one bigger than its box.
function verifyEdgeSafety() {
  const source = read(files.uiWatermark)
  const styles = styleBlock(source, 'UiWatermark')
  const script = withoutComments(source.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '')

  assert(/\[props\.side\]:/.test(script), 'UiWatermark must anchor a mark to one edge, not centre it on a percentage its own width can overshoot')
  assert(!/translate\(-50%/.test(script), 'UiWatermark must not centre a mark on its own box — half of it would hang outside the anchor')
  assert(/top: `clamp\(/.test(script), 'UiWatermark must clamp the vertical position into the range where the whole mark fits')
  assert(/max\(\$\{edge\}rem/.test(script), 'the clamp ceiling must be floored with max() — in a box shorter than the mark, clamp() flips otherwise')
  assert(/max-height: calc\(100% - /.test(styles), 'UiWatermark must cap a mark to its box height so an oversized one shrinks instead of being clipped')

  const field = withoutComments(read(files.uiWatermarkField))
  assert(!/x:\s/.test(field), 'UiWatermarkField must place marks by side and inset, not by a centred x percentage')
  assert(/inset: /.test(field) && /side,/.test(field), 'UiWatermarkField must hand each mark a side and an inset')
}

// The marks ping-pong: grow in from small, hold, then play the same keyframes
// backwards on the way out, each on its own seeded clock.
function verifyMotion() {
  const source = read(files.uiWatermark)
  const styles = styleBlock(source, 'UiWatermark')
  const script = withoutComments(source.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '')
  const keyframes = styles.match(/@keyframes watermark-breathe \{([\s\S]*?)\n\}/)
  assert(keyframes, 'UiWatermark must define the watermark-breathe keyframes')

  const animation = styles.match(/\.watermark--breathing \{([\s\S]*?)\}/)
  assert(animation, 'UiWatermark must define the breathing state')
  assert(/\balternate\b/.test(animation[1]), 'the animation must run alternate — that is what makes appearing and disappearing mirror images instead of two animations to keep in sync')
  assert(/\binfinite\b/.test(animation[1]), 'the animation must repeat')
  assert(/var\(--watermark-breathe\)/.test(animation[1]) && /var\(--watermark-phase\)/.test(animation[1]), 'duration and phase must come from the per-mark custom properties')

  // Compositor-only, or 40-odd marks animating at once would relayout the page
  // on every frame.
  const animatable = withoutComments(keyframes[1]).match(/^\s*([a-z-]+):/gm) ?? []
  for (const property of animatable) {
    const name = property.trim().replace(':', '')
    assert(['opacity', 'transform'].includes(name), `watermark-breathe must animate only opacity and transform — ${name} would cost layout or paint on every frame`)
  }

  assert(/from \{[\s\S]*?transform: scale\(var\(--watermark-from-scale\)\)/.test(keyframes[1]), 'a mark must grow in from its from-scale, not appear at full size')
  assert(/opacity: var\(--watermark-opacity\)/.test(keyframes[1]), 'the animation must peak at the per-mark opacity — a running animation outranks any inline opacity, so a literal here would flatten every mark to one strength')
  const styleObject = script.match(/const style = computed\(\(\) => \{([\s\S]*?)\n\}\)/)
  assert(styleObject, 'UiWatermark must build its inline style in a computed')
  assert(!/^\s*opacity:/m.test(styleObject[1]), 'UiWatermark must pass its opacity in as a custom property, not as an inline opacity declaration the animation would override')

  // Equal specificity ⇒ source order decides, so the fallback stays last.
  assert(styles.lastIndexOf('@media (prefers-reduced-motion: reduce)') > styles.indexOf('.watermark--breathing {'), 'the reduced-motion block must follow the breathing rule so it outranks it')
  const reduce = styles.slice(styles.lastIndexOf('@media (prefers-reduced-motion: reduce)'))
  assert(/animation: none/.test(reduce), 'prefers-reduced-motion must stop the marks breathing')
  assert(!/opacity: 0/.test(reduce), 'the reduced-motion fallback must leave marks visible, at the strength the base rule already gives them')

  const field = withoutComments(read(files.uiWatermarkField))
  assert(/const breathe = still \? 0 : /.test(field), 'UiWatermarkField must give each mark its own seeded leg duration, and keep some marks still')
  assert(/const phase = still \? 0 : -/.test(field), 'phases must be negative so the page opens mid-scatter instead of breathing in as one')
  assert(/fromScale: /.test(field), 'each mark must get its own start scale')
}

// The one thing a watermark must never do is sit under the copy. Marks are
// confined to the empty gutters beside the centred content column, which only
// works if every field is told how wide that column can actually get: claim
// 72rem in a section whose container is max-w-7xl and the marks slide 4rem under
// the text on a wide screen.
function verifyNoOverlap() {
  const script = withoutComments(read(files.uiWatermark).match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? '')
  const width = script.match(/width: `([^`]*)`/)
  assert(width, 'UiWatermark must compute its width')
  assert(/var\(--watermark-content/.test(width[1]), "a mark's width must be solved against the content column, so no viewport width can put it under the copy")
  assert(/\(100% - var\(--watermark-content[^)]*\)?\) \/ 2/.test(width[1]), 'the width must be bounded by the gutter: (section - content) / 2')
  assert(/^min\(/.test(width[1]) && /max\(0rem/.test(width[1]), 'the width must clamp into [0, gutter] so a section with no gutter simply shows no marks')
  const fieldStyles = withoutComments(styleBlock(read(files.uiWatermarkField), 'UiWatermarkField'))
  assert(/--watermark-content/.test(read(files.uiWatermarkField)), 'UiWatermarkField must publish the content width its marks solve against')
  assert(/@media \(max-width: 72rem\)[\s\S]*?display: none/.test(fieldStyles), 'UiWatermarkField must drop out where no gutter is left, so phones do not run a page of invisible animations')

  for (const host of hosts) {
    const source = read(resolve(root, host.path))
    const styles = styleBlock(source, host.path)
    const declared = withoutComments(source).match(/<UiWatermarkField[\s\S]*?\/>/)?.[0] ?? ''
    const claimed = Number(declared.match(/:content-width="(\d+)"/)?.[1] ?? 72)

    const widest = Object.entries(containerWidths)
      .filter(([name]) => new RegExp(`\\b${name}\\b`).test(styles))
      .reduce((max, [, value]) => Math.max(max, value), 0)

    if (widest === 0) {
      continue
    }

    assert(
      claimed >= widest,
      `${host.path} lets its content reach ${widest}rem but tells the watermark field ${claimed}rem — pass :content-width="${widest}" or the marks land under the copy`
    )
  }
}

function verifyDecorativeContract() {
  const mark = read(files.uiWatermark)
  const field = read(files.uiWatermarkField)

  for (const [label, source] of [['UiWatermark', mark], ['UiWatermarkField', field]]) {
    assert(/aria-hidden="true"/.test(source), `${label} must be hidden from assistive technology`)
    assert(/pointer-events-none/.test(styleBlock(source, label)), `${label} must never intercept pointer events`)
    assert(/absolute/.test(styleBlock(source, label)), `${label} must be absolutely positioned so it cannot affect layout`)
  }

  // overflow-clip and NOT overflow-hidden: marks are placed to bleed past the
  // section edges, and a scroll container here would let a wide mark push the
  // whole page sideways.
  const fieldStyles = withoutComments(styleBlock(field, 'UiWatermarkField'))
  assert(/overflow-clip/.test(fieldStyles), 'UiWatermarkField must clip its marks so a bleeding mark cannot widen the page')
  assert(!/overflow-hidden/.test(fieldStyles), 'UiWatermarkField must use overflow-clip, not overflow-hidden — the latter makes it a scroll container')
}

// The assets are hard-coded burgundy. Masking is what lets one file serve both
// the cream page and the burgundy band, and what keeps the colour on the brand
// tokens instead of frozen into the SVG.
function verifyMaskRecolouring() {
  const source = read(files.uiWatermark)
  const styles = styleBlock(source, 'UiWatermark')

  for (const property of ['mask-image', 'mask-repeat', 'mask-size', 'mask-position']) {
    assert(new RegExp(`(?:^|[\\s;{])${property}:`, 'm').test(styles), `UiWatermark must set ${property}`)
    assert(new RegExp(`-webkit-${property}:`).test(styles), `UiWatermark must also set -webkit-${property} — Safari below 15.4 ignores the unprefixed property and paints a solid box`)
  }

  assert(/--watermark-src/.test(styles) && /--watermark-src/.test(source), 'the mask source must be passed in as a custom property, not hard-coded per shape')
  assert(!/#[0-9a-fA-F]{3,8}\b/.test(styles), 'UiWatermark must take its colour from brand tokens, never a raw hex value')
  assert(/\.watermark--inverse\s*\{[\s\S]*?bg-text-inverse/.test(styles), 'UiWatermark must offer an inverse tone for marks sitting on the burgundy band')

  const section = read(files.uiSection)
  assert(/variant === 'inverse' \? 'inverse' :/.test(section), "UiSection must switch the field to the inverse tone on the burgundy band, where a burgundy mark is invisible")
}

function verifyLayeringContract() {
  for (const host of hosts) {
    const source = read(resolve(root, host.path))
    const template = source.match(/<template>([\s\S]*)<\/template>/)
    assert(template, `${host.path} must define a template`)

    const markup = withoutComments(template[1])
    const fieldAt = markup.indexOf('<UiWatermarkField')
    const contentAt = markup.indexOf(host.content)
    assert(fieldAt !== -1, `${host.path} must mount a UiWatermarkField`)
    assert(contentAt !== -1, `${host.path} must render its .${host.content} wrapper`)
    assert(fieldAt < contentAt, `${host.path} must place the watermark field ahead of .${host.content} — paint order is DOM order for auto z-index siblings`)

    const styles = styleBlock(source, host.path)
    const rule = styles.match(new RegExp(`\\.${host.content.replace(/([.*+?^${}()|[\\]\\\\])/g, '\\\\$1')}\\s*\\{([\\s\\S]*?)\\}`))
    assert(rule, `${host.path} must style .${host.content}`)
    assert(/\brelative\b/.test(rule[1]), `.${host.content} in ${host.path} must be positioned, or the watermark field paints over it`)
  }
}

function verifyNoJsAndReducedMotion() {
  const styles = styleBlock(read(files.uiWatermarkField), 'UiWatermarkField')

  assert(/@media \(prefers-reduced-motion: reduce\)/.test(styles), 'UiWatermarkField must show its marks outright under prefers-reduced-motion')
  assert(/@media \(scripting: none\)/.test(styles), 'UiWatermarkField must show its marks outright when scripting is unavailable')

  // Equal specificity ⇒ source order decides, so both fallbacks have to sit
  // after every rule that hides the field.
  const firstMedia = styles.indexOf('@media')
  assert(styles.slice(0, firstMedia).includes('.watermark-field {'), 'UiWatermarkField must declare its base rule ahead of the fallback media blocks')
  assert(styles.indexOf('.watermark-field--visible {') < styles.lastIndexOf('@media (prefers-reduced-motion: reduce)'), 'the visible-state rule must precede the fallbacks so the fallbacks outrank it')
}

// Every section a route actually renders must end up with a field, whether it
// gets one from UiSection, mounts one itself, or delegates to a child that does.
function verifyRouteCoverage() {
  const resolveImports = (source, fromDir) => {
    return [...source.matchAll(/from '([~@]\/components\/[\w/-]+\.vue)'/g)].map((match) => {
      return resolve(root, 'app', match[1].slice(2))
    }).concat([...source.matchAll(/from '(\.\/[\w/-]+\.vue)'/g)].map((match) => resolve(fromDir, match[1])))
  }

  const covers = (path, seen = new Set()) => {
    if (seen.has(path)) {
      return false
    }
    seen.add(path)

    const source = read(path)
    if (/<UiWatermarkField/.test(source) || /<UiSection/.test(source)) {
      return true
    }

    return resolveImports(source, dirname(path)).some((child) => existsSync(child) && covers(child, seen))
  }

  const pages = readdirSync(files.pagesDir).filter((name) => name.endsWith('.vue'))
  assert(pages.length > 0, 'app/pages must contain route pages')

  for (const page of pages) {
    const pagePath = resolve(files.pagesDir, page)
    const source = read(pagePath)
    const rendered = [...withoutComments(source).matchAll(/<(\w+Section)\b/g)].map((match) => match[1])
    assert(rendered.length > 0, `${page} must render at least one section component`)

    for (const name of new Set(rendered)) {
      const importMatch = source.match(new RegExp(`import ${name} from '([^']+)'`))
      assert(importMatch, `${page} renders ${name} without importing it`)
      const sectionPath = resolve(root, 'app', importMatch[1].slice(2))
      assert(covers(sectionPath), `${name} (rendered by ${page}) has no watermark field: mount UiWatermarkField or build it on UiSection`)
    }
  }
}

function verifyAcceptance() {
  verifyAssetsAndRatios()
  verifyDeterministicScatter()
  verifyEdgeSafety()
  verifyNoOverlap()
  verifyMotion()
  verifyDecorativeContract()
  verifyMaskRecolouring()
  verifyLayeringContract()
  verifyNoJsAndReducedMotion()
  verifyRouteCoverage()

  assert(
    /"test:watermarks":\s*"node scripts\/verify-watermarks\.mjs"/.test(read(files.packageJson)),
    'package.json must wire the test:watermarks script'
  )
}

const requestedChecks = process.argv.slice(2)
const selectedChecks = requestedChecks.length > 0 ? requestedChecks : Object.keys(checks)

for (const check of selectedChecks) {
  assert(Object.hasOwn(checks, check), `Unknown watermark verification scope: ${check}`)
  checks[check]()
}

console.log(`Watermark verification passed: ${selectedChecks.join(', ')}`)
