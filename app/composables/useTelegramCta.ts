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
const telegramPathContexts = ['general', 'exam', 'speaking-club', 'kids', 'professional', 'interview', 'generic'] as const
const telegramFormatContexts = ['individual', 'speaking-club', 'mini-group', 'generic'] as const
const messageIntents = ['book_consultation', 'book_trial', 'book_speaking_club', 'ask_program', 'ask_teacher', 'ask_price'] as const
const defaultMessageIntent = 'book_trial' satisfies MessageIntent

// Prefilled Telegram text is always Ukrainian and intent-only: the manager reads a
// clean human sentence, while path/format/locale stay in the tracking payload.
const intentMessages: Record<MessageIntent, string> = {
  book_consultation: 'Вітаю! Хочу записатися на безкоштовну консультацію.',
  book_trial: 'Вітаю! Хочу записатися на пробний урок.',
  book_speaking_club: 'Вітаю! Хочу записатися на Speaking Club заняття.',
  ask_program: 'Вітаю! Хочу дізнатися більше про програми навчання.',
  ask_teacher: 'Вітаю! Хочу дізнатися більше про викладачів.',
  ask_price: 'Вітаю! Хочу дізнатися про ціни на навчання.'
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

const buildTelegramMessage = (messageIntent: MessageIntent) => {
  return intentMessages[messageIntent]
}

export const resolveTelegramCta = (context: CtaContext = {}, route?: string): TelegramCta => {
  const path = normalizePathContext(context.path)
  const format = normalizeFormatContext(context.format)
  const locale = normalizeLocale(context.locale)
  const messageIntent = normalizeMessageIntent(context.messageIntent)
  const sourceRoute: CtaSourceRoute | undefined = context.sourceRoute
  const message = buildTelegramMessage(messageIntent)
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
