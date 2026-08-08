import {
  PRICES_CONFIG,
  pricePackages,
  type PriceCurrency,
  type PriceItemId,
  type PricePackageTrackId,
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
  telegramFormat: TelegramFormatContext
  telegramPath: TelegramPathContext
  /** The single lesson (count 1, from PRICES_CONFIG) followed by the package tiers. */
  options: PricePackageOption[]
}

/**
 * Combines each package track's single-lesson rate (synthesized as a 1-lesson option
 * from PRICES_CONFIG) with its multi-lesson tiers, so the home switcher can offer
 * 1 / 4 / 8 / 12 in one list. Pure content — no reactivity needed.
 */
export const usePricePackageOptions = () => {
  const trackOptions: PricePackageTrackOptions[] = pricePackages.map((track) => {
    const single = PRICES_CONFIG[track.priceItemId]

    return {
      id: track.id,
      priceItemId: track.priceItemId,
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
