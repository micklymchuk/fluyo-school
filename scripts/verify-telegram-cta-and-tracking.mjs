import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = process.cwd()
const files = {
  packageJson: resolve(root, 'package.json'),
  useTelegramCta: resolve(root, 'app/composables/useTelegramCta.ts'),
  useTracking: resolve(root, 'app/composables/useTracking.ts'),
  contentTypes: resolve(root, 'app/data/content/types.ts'),
  navigationLinks: resolve(root, 'app/components/navigation/navigationLinks.ts'),
  appHeader: resolve(root, 'app/components/navigation/AppHeader.vue'),
  mobileNav: resolve(root, 'app/components/navigation/MobileNav.vue'),
  footerContactStrip: resolve(root, 'app/components/navigation/FooterContactStrip.vue')
}

const allowedEvents = [
  'path_card_click',
  'program_path_view',
  'pricing_summary_view',
  'pricing_view',
  'teacher_proof_view',
  'telegram_click',
  'telegram_context'
]

const trackingPayloadKeys = ['route', 'locale', 'path', 'format', 'sourceRoute', 'messageIntent']

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

function scanProductionSources() {
  return listFiles(resolve(root, 'app'))
    .filter((path) => /\.(?:vue|ts)$/.test(path))
    .map((path) => [path, readFileSync(path, 'utf8')])
}

function removeImportBlocks(source) {
  return source.replace(/^import[\s\S]*?from ['"][^'"]+['"]\n/gm, '')
}

function loadTelegramCtaModule() {
  const useTelegramCta = read(files.useTelegramCta)
  const composableStart = useTelegramCta.indexOf('export const useTelegramCta')

  assert(composableStart > -1, 'useTelegramCta source must export the Nuxt composable')

  const executableSource = removeImportBlocks(useTelegramCta.slice(0, composableStart))
    .replace(/export type TelegramCta = \{[\s\S]*?\n\}\n/, '')
    .replace(/ as const/g, '')
    .replace(/ satisfies MessageIntent/g, '')
    .replace(/ as (?:Locale|TelegramPathContext|TelegramFormatContext|MessageIntent)/g, '')
    .replace(/const (\w+): Record<[^>]+> =/g, 'const $1 =')
    .replace(/const isTelegramPathContext = \(value: unknown\): value is TelegramPathContext =>/, 'const isTelegramPathContext = (value) =>')
    .replace(/const isTelegramFormatContext = \(value: unknown\): value is TelegramFormatContext =>/, 'const isTelegramFormatContext = (value) =>')
    .replace(/const isLocale = \(value: unknown\): value is Locale =>/, 'const isLocale = (value) =>')
    .replace(/const isMessageIntent = \(value: unknown\): value is MessageIntent =>/, 'const isMessageIntent = (value) =>')
    .replace(/const normalizePathContext = \(path: unknown\): TelegramPathContext =>/, 'const normalizePathContext = (path) =>')
    .replace(/const normalizeFormatContext = \(format: unknown\): TelegramFormatContext =>/, 'const normalizeFormatContext = (format) =>')
    .replace(/const normalizeLocale = \(locale: unknown\): Locale =>/, 'const normalizeLocale = (locale) =>')
    .replace(/const normalizeMessageIntent = \(messageIntent: unknown\): MessageIntent =>/, 'const normalizeMessageIntent = (messageIntent) =>')
    .replace(/const buildTelegramMessage = \(context: Required<Pick<CtaContext, 'path' \| 'format' \| 'locale' \| 'messageIntent'>>\) =>/, 'const buildTelegramMessage = (context) =>')
    .replace(/export const resolveTelegramCta = \(context: CtaContext = \{}, route\?: string\): TelegramCta =>/, 'const resolveTelegramCta = (context = {}, route) =>')
    .replace(/const sourceRoute: CtaSourceRoute \| undefined =/, 'const sourceRoute =')
    .replace(/const trackingContext: TrackingPayload =/, 'const trackingContext =')

  return new Function(
    'DEFAULT_LOCALE',
    'SUPPORTED_LOCALES',
    `${executableSource}\nreturn { resolveTelegramCta }`
  )('uk', ['uk', 'en'])
}

function loadTrackingModule(testConsole = console) {
  const executableSource = removeImportBlocks(read(files.useTracking))
    .replace(/export type TrackingEventName = \(typeof TRACKING_EVENT_NAMES\)\[number\]\n\n/, '')
    .replace(/type TrackingEvent = \{[\s\S]*?\n\}\n\n/, '')
    .replace(/export const/g, 'const')
    .replace(/\] as const/g, ']')
    .replace(/ as TrackingEventName/g, '')
    .replace(/\) as TrackingPayload/g, ')')
    .replace(/const isTrackingEventName = \(eventName: string\): eventName is TrackingEventName =>/, 'const isTrackingEventName = (eventName) =>')
    .replace(/const sanitizeTrackingPayload = \(payload: TrackingPayload = \{}\): TrackingPayload =>/, 'const sanitizeTrackingPayload = (payload = {}) =>')
    .replace(/const emitTrackingEvent = \(event: TrackingEvent\) =>/, 'const emitTrackingEvent = (event) =>')
    .replace(/const trackEvent = \(eventName: TrackingEventName, payload: TrackingPayload = \{}\) =>/, 'const trackEvent = (eventName, payload = {}) =>')
    .replace(/const sanitizedPayload: TrackingPayload =/, 'const sanitizedPayload =')
    .replace(/import\.meta\.dev/g, 'true')

  return new Function(
    'console',
    `${executableSource}\nreturn { TRACKING_EVENT_NAMES, isTrackingEventName, sanitizeTrackingPayload, useTracking }`
  )(testConsole)
}

function verifyPackageScript() {
  const packageJson = read(files.packageJson)

  assertPattern(
    packageJson,
    /"test:telegram-cta":\s*"node scripts\/verify-telegram-cta-and-tracking\.mjs"/,
    'package.json must expose test:telegram-cta'
  )
}

function verifySharedTypes() {
  const contentTypes = read(files.contentTypes)

  assertPattern(contentTypes, /export type TelegramPathContext = 'exam' \| 'kids' \| 'adult' \| 'generic'/, 'content types must define TelegramPathContext')
  assertPattern(contentTypes, /export type TelegramFormatContext = 'individual' \| 'speaking-club' \| 'mini-group' \| 'generic'/, 'content types must define TelegramFormatContext')
  assertPattern(contentTypes, /export type CtaSourceRoute = PageRouteId \| 'header' \| 'footer' \| 'section' \| 'final-booking'/, 'content types must define CtaSourceRoute')
  assertPattern(contentTypes, /export type CtaContext = \{[\s\S]*path\?: TelegramPathContext[\s\S]*format\?: TelegramFormatContext[\s\S]*sourceRoute\?: CtaSourceRoute[\s\S]*locale\?: Locale[\s\S]*messageIntent\?: MessageIntent/s, 'content types must define optional CtaContext fields')
  assertPattern(contentTypes, /export type TrackingPayload = \{[\s\S]*route\?: string \| null[\s\S]*locale\?: Locale \| null[\s\S]*path\?: TelegramPathContext \| null[\s\S]*format\?: TelegramFormatContext \| null[\s\S]*sourceRoute\?: CtaSourceRoute \| null[\s\S]*messageIntent\?: MessageIntent \| null/s, 'content types must define nullable TrackingPayload fields')
}

function verifyTelegramCtaComposable() {
  const useTelegramCta = read(files.useTelegramCta)

  assertIncludes(useTelegramCta, 'https://t.me/fluyo_manager', 'useTelegramCta')
  assertPattern(useTelegramCta, /encodeURIComponent/, 'useTelegramCta must centralize URL encoding')
  assertPattern(useTelegramCta, /resolveTelegramCta\(/, 'useTelegramCta must expose a pure CTA resolver')
  assertPattern(useTelegramCta, /useTelegramCta\s*(?:=\s*)?\(/, 'useTelegramCta must expose the Nuxt composable')
  assertPattern(useTelegramCta, /isTelegramPathContext\(path\) \? path : 'generic'/, 'unknown path must fall back to generic context')
  assertPattern(useTelegramCta, /isTelegramFormatContext\(format\) \? format : 'generic'/, 'unknown format must fall back to generic context')
  assertPattern(useTelegramCta, /isLocale\(locale\) \? locale : DEFAULT_LOCALE/, 'unknown locale must fall back to default locale')
  assertPattern(useTelegramCta, /isMessageIntent\(messageIntent\) \? messageIntent : defaultMessageIntent/, 'unknown message intent must fall back to default intent')
  assertPattern(useTelegramCta, /exam[\s\S]*kids[\s\S]*adult/s, 'known path contexts must be distinguishable')
  assertPattern(useTelegramCta, /localeLabels/, 'useTelegramCta must use readable locale labels in Telegram messages')
  assertPattern(useTelegramCta, /telegram_context/, 'useTelegramCta must expose telegram_context tracking context')
  assertPattern(useTelegramCta, /telegram_click/, 'useTelegramCta must expose telegram_click tracking context')
}

function verifyTelegramCtaBehavior() {
  const { resolveTelegramCta } = loadTelegramCtaModule()
  const genericCta = resolveTelegramCta({
    path: 'unknown',
    format: 'bad-format',
    locale: 'de',
    messageIntent: 'bad-intent',
    sourceRoute: 'header'
  }, '/pricing?path=unknown')
  const genericMessage = decodeURIComponent(new URL(genericCta.url).searchParams.get('text') ?? '')

  assertIncludes(genericMessage, 'book a trial lesson', 'generic Telegram CTA message')
  assertIncludes(genericMessage, 'English lessons', 'generic Telegram CTA message')
  assertIncludes(genericMessage, 'trial', 'generic Telegram CTA message')
  assertIncludes(genericMessage, 'Ukrainian', 'generic Telegram CTA message')
  assertNotIncludes(genericMessage, 'undefined', 'generic Telegram CTA message')
  assertNotIncludes(genericMessage, 'UK', 'generic Telegram CTA message')
  assert(genericCta.trackingContext.path === 'generic', 'unknown path context must normalize to generic')
  assert(genericCta.trackingContext.format === 'generic', 'unknown format context must normalize to generic')
  assert(genericCta.trackingContext.locale === 'uk', 'unknown locale must normalize to uk')
  assert(genericCta.trackingContext.messageIntent === 'book_trial', 'unknown message intent must normalize to book_trial')

  const pathMessages = ['exam', 'kids', 'adult'].map((path) => {
    const cta = resolveTelegramCta({ path, locale: 'en', messageIntent: 'ask_program' }, '/programs')

    return decodeURIComponent(new URL(cta.url).searchParams.get('text') ?? '')
  })

  assert(new Set(pathMessages).size === 3, 'exam, kids, and adult CTA messages must be distinguishable')
}

function verifyTrackingComposable() {
  const useTracking = read(files.useTracking)

  for (const eventName of allowedEvents) {
    assertIncludes(useTracking, `'${eventName}'`, 'useTracking')
  }

  assertPattern(useTracking, /export type TrackingEventName = \(typeof TRACKING_EVENT_NAMES\)\[number\]/, 'useTracking must derive TrackingEventName from the allow-list')
  assertPattern(useTracking, /trackEvent\s*=\s*\(eventName: TrackingEventName/, 'trackEvent must accept only allowed event names')
  assertPattern(useTracking, /if \(!isTrackingEventName\(eventName\)\)/, 'trackEvent must enforce the event allow-list at runtime')
  assertPattern(useTracking, /sanitizeTrackingPayload/, 'useTracking must sanitize payloads')
  assertPattern(useTracking, /value !== undefined && value !== null/, 'tracking payload sanitizer must omit undefined and null values safely')
  assertPattern(useTracking, /console\.info/, 'useTracking must use a dev console adapter until a vendor exists')

  for (const key of trackingPayloadKeys) {
    assertPattern(useTracking, new RegExp(`${key}: payload\\.${key}`), `useTracking must preserve allowed payload key ${key}`)
  }
}

function verifyTrackingBehavior() {
  const logs = []
  const warnings = []
  const { sanitizeTrackingPayload, useTracking } = loadTrackingModule({
    info: (...args) => logs.push(args),
    warn: (...args) => warnings.push(args)
  })
  const sanitizedPayload = sanitizeTrackingPayload({
    route: null,
    locale: 'uk',
    path: undefined,
    format: 'generic',
    sourceRoute: null,
    messageIntent: 'book_trial'
  })
  const { trackEvent } = useTracking()

  assert(!('route' in sanitizedPayload), 'tracking sanitizer must omit null route')
  assert(!('path' in sanitizedPayload), 'tracking sanitizer must omit undefined path')
  assert(!('sourceRoute' in sanitizedPayload), 'tracking sanitizer must omit null sourceRoute')
  assert(sanitizedPayload.locale === 'uk', 'tracking sanitizer must preserve valid locale')
  assert(sanitizedPayload.format === 'generic', 'tracking sanitizer must preserve valid format')
  assert(sanitizedPayload.messageIntent === 'book_trial', 'tracking sanitizer must preserve valid message intent')

  trackEvent('telegram_click', { route: '/pricing', locale: null, messageIntent: 'book_trial' })
  trackEvent('not_allowed', { route: '/bad' })

  assert(logs.length === 1, 'tracking adapter must emit exactly one valid event')
  assert(warnings.length === 1, 'tracking adapter must warn for one invalid event in dev')
  assert(logs[0][1] === 'telegram_click', 'tracking adapter must emit the allowed event name')
  assert(!('locale' in logs[0][2]), 'tracking adapter must sanitize null payload values before emit')
}

function verifyNavigationIntegration() {
  const navigationLinks = read(files.navigationLinks)
  const appHeader = read(files.appHeader)
  const mobileNav = read(files.mobileNav)
  const footer = read(files.footerContactStrip)

  assertNotIncludes(navigationLinks, 'https://t.me/', 'navigationLinks must not hard-code Telegram URLs')
  assertPattern(appHeader, /useTelegramCta\(/, 'AppHeader must build Telegram URLs through useTelegramCta')
  assertPattern(appHeader, /trackTelegramClick/, 'AppHeader must track Telegram clicks through the CTA contract')
  assertPattern(mobileNav, /trackTelegramClick/, 'MobileNav must track Telegram clicks through the CTA contract')
  assertPattern(footer, /useTelegramCta\(/, 'FooterContactStrip must build Telegram URLs through useTelegramCta')
  assertPattern(footer, /trackTelegramClick/, 'FooterContactStrip must track Telegram clicks through the CTA contract')
  assertPattern(appHeader, /\.\.\.\(props\.telegramContext \?\? \{\}\)[\s\S]*sourceRoute: 'header'[\s\S]*locale: locale\.value/, 'AppHeader must own header Telegram source attribution and locale')
  assertPattern(footer, /\.\.\.\(props\.telegramContext \?\? \{\}\)[\s\S]*sourceRoute: 'footer'[\s\S]*locale: locale\.value/, 'FooterContactStrip must own footer Telegram source attribution and locale')
  assertPattern(mobileNav, /const \{ locale \} = useLocale\(\)/, 'MobileNav must read shared locale state for direct usage')
  assertPattern(mobileNav, /\.\.\.\(props\.telegramContext \?\? \{\}\)[\s\S]*sourceRoute: 'header'[\s\S]*locale: locale\.value/, 'MobileNav must own header Telegram source attribution and locale')
}

function verifyNoVendorImportsOrHardcodedTelegramUrls() {
  const sourceEntries = scanProductionSources()
  const vendorPattern = /from ['"](?:@segment|analytics|posthog|mixpanel|gtag|google-analytics)/i
  const forbiddenTelegramUrlPattern = /https:\/\/t\.me\/(?!fluyo_manager)/

  for (const [path, source] of sourceEntries) {
    const label = relative(root, path)

    assert(!vendorPattern.test(source), `${label} must not import an analytics vendor directly`)

    if (path !== files.useTelegramCta) {
      assert(!forbiddenTelegramUrlPattern.test(source), `${label} must not hard-code Telegram URLs outside useTelegramCta`)
    }
  }
}

verifyPackageScript()
verifySharedTypes()
verifyTelegramCtaComposable()
verifyTelegramCtaBehavior()
verifyTrackingComposable()
verifyTrackingBehavior()
verifyNavigationIntegration()
verifyNoVendorImportsOrHardcodedTelegramUrls()

console.log('Telegram CTA and tracking contract verification passed.')
