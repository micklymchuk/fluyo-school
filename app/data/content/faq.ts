import type { FaqItem } from './types'

export const faqItems = [
  {
    id: 'trial-booking',
    policySensitivity: 'standard'
  },
  {
    id: 'format-choice',
    policySensitivity: 'standard'
  },
  {
    id: 'teacher-match',
    policySensitivity: 'policy_sensitive'
  },
  {
    id: 'pricing-policy',
    policySensitivity: 'policy_sensitive'
  },
  {
    id: 'schedule-policy',
    policySensitivity: 'policy_sensitive'
  },
  {
    id: 'english-switch',
    policySensitivity: 'standard'
  }
] as const satisfies readonly FaqItem[]
