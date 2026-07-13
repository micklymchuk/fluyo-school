import type { PriceItem } from './types'

export const priceItems = [
  {
    id: 'trial',
    format: 'trial',
    sourceStatus: 'needs_input',
    requiredForLaunch: true
  },
  {
    id: 'exam-group',
    format: 'group',
    sourceStatus: 'needs_input',
    requiredForLaunch: true
  },
  {
    id: 'kids-group',
    format: 'group',
    sourceStatus: 'mock',
    requiredForLaunch: false
  },
  {
    id: 'adult-individual',
    format: 'individual',
    sourceStatus: 'needs_review',
    requiredForLaunch: false
  }
] as const satisfies readonly PriceItem[]
