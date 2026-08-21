import type { FaqItem } from './types'

export const faqItems = [
  {
    id: 'enrollment'
  },
  {
    id: 'consultation-vs-trial'
  },
  {
    id: 'subscription-benefit'
  },
  {
    id: 'teacher-match'
  },
  {
    id: 'online-format'
  },
  {
    id: 'why-miro'
  },
  {
    id: 'progress-time'
  },
  {
    id: 'pair-lessons'
  },
  {
    id: 'format-choice'
  }
] as const satisfies readonly FaqItem[]

// The site currently runs as one page, so home carries the full question list.
export const homeFaqItems = faqItems
