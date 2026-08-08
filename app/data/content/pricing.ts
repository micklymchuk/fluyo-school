import type {
  PriceConfig,
  PriceItem,
  PriceItemId,
  PricePackageTrack,
  PricingFormat,
  PricingIncludedItem
} from './types'

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
    id: 'PAIR'
  },
  {
    id: 'MINI_GROUP'
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
    amount: 675,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: false
  },
  MINI_GROUP: {
    amount: 350,
    currency: 'UAH',
    unit: 'seventy-five-minutes',
    isFromPrice: false
  },
  INDIVIDUAL: {
    amount: 575,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: false
  },
  PAIR: {
    amount: 400,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: false
  }
} as const satisfies Record<PriceItemId, PriceConfig>

export const pricingFormats = [
  {
    id: 'individual',
    telegramFormat: 'individual',
    priceItemIds: ['INDIVIDUAL', 'EXAM_PREP', 'PAIR'],
    pathFit: ['general', 'exam', 'professional', 'interview']
  },
  {
    id: 'mini-group',
    telegramFormat: 'mini-group',
    priceItemIds: ['MINI_GROUP'],
    pathFit: ['kids']
  }
] as const satisfies readonly PricingFormat[]

export const pricePackages = [
  {
    id: 'general',
    priceItemId: 'INDIVIDUAL',
    telegramFormat: 'individual',
    telegramPath: 'general',
    tiers: [
      { lessonCount: 4, totalAmount: 2300, perLessonAmount: 575, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 4400, perLessonAmount: 550, currency: 'UAH', isPopular: true },
      { lessonCount: 12, totalAmount: 6300, perLessonAmount: 525, currency: 'UAH', isPopular: false }
    ]
  },
  {
    id: 'exam-prep',
    priceItemId: 'EXAM_PREP',
    telegramFormat: 'individual',
    telegramPath: 'exam',
    tiers: [
      { lessonCount: 4, totalAmount: 2700, perLessonAmount: 675, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 5200, perLessonAmount: 650, currency: 'UAH', isPopular: true },
      { lessonCount: 12, totalAmount: 7500, perLessonAmount: 625, currency: 'UAH', isPopular: false }
    ]
  }
] as const satisfies readonly PricePackageTrack[]

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
