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

// Home keeps the shortest path through the same answers: how to start, which format,
// who teaches, how online lessons run and what a lesson costs.
export const homeFaqItems = [
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
    id: 'online-format'
  },
  {
    id: 'pricing-policy'
  }
] as const satisfies readonly FaqItem[]
