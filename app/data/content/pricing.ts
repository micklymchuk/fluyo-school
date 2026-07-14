import type { PriceItem, PricingFormat, PricingIncludedItem } from './types'

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
  },
  {
    id: 'pair-lessons',
    format: 'pair'
  }
] as const satisfies readonly PriceItem[]

export const pricingFormats = [
  {
    id: 'individual',
    telegramFormat: 'individual',
    priceItemIds: ['adult-individual'],
    pathFit: ['adult', 'exam']
  },
  {
    id: 'pair',
    telegramFormat: 'pair',
    priceItemIds: ['pair-lessons'],
    pathFit: ['adult', 'kids']
  },
  {
    id: 'mini-group',
    telegramFormat: 'mini-group',
    priceItemIds: ['exam-group', 'kids-group'],
    pathFit: ['exam', 'kids']
  }
] as const satisfies readonly PricingFormat[]

export const pricingIncludedItems = [
  {
    id: 'teacher-matching'
  },
  {
    id: 'live-lesson'
  },
  {
    id: 'materials'
  },
  {
    id: 'feedback-progress'
  }
] as const satisfies readonly PricingIncludedItem[]
