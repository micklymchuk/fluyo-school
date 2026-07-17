import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  appVue: resolve(root, 'app/app.vue'),
  indexPage: resolve(root, 'app/pages/index.vue'),
  programsPage: resolve(root, 'app/pages/programs.vue'),
  teachersPage: resolve(root, 'app/pages/teachers.vue'),
  pricingPage: resolve(root, 'app/pages/pricing.vue'),
  defaultLayout: resolve(root, 'app/layouts/default.vue'),
  uiButton: resolve(root, 'app/components/ui/UiButton.vue'),
  uiIconButton: resolve(root, 'app/components/ui/UiIconButton.vue'),
  uiButtonLink: resolve(root, 'app/components/ui/UiButtonLink.vue'),
  uiCard: resolve(root, 'app/components/ui/UiCard.vue'),
  uiAccordion: resolve(root, 'app/components/ui/UiAccordion.vue'),
  uiLogo: resolve(root, 'app/components/ui/UiLogo.vue'),
  fullLogoAsset: resolve(root, 'public/images/brand/fluyo-logo-full.png'),
  shortLogoAsset: resolve(root, 'public/images/brand/fluyo-logo-short.png'),
  uiSection: resolve(root, 'app/components/sections/UiSection.vue'),
  appHeader: resolve(root, 'app/components/navigation/AppHeader.vue'),
  headerLink: resolve(root, 'app/components/navigation/HeaderLink.vue'),
  mobileNav: resolve(root, 'app/components/navigation/MobileNav.vue'),
  languageControl: resolve(root, 'app/components/navigation/LanguageControl.vue'),
  footerContactStrip: resolve(root, 'app/components/navigation/FooterContactStrip.vue'),
  navigationLinks: resolve(root, 'app/components/navigation/navigationLinks.ts')
}

const checks = {
  shell: verifyShell,
  layout: verifyLayout,
  ui: verifyUiPrimitives,
  sections: verifySectionPrimitive,
  navigation: verifyNavigation,
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

function assertIncludes(source, value, label) {
  assert(source.includes(value), `${label} must include ${value}`)
}

function assertNotIncludes(source, value, label) {
  assert(!source.includes(value), `${label} must not include ${value}`)
}

function assertPattern(source, pattern, label) {
  assert(pattern.test(source), label)
}

function assertOrder(source, terms, label) {
  let lastIndex = -1

  for (const term of terms) {
    const index = source.indexOf(term)
    assert(index >= 0, `${label} must include ${term}`)
    assert(index > lastIndex, `${label} must keep ${terms.join(' > ')} order`)
    lastIndex = index
  }
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

function scanAppSources() {
  return listFiles(resolve(root, 'app'))
    .filter((path) => /\.(?:vue|ts|js|scss|css)$/.test(path))
    .map((path) => [path, readFileSync(path, 'utf8')])
}

function verifyShell() {
  const appVue = read(files.appVue)

  assertFile(files.indexPage)
  assertIncludes(appVue, '<NuxtRouteAnnouncer', 'app/app.vue')
  assertIncludes(appVue, '<NuxtLayout', 'app/app.vue')
  assertIncludes(appVue, '<NuxtPage', 'app/app.vue')
  assertNotIncludes(appVue, 'NuxtWelcome', 'app/app.vue')
}

function verifyLayout() {
  const layout = read(files.defaultLayout)

  assertIncludes(layout, '<AppHeader', 'default layout')
  assertPattern(layout, /<main(?:\s|>)/, 'default layout must render a main element')
  assertIncludes(layout, '<slot', 'default layout')
  assertIncludes(layout, '<FooterContactStrip', 'default layout')
  assertNotIncludes(layout, 'NuxtWelcome', 'default layout')
}

function verifyVisualRules() {
  const tailwindCss = read(resolve(root, 'app/assets/css/tailwind.css'))
  const appHeader = read(files.appHeader)

  assertPattern(tailwindCss, /--color-page:\s*#faf5f2;/, 'App page background token must be brand cream, never pure white')
  assertPattern(tailwindCss, /--color-surface-muted:\s*#f7f3ef;/, 'Cream-on-dark tone must remain available as a muted surface token')
  assertNotIncludes(appHeader, 'border-b border-border-hairline', 'AppHeader must not render a bottom border')
}

function verifyUiPrimitives() {
  const packageJson = read(files.packageJson)
  const button = read(files.uiButton)
  const iconButton = read(files.uiIconButton)
  const buttonLink = read(files.uiButtonLink)
  const card = read(files.uiCard)
  const accordion = read(files.uiAccordion)
  const logo = read(files.uiLogo)
  const primitiveSources = [button, iconButton, buttonLink, card, accordion, logo]

  assertPattern(packageJson, /"@iconoir\/vue":/, 'package.json must include Iconoir Vue for icon components')
  assertFile(files.fullLogoAsset)
  assertFile(files.shortLogoAsset)

  assertPattern(button, /component\s*[\s\S]*:is="componentType"/, 'UiButton must render through a dynamic semantic component')
  assertPattern(button, /\.ui-button\s*\{[\s\S]*min-h-11/, 'UiButton must define a practical 44px base height')
  assertPattern(button, /\.ui-button--compact\s*\{[\s\S]*min-h-11/, 'UiButton compact controls must preserve a practical 44px height')
  assertPattern(button, /ui-button--primary/, 'UiButton must own primary button styling')
  assertPattern(button, /ui-button--secondary/, 'UiButton must own secondary button styling')
  assertPattern(button, /ui-button--ghost/, 'UiButton must own ghost button styling')
  assertPattern(iconButton, /<UiButtonLink[\s\S]*:aria-label="label"/, 'UiIconButton must render icon-only controls through UiButtonLink with an accessible label')
  assertPattern(iconButton, /<component[\s\S]*:is="icon"[\s\S]*aria-hidden="true"/, 'UiIconButton must render the provided icon component as decorative SVG content')
  assertPattern(iconButton, /min-h-11[\s\S]*min-w-11/, 'UiIconButton must preserve a practical 44px icon-button target')
  assertPattern(buttonLink, /<UiButton[\s\S]*:as="componentType"/, 'UiButtonLink must render through UiButton')
  assertPattern(buttonLink, /NuxtLink/, 'UiButtonLink must support internal links')
  assertPattern(buttonLink, /props\.to && !isDisabled\.value/, 'UiButtonLink must not pass disabled internal navigation targets')
  assertPattern(buttonLink, /target\s*:|:target=|target=/, 'UiButtonLink must support external-link target attributes')
  assertPattern(buttonLink, /rel\s*:|:rel=|rel=/, 'UiButtonLink must support external-link rel attributes')

  assertPattern(card, /card-surface/, 'UiCard must define a semantic card-surface class')
  assertPattern(card, /aria-selected/, 'UiCard must expose selected state semantics')
  assertPattern(card, /v-if="!hidden"/, 'UiCard must support hidden state without leaving inert markup')

  assertPattern(accordion, /aria-expanded/, 'UiAccordion must expose aria-expanded on its trigger')
  assertPattern(accordion, /aria-controls/, 'UiAccordion must associate trigger and panel')
  assertPattern(accordion, /role="region"/, 'UiAccordion must expose panel region semantics')

  assertPattern(logo, /fluyo-logo-full\.png/, 'UiLogo must use the full production logo asset')
  assertPattern(logo, /fluyo-logo-short\.png/, 'UiLogo must use the short production logo asset')
  assertPattern(logo, /resolveComponent\('NuxtLink'\)/, 'UiLogo must support linked logo usage')
  assertPattern(logo, /variant/, 'UiLogo must support full and short variants')
  assertPattern(logo, /resolveLogoVariant/, 'UiLogo must guard invalid runtime logo variants')

  for (const source of primitiveSources) {
    assertNoContentImports(source, 'UI primitives')
  }
}

function verifySectionPrimitive() {
  const section = read(files.uiSection)

  assertPattern(section, /section-header/, 'UiSection must provide a section-header class')
  assertPattern(section, /variant/, 'UiSection must support layout variants')
  assertPattern(section, /compact/, 'UiSection must support compact variant')
  assertPattern(section, /spacious/, 'UiSection must support spacious variant')
  assertPattern(section, /inverse/, 'UiSection must support inverse variant')
  assertPattern(section, /@apply[\s\S]*(?:py-section|py-section-compact)/, 'UiSection must consume token-backed Tailwind spacing utilities')
  assertNoContentImports(section, 'UiSection')
}

function verifyNavigation() {
  const navigationLinks = read(files.navigationLinks)
  const appHeader = read(files.appHeader)
  const headerLink = read(files.headerLink)
  const mobileNav = read(files.mobileNav)
  const languageControl = read(files.languageControl)
  const footer = read(files.footerContactStrip)
  const approvedOrder = [
    'navigation.links.home',
    'navigation.links.programs',
    'navigation.links.teachers',
    'navigation.links.pricing'
  ]
  const approvedRoutePages = [
    files.indexPage,
    files.programsPage,
    files.teachersPage,
    files.pricingPage
  ]

  for (const path of approvedRoutePages) {
    assertFile(path)
  }

  assertOrder(navigationLinks, approvedOrder, 'primary navigation')
  assertPattern(navigationLinks, /to:\s*'\/programs'/, 'primary navigation must link to /programs')
  assertPattern(navigationLinks, /to:\s*'\/teachers'/, 'primary navigation must link to /teachers')
  assertPattern(navigationLinks, /to:\s*'\/pricing'/, 'primary navigation must link to /pricing')
  assertNotIncludes(navigationLinks, '/learning-paths', 'primary navigation')
  assertNotIncludes(navigationLinks, '/teachers-proof', 'primary navigation')
  assertNotIncludes(navigationLinks, '/trial-pricing', 'primary navigation')
  assertPattern(appHeader, /primaryNavigationLinks/, 'AppHeader must use shared primary navigation links')
  assertPattern(appHeader, /<UiLogo[\s\S]*variant="short"[\s\S]*<UiLogo[\s\S]*variant="full"/, 'AppHeader must use UiLogo for short and full logo variants')
  assertPattern(appHeader, /<HeaderLink[\s\S]*display="desktop"/, 'AppHeader must use HeaderLink for desktop nav links')
  assertPattern(appHeader, /@iconoir\/vue[\s\S]*Instagram[\s\S]*Telegram|Instagram[\s\S]*Telegram[\s\S]*@iconoir\/vue/, 'AppHeader must import Iconoir Instagram and Telegram icons')
  assertPattern(appHeader, /<UiIconButton[\s\S]*:icon="Instagram"[\s\S]*<UiIconButton[\s\S]*:icon="Telegram"/, 'AppHeader social actions must render as icon buttons')
  assertPattern(appHeader, /<MobileNav[\s\S]*:instagram-href="instagramTarget"[\s\S]*:telegram-context="telegramContext"/, 'AppHeader must pass configurable contact links into MobileNav')
  assertPattern(appHeader, /#language-control[\s\S]*<slot name="language-control"/, 'AppHeader must pass the language-control slot into MobileNav')
  assertPattern(appHeader, /useLocale\(\)/, 'AppHeader must use shared locale state')
  assertPattern(appHeader, /<LanguageControl[\s\S]*:model-value="locale"[\s\S]*@change="handleLocaleChange"/, 'AppHeader must wire LanguageControl to shared locale state')
  assertPattern(mobileNav, /primaryNavigationLinks/, 'MobileNav must use shared primary navigation links')
  assertPattern(mobileNav, /instagramHref/, 'MobileNav must accept configurable Instagram hrefs')
  assertPattern(mobileNav, /<HeaderLink[\s\S]*display="mobile"/, 'MobileNav must use the shared HeaderLink component')
  assertPattern(mobileNav, /@iconoir\/vue[\s\S]*Instagram[\s\S]*Telegram|Instagram[\s\S]*Telegram[\s\S]*@iconoir\/vue/, 'MobileNav must import Iconoir Instagram and Telegram icons')
  assertPattern(mobileNav, /<UiIconButton[\s\S]*:icon="Instagram"[\s\S]*<UiIconButton[\s\S]*:icon="Telegram"/, 'MobileNav social actions must render Instagram and Telegram icon buttons')
  assertPattern(mobileNav, /:class="\{ 'mobile-nav-trigger--open': isOpen \}"/, 'MobileNav trigger must animate between menu and close states')
  assertPattern(mobileNav, /:aria-label="isOpen \? t\('navigation\.closeMenu'\) : t\('navigation\.openMenu'\)"/, 'MobileNav trigger must expose open and close states')
  assertPattern(mobileNav, /\.mobile-nav-trigger--open \.mobile-nav-icon span:first-child\s*\{[\s\S]*rotate-45/, 'MobileNav trigger first line must rotate into the close icon')
  assertPattern(mobileNav, /\.mobile-nav-trigger--open \.mobile-nav-icon span:last-child\s*\{[\s\S]*-rotate-45/, 'MobileNav trigger second line must rotate into the close icon')
  assertNotIncludes(mobileNav, 'class="mobile-close"', 'MobileNav must use the persistent trigger instead of a separate close button')
  assertPattern(mobileNav, /\.mobile-panel\s*\{[\s\S]*fixed[\s\S]*inset-x-0[\s\S]*bottom-0[\s\S]*top-16/, 'MobileNav open panel must fill the viewport below the visible header/logo row')
  assertPattern(mobileNav, /\.mobile-panel\s*\{[\s\S]*overflow-y-auto/, 'MobileNav open panel must remain scrollable when content exceeds the viewport')
  assertPattern(mobileNav, /@keydown\.tab="handlePanelTab"/, 'MobileNav must keep tab focus inside the open panel')
  assertPattern(mobileNav, /\.mobile-link-list\s*\{[\s\S]*items-center[\s\S]*justify-center[\s\S]*text-center/, 'MobileNav links must be centered in the fullscreen menu')
  assertPattern(mobileNav, /mobile-nav-trigger[\s\S]*border-0/, 'MobileNav trigger must render without a border')
  assertNotIncludes(mobileNav, 'border border-border-hairline', 'MobileNav dropdown and trigger must not render hairline borders')
  assertNotIncludes(mobileNav, 'border-t border-border-hairline', 'MobileNav actions must not render a divider border')
  assertPattern(headerLink, /border-b border-transparent/, 'HeaderLink must use a bottom border affordance')
  assertPattern(headerLink, /font-medium/, 'HeaderLink must use medium weight for lighter base navigation text')
  assertPattern(headerLink, /\.header-link--mobile\s*\{[\s\S]*justify-center[\s\S]*text-center/, 'HeaderLink mobile variant must center mobile nav items')
  assertPattern(headerLink, /\.header-link:hover,\s*\.header-link--active\s*\{[\s\S]*border-accent-burgundy[\s\S]*text-accent-burgundy/, 'HeaderLink active and hover states must use primary text color and bottom border')
  assert(!/(?<!no-)underline/.test(headerLink), 'HeaderLink must not use underline styling')
  assertNotIncludes(headerLink, 'bg-surface-muted', 'HeaderLink active and hover states must not use a background fill')
  assertPattern(footer, /primaryNavigationLinks/, 'FooterContactStrip must use shared primary navigation links')
  assertPattern(footer, /defineProps<[\s\S]*instagramHref[\s\S]*telegramContext/, 'FooterContactStrip must accept configurable contact context')
  assertPattern(footer, /<UiLogo[\s\S]*variant="full"/, 'FooterContactStrip must use UiLogo for the footer logo')
  assertPattern(footer, /<UiIconButton[\s\S]*:icon="Instagram"[\s\S]*<UiIconButton[\s\S]*:icon="Telegram"/, 'FooterContactStrip social actions must render as icon buttons')
  assertPattern(footer, /font-medium/, 'FooterContactStrip nav links must use medium weight for lighter base navigation text')
  assertPattern(mobileNav, /route\.fullPath/, 'MobileNav must react to route navigation')
  assertPattern(mobileNav, /isOpen\.value\s*=\s*false/, 'MobileNav must close on navigation')
  assertPattern(mobileNav, /@click="closeNav"/, 'MobileNav must close when clicking the current active route link')
  assertPattern(mobileNav, /mobile-telegram[\s\S]*variant="primary"|variant="primary"[\s\S]*mobile-telegram/, 'MobileNav must keep Telegram visually distinct')
  assertPattern(languageControl, /toggleLocale/, 'LanguageControl must toggle locale from a single button')
  assertPattern(languageControl, /normalizeLocale/, 'LanguageControl must guard invalid runtime locale values')
  assertPattern(languageControl, /language-switch/, 'LanguageControl must animate the label switch')
  assertPattern(languageControl, /Ukrainian|English|UK|EN/, 'LanguageControl must expose Ukrainian and English labels')
  assertPattern(languageControl, /min-h-11|min-height:\s*44px/, 'LanguageControl must define a practical 44px touch target')
  assertPattern(languageControl, /appearance-none/, 'LanguageControl must reset native button appearance')
  assertPattern(languageControl, /border-0/, 'LanguageControl must not render a visible border')
  assertPattern(languageControl, /bg-transparent/, 'LanguageControl must render with transparent background')
  assertPattern(languageControl, /font-medium/, 'LanguageControl must use medium weight for lighter base control text')
  assertNotIncludes(languageControl, 'v-for', 'LanguageControl must not render as a segmented switcher')
  assertNotIncludes(languageControl, 'bg-surface', 'LanguageControl must not use a switcher background')
  assertNotIncludes(languageControl, 'bg-surface-muted', 'LanguageControl hover must not change background color')
}

function verifyAcceptance() {
  verifyVisualRules()
  verifyShell()
  verifyLayout()
  verifyUiPrimitives()
  verifySectionPrimitive()
  verifyNavigation()

  const appSources = scanAppSources()
  const forbiddenRoutes = /\/(?:exams|kids|adults)\b/

  for (const [path, source] of appSources) {
    assert(!forbiddenRoutes.test(source), `${relative(root, path)} must not introduce /exams, /kids, or /adults links`)
  }
}

function assertNoContentImports(source, label) {
  const forbiddenImport = /from\s+['"](?:~\/|@\/|\.\.?\/)*(?:pages|content|server|shared)\b/

  assert(!forbiddenImport.test(source), `${label} must not import route pages or content modules`)
}

const requestedChecks = process.argv.slice(2)
const selectedChecks = requestedChecks.length > 0 ? requestedChecks : Object.keys(checks)

for (const check of selectedChecks) {
  assert(checks[check], `Unknown app shell verification scope: ${check}`)
  checks[check]()
}

console.log(`App shell verification passed: ${selectedChecks.join(', ')}`)
