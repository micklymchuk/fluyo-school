import type {
  PriceAudienceId,
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
  },
  {
    id: 'KIDS_THIRTY'
  },
  {
    id: 'KIDS_FORTY_FIVE'
  },
  {
    id: 'KIDS_SIXTY'
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
  },
  KIDS_THIRTY: {
    amount: 315,
    currency: 'UAH',
    unit: 'thirty-minutes',
    isFromPrice: false
  },
  KIDS_FORTY_FIVE: {
    amount: 470,
    currency: 'UAH',
    unit: 'forty-five-minutes',
    isFromPrice: false
  },
  KIDS_SIXTY: {
    amount: 625,
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

/**
 * Children's rates: the age group sets the lesson length, and the lesson length sets
 * the rate — 30 min for 5-6, 45 min for 7-9, 60 min from 10 years up.
 */
export const kidsPricePackages = [
  {
    id: 'kids-five-six',
    priceItemId: 'KIDS_THIRTY',
    telegramFormat: 'individual',
    telegramPath: 'kids',
    tiers: [
      { lessonCount: 4, totalAmount: 1200, perLessonAmount: 300, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 2280, perLessonAmount: 285, currency: 'UAH', isPopular: true },
      { lessonCount: 16, totalAmount: 4400, perLessonAmount: 275, currency: 'UAH', isPopular: false }
    ]
  },
  {
    id: 'kids-seven-nine',
    priceItemId: 'KIDS_FORTY_FIVE',
    telegramFormat: 'individual',
    telegramPath: 'kids',
    tiers: [
      { lessonCount: 4, totalAmount: 1800, perLessonAmount: 450, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 3440, perLessonAmount: 430, currency: 'UAH', isPopular: true },
      { lessonCount: 16, totalAmount: 6640, perLessonAmount: 415, currency: 'UAH', isPopular: false }
    ]
  },
  {
    id: 'kids-ten-plus',
    priceItemId: 'KIDS_SIXTY',
    telegramFormat: 'individual',
    telegramPath: 'kids',
    tiers: [
      { lessonCount: 4, totalAmount: 2400, perLessonAmount: 600, currency: 'UAH', isPopular: false },
      { lessonCount: 8, totalAmount: 4600, perLessonAmount: 575, currency: 'UAH', isPopular: true },
      { lessonCount: 16, totalAmount: 8800, perLessonAmount: 550, currency: 'UAH', isPopular: false }
    ]
  }
] as const satisfies readonly PricePackageTrack[]

export const pricePackagesByAudience = {
  adults: pricePackages,
  kids: kidsPricePackages
} as const satisfies Record<PriceAudienceId, readonly PricePackageTrack[]>

export const priceAudienceIds = ['adults', 'kids'] as const satisfies readonly PriceAudienceId[]

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
