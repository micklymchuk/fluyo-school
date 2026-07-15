import type { PriceConfig, PriceItem, PriceItemId, PricingFormat, PricingIncludedItem } from './types'

export const priceItems = [
  {
    id: 'TRIAL'
  },
  {
    id: 'EXAM_PREP'
  },
  {
    id: 'INDIVIDUAL'
  },
  {
    id: 'MINI_GROUP'
  },
  {
    id: 'SPEAKING_CLUB'
  }
] as const satisfies readonly PriceItem[]

export const PRICES_CONFIG = {
  TRIAL: {
    amount: 0,
    currency: 'UAH',
    unit: 'thirty-minutes',
    isFromPrice: false
  },
  EXAM_PREP: {
    amount: 700,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: true
  },
  MINI_GROUP: {
    amount: 500,
    currency: 'UAH',
    unit: 'learner',
    isFromPrice: true
  },
  INDIVIDUAL: {
    amount: 700,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: true
  },
  SPEAKING_CLUB: {
    amount: 350,
    currency: 'UAH',
    unit: 'meeting',
    isFromPrice: true
  }
} as const satisfies Record<PriceItemId, PriceConfig>

export const pricingFormats = [
  {
    id: 'individual',
    telegramFormat: 'individual',
    priceItemIds: ['INDIVIDUAL', 'EXAM_PREP'],
    pathFit: ['adult', 'exam']
  },
  {
    id: 'speaking-club',
    telegramFormat: 'speaking-club',
    priceItemIds: ['SPEAKING_CLUB'],
    pathFit: ['adult']
  },
  {
    id: 'mini-group',
    telegramFormat: 'mini-group',
    priceItemIds: ['MINI_GROUP'],
    pathFit: ['kids', 'adult']
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
