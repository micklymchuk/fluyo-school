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

// Home keeps the shortest path through the same answers: how to start, which first
// step to take, who teaches, how online lessons run and how to pick a format.
export const homeFaqItems = [
  {
    id: 'enrollment'
  },
  {
    id: 'consultation-vs-trial'
  },
  {
    id: 'teacher-match'
  },
  {
    id: 'online-format'
  },
  {
    id: 'format-choice'
  }
] as const satisfies readonly FaqItem[]
