import type { FaqItem } from './types'

export const faqItems = [
  {
    id: 'trial-booking',
    policySensitivity: 'standard',
    sourceStatus: 'approved'
  },
  {
    id: 'format-choice',
    policySensitivity: 'standard',
    sourceStatus: 'approved'
  },
  {
    id: 'teacher-match',
    policySensitivity: 'policy_sensitive',
    sourceStatus: 'needs_input'
  },
  {
    id: 'pricing-policy',
    policySensitivity: 'policy_sensitive',
    sourceStatus: 'needs_review'
  },
  {
    id: 'schedule-policy',
    policySensitivity: 'policy_sensitive',
    sourceStatus: 'needs_input'
  },
  {
    id: 'english-switch',
    policySensitivity: 'standard',
    sourceStatus: 'approved'
  }
] as const satisfies readonly FaqItem[]
