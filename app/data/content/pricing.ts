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
    id: 'TRIAL_LESSON'
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
  TRIAL_LESSON: {
    amount: 350,
    currency: 'UAH',
    unit: 'sixty-minutes',
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
    amount: 625,
    currency: 'UAH',
    unit: 'sixty-minutes',
    isFromPrice: false
  },
  PAIR: {
    amount: 450,
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
      { lessonCount: 4, totalAmount: 2400, perLessonAmount: 600, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 4600, perLessonAmount: 575, currency: 'UAH', isPopular: true },
      { lessonCount: 16, totalAmount: 8800, perLessonAmount: 550, currency: 'UAH', isPopular: false }
    ]
  },
  {
    id: 'exam-prep',
    priceItemId: 'EXAM_PREP',
    telegramFormat: 'individual',
    telegramPath: 'exam',
    tiers: [
      { lessonCount: 4, totalAmount: 2600, perLessonAmount: 650, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 5000, perLessonAmount: 625, currency: 'UAH', isPopular: true },
      { lessonCount: 16, totalAmount: 9600, perLessonAmount: 600, currency: 'UAH', isPopular: false }
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
