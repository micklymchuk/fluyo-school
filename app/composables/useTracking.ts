import type { TrackingPayload } from '~/data/content'

export const TRACKING_EVENT_NAMES = [
  'path_card_click',
  'program_path_view',
  'pricing_summary_view',
  'pricing_switcher_change',
  'pricing_view',
  'teacher_proof_view',
  'telegram_click',
  'telegram_context'
] as const

export type TrackingEventName = (typeof TRACKING_EVENT_NAMES)[number]

type TrackingEvent = {
  eventName: TrackingEventName
  payload: TrackingPayload
}

export const isTrackingEventName = (eventName: string): eventName is TrackingEventName => {
  return TRACKING_EVENT_NAMES.includes(eventName as TrackingEventName)
}

export const sanitizeTrackingPayload = (payload: TrackingPayload = {}): TrackingPayload => {
  const sanitizedPayload: TrackingPayload = {
    route: payload.route,
    locale: payload.locale,
    path: payload.path,
    format: payload.format,
    sourceRoute: payload.sourceRoute,
    messageIntent: payload.messageIntent,
    trigger: payload.trigger,
    surface: payload.surface
  }

  return Object.fromEntries(
    Object.entries(sanitizedPayload).filter(([, value]) => value !== undefined && value !== null)
  ) as TrackingPayload
}

const emitTrackingEvent = (event: TrackingEvent) => {
  if (import.meta.dev) {
    console.info('[tracking]', event.eventName, event.payload)
  }
}

export const useTracking = () => {
  const trackEvent = (eventName: TrackingEventName, payload: TrackingPayload = {}) => {
    if (!isTrackingEventName(eventName)) {
      if (import.meta.dev) {
        console.warn('[tracking] Dropped unknown event', eventName)
      }

      return
    }

    emitTrackingEvent({
      eventName,
      payload: sanitizeTrackingPayload(payload)
    })
  }

  return {
    trackEvent
  }
}
