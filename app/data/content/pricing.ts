import type { PriceItem } from './types'

export const priceItems = [
  {
    id: 'trial',
    format: 'trial'
  },
  {
    id: 'exam-group',
    format: 'group'
  },
  {
    id: 'kids-group',
    format: 'group'
  },
  {
    id: 'adult-individual',
    format: 'individual'
  }
] as const satisfies readonly PriceItem[]
