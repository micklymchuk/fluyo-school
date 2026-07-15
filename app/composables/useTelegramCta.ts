import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { useRoute } from '#imports'
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type CtaContext,
  type CtaSourceRoute,
  type Locale,
  type MessageIntent,
  type TelegramFormatContext,
  type TelegramPathContext,
  type TrackingPayload
} from '~/data/content'
import { useTracking } from './useTracking'

const TELEGRAM_BASE_URL = 'https://t.me/fluyo_manager'
const telegramPathContexts = ['exam', 'kids', 'adult', 'generic'] as const
const telegramFormatContexts = ['individual', 'speaking-club', 'mini-group', 'generic'] as const
const messageIntents = ['book_trial', 'ask_program', 'ask_teacher', 'ask_price'] as const
const defaultMessageIntent = 'book_trial' satisfies MessageIntent

const pathLabels: Record<TelegramPathContext, string> = {
  exam: 'exam preparation',
  kids: 'kids English',
  adult: 'adult speaking',
  generic: 'English lessons'
}

const formatLabels: Record<TelegramFormatContext, string> = {
  individual: 'individual',
  'speaking-club': 'speaking club',
  'mini-group': 'mini-group',
  generic: 'trial'
}

const intentLabels: Record<MessageIntent, string> = {
  book_trial: 'book a paid trial lesson',
  ask_program: 'ask about a program',
  ask_teacher: 'ask about teachers',
  ask_price: 'ask about pricing'
}

const localeLabels: Record<Locale, string> = {
  uk: 'Ukrainian',
  en: 'English'
}

export type TelegramCta = {
  url: string
  trackingContext: TrackingPayload
  contextEvent: TrackingPayload
  clickEvent: TrackingPayload
}

const isTelegramPathContext = (value: unknown): value is TelegramPathContext => {
  return typeof value === 'string' && telegramPathContexts.includes(value as TelegramPathContext)
}

const isTelegramFormatContext = (value: unknown): value is TelegramFormatContext => {
  return typeof value === 'string' && telegramFormatContexts.includes(value as TelegramFormatContext)
}

const isLocale = (value: unknown): value is Locale => {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale)
}

const isMessageIntent = (value: unknown): value is MessageIntent => {
  return typeof value === 'string' && messageIntents.includes(value as MessageIntent)
}

const normalizePathContext = (path: unknown): TelegramPathContext => {
  return isTelegramPathContext(path) ? path : 'generic'
}

const normalizeFormatContext = (format: unknown): TelegramFormatContext => {
  return isTelegramFormatContext(format) ? format : 'generic'
}

const normalizeLocale = (locale: unknown): Locale => {
  return isLocale(locale) ? locale : DEFAULT_LOCALE
}

const normalizeMessageIntent = (messageIntent: unknown): MessageIntent => {
  return isMessageIntent(messageIntent) ? messageIntent : defaultMessageIntent
}

const buildTelegramMessage = (context: Required<Pick<CtaContext, 'path' | 'format' | 'locale' | 'messageIntent'>>) => {
  const pathLabel = pathLabels[context.path]
  const formatLabel = formatLabels[context.format]
  const intentLabel = intentLabels[context.messageIntent]
  const localeLabel = localeLabels[context.locale]

  return `Hi Fluyo, I want to ${intentLabel}. Context: ${pathLabel}, ${formatLabel}, ${localeLabel}.`
}

export const resolveTelegramCta = (context: CtaContext = {}, route?: string): TelegramCta => {
  const path = normalizePathContext(context.path)
  const format = normalizeFormatContext(context.format)
  const locale = normalizeLocale(context.locale)
  const messageIntent = normalizeMessageIntent(context.messageIntent)
  const sourceRoute: CtaSourceRoute | undefined = context.sourceRoute
  const message = buildTelegramMessage({ path, format, locale, messageIntent })
  const trackingContext: TrackingPayload = {
    route,
    locale,
    path,
    format,
    sourceRoute,
    messageIntent
  }

  return {
    url: `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(message)}`,
    trackingContext,
    contextEvent: trackingContext,
    clickEvent: trackingContext
  }
}

export const useTelegramCta = (context?: MaybeRefOrGetter<CtaContext | undefined>) => {
  const route = useRoute()
  const { trackEvent } = useTracking()
  const telegramCta = computed(() => resolveTelegramCta(toValue(context) ?? {}, route.fullPath))
  const url = computed(() => telegramCta.value.url)
  const trackingContext = computed(() => telegramCta.value.trackingContext)

  const trackTelegramContext = () => {
    trackEvent('telegram_context', telegramCta.value.contextEvent)
  }

  const trackTelegramClick = () => {
    trackTelegramContext()
    trackEvent('telegram_click', telegramCta.value.clickEvent)
  }

  return {
    telegramCta,
    url,
    trackingContext,
    trackTelegramContext,
    trackTelegramClick
  }
}
