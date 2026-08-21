import {
  PRICES_CONFIG,
  pricePackagesByAudience,
  type PriceAudienceId,
  type PriceCurrency,
  type PriceItemId,
  type PricePackageTrackId,
  type PriceUnit,
  type TelegramFormatContext,
  type TelegramPathContext
} from '~/data/content'

export type PricePackageOption = {
  lessonCount: number
  perLessonAmount: number
  totalAmount: number
  currency: PriceCurrency
  isPopular: boolean
}

export type PricePackageTrackOptions = {
  id: PricePackageTrackId
  priceItemId: PriceItemId
  /** Lesson length of this track, so a card can show "30 хв" next to the age group. */
  unit: PriceUnit
  telegramFormat: TelegramFormatContext
  telegramPath: TelegramPathContext
  /** The single lesson (count 1, from PRICES_CONFIG) followed by the package tiers. */
  options: PricePackageOption[]
}

/**
 * Combines each package track's single-lesson rate (synthesized as a 1-lesson option
 * from PRICES_CONFIG) with its multi-lesson tiers, so the home switcher can offer
 * 1 / 4 / 8 / 16 in one list. `audience` picks the adult or children's rate card.
 * Pure content — no reactivity needed.
 */
export const usePricePackageOptions = (audience: PriceAudienceId = 'adults') => {
  const trackOptions: PricePackageTrackOptions[] = pricePackagesByAudience[audience].map((track) => {
    const single = PRICES_CONFIG[track.priceItemId]

    return {
      id: track.id,
      priceItemId: track.priceItemId,
      unit: single.unit,
      telegramFormat: track.telegramFormat,
      telegramPath: track.telegramPath,
      options: [
        {
          lessonCount: 1,
          perLessonAmount: single.amount,
          totalAmount: single.amount,
          currency: single.currency,
          isPopular: false
        },
        ...track.tiers.map((tier) => ({
          lessonCount: tier.lessonCount,
          perLessonAmount: tier.perLessonAmount,
          totalAmount: tier.totalAmount,
          currency: tier.currency,
          isPopular: tier.isPopular
        }))
      ]
    }
  })

  const lessonCounts = trackOptions[0]?.options.map((option) => option.lessonCount) ?? []
  const popularLessonCount = trackOptions[0]?.options.find((option) => option.isPopular)?.lessonCount

  return { trackOptions, lessonCounts, popularLessonCount }
}
