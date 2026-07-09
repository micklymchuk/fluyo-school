import { existsSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  tailwindCss: resolve(root, 'app/assets/css/tailwind.css'),
  scss: resolve(root, 'app/assets/scss/main.scss'),
  legacyTokens: resolve(root, 'app/assets/css/tokens.css'),
  legacyMain: resolve(root, 'app/assets/css/main.css'),
  nuxtConfig: resolve(root, 'nuxt.config.ts')
}

function fail(message) {
  throw new Error(message)
}

function assertFile(path) {
  if (!existsSync(path)) {
    fail(`Missing required file: ${relative(root, path)}`)
  }
}

function assertMissing(path) {
  if (existsSync(path)) {
    fail(`Legacy file must be removed: ${relative(root, path)}`)
  }
}

function assertIncludes(source, value, label) {
  if (!source.includes(value)) {
    fail(`${label} must include ${value}`)
  }
}

function assertPattern(source, pattern, label) {
  if (!pattern.test(source)) {
    fail(label)
  }
}

function stripCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, '')
}

function extractThemeBlock(source) {
  const match = /@theme\s+static\s*\{([\s\S]*)\}\s*$/m.exec(source)

  if (!match) {
    fail('tailwind.css must define project tokens in @theme static')
  }

  return match[1]
}

function assertDeclaration(source, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const declaration = new RegExp(`${escaped}\\s*:`)

  if (!declaration.test(source)) {
    fail(`tailwind.css must declare ${property}`)
  }
}

assertFile(files.packageJson)
assertFile(files.tailwindCss)
assertFile(files.scss)
assertFile(files.nuxtConfig)
assertMissing(files.legacyTokens)
assertMissing(files.legacyMain)

const packageJson = JSON.parse(readFileSync(files.packageJson, 'utf8'))
const tailwindCss = stripCssComments(readFileSync(files.tailwindCss, 'utf8'))
const mainScss = stripCssComments(readFileSync(files.scss, 'utf8'))
const nuxtConfig = stripCssComments(readFileSync(files.nuxtConfig, 'utf8'))
const combinedStyles = `${tailwindCss}\n${mainScss}`
const themeBlock = extractThemeBlock(tailwindCss)

const requiredTokens = [
  '--color-page',
  '--color-surface',
  '--color-surface-inverse',
  '--color-text',
  '--color-text-muted',
  '--color-border-hairline',
  '--color-accent-burgundy',
  '--color-accent-subdued',
  '--color-focus',
  '--color-danger',
  '--color-warning',
  '--font-body',
  '--font-display',
  '--text-body',
  '--text-small',
  '--text-eyebrow',
  '--text-section-heading',
  '--text-display-heading',
  '--leading-body',
  '--font-weight-regular',
  '--spacing-page-gutter',
  '--spacing-section',
  '--spacing-component-gap',
  '--spacing-card-padding',
  '--spacing-control-compact',
  '--radius-default',
  '--z-index-focus',
  '--z-index-header',
  '--z-index-mobile-menu',
  '--z-index-overlay',
  '--transition-duration-short',
  '--ease-standard'
]

const devDependencies = packageJson.devDependencies ?? {}

for (const dependency of ['tailwindcss', '@tailwindcss/vite', 'sass']) {
  if (!devDependencies[dependency]) {
    fail(`package.json must include ${dependency} in devDependencies`)
  }
}

assertIncludes(tailwindCss, '@import "tailwindcss"', 'tailwind.css')
assertPattern(mainScss, /@layer\s+base\s*\{/, 'main.scss must keep global defaults in Tailwind base layer')

for (const token of requiredTokens) {
  assertDeclaration(themeBlock, token)
}

assertPattern(mainScss, /body\s*\{[\s\S]*var\(--color-page\)[\s\S]*var\(--color-text\)/, 'main.scss must consume Tailwind theme tokens for body')
assertPattern(mainScss, /a\s*\{[\s\S]*var\(--color-accent-burgundy\)/, 'main.scss must consume Tailwind theme tokens for links')
assertPattern(mainScss, /:focus-visible\s*\{[\s\S]*var\(--color-focus\)/, 'main.scss must include visible token-based focus styles')
assertPattern(mainScss, /img\s*,\s*picture\s*\{[\s\S]*max-width:\s*100%/, 'main.scss must include image base styles')
assertPattern(mainScss, /prefers-reduced-motion:\s*reduce/, 'main.scss must include reduced-motion behavior')
assertPattern(nuxtConfig, /import\s+tailwindcss\s+from\s+["']@tailwindcss\/vite["']/, 'nuxt.config.ts must import @tailwindcss/vite')
assertPattern(nuxtConfig, /plugins\s*:\s*\[\s*tailwindcss\(\)\s*\]/, 'nuxt.config.ts must register the Tailwind Vite plugin')

if (!nuxtConfig.includes('~/assets/scss/main.scss') && !nuxtConfig.includes('app/assets/scss/main.scss')) {
  fail('nuxt.config.ts must include app/assets/scss/main.scss')
}

if (!nuxtConfig.includes('~/assets/css/tailwind.css') && !nuxtConfig.includes('app/assets/css/tailwind.css')) {
  fail('nuxt.config.ts must include app/assets/css/tailwind.css')
}

if (nuxtConfig.includes('tokens.css') || nuxtConfig.includes('main.css')) {
  fail('nuxt.config.ts must not include legacy CSS token files')
}

if (/(font-size|--text-[\w-]+)\s*:[^;]*vw\b/i.test(combinedStyles)) {
  fail('Global CSS must not use viewport-width font sizing')
}

if (/(letter-spacing|--tracking-[\w-]+)\s*:\s*(?:-|calc\([^;]*-\s*)/i.test(combinedStyles)) {
  fail('Global CSS must not use negative letter-spacing')
}

if (/\bbox-shadow\s*:|--(?:inset-)?shadow-[\w-]+\s*:|--drop-shadow-[\w-]+\s*:/i.test(combinedStyles)) {
  fail('Global CSS must not use decorative box-shadow')
}

console.log('Tailwind/SCSS UI foundation verification passed')
