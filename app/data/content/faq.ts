import type { FaqItem } from './types'

export const faqItems = [
  {
    id: 'trial-booking'
  },
  {
    id: 'format-choice'
  },
  {
    id: 'teacher-match'
  },
  {
    id: 'pricing-policy'
  },
  {
    id: 'payment-method'
  },
  {
    id: 'schedule-policy'
  },
  {
    id: 'reschedule-policy'
  },
  {
    id: 'online-format'
  },
  {
    id: 'english-switch'
  }
] as const satisfies readonly FaqItem[]
