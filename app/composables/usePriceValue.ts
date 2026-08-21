import { PRICES_CONFIG, type PriceCurrency, type PriceItemId, type PricePackageTier, type PriceUnit } from '~/data/content'

export const usePriceValue = () => {
  const { t } = useI18n()

  const amountLabel = (amount: number, currency: PriceCurrency): string =>
    t('priceFormat.exact', {
      amount,
      currency: t(`priceFormat.currencies.${currency}`)
    })

  const priceValue = (id: PriceItemId): string => {
    const config = PRICES_CONFIG[id]
    const unit = t(`priceFormat.units.${config.unit}`)

    if (config.amount === 0) {
      return t('priceFormat.value', { price: t('priceFormat.free'), unit })
    }

    const currency = t(`priceFormat.currencies.${config.currency}`)
    const price = t(config.isFromPrice ? 'priceFormat.from' : 'priceFormat.exact', {
      amount: config.amount,
      currency
    })

    return t('priceFormat.value', { price, unit })
  }

  const packageTotal = (tier: PricePackageTier): string => amountLabel(tier.totalAmount, tier.currency)

  /** `unit` names what one lesson is — pass the track's lesson length to price by duration. */
  const packagePerLesson = (tier: PricePackageTier, unit: PriceUnit = 'lesson'): string =>
    t('priceFormat.value', {
      price: amountLabel(tier.perLessonAmount, tier.currency),
      unit: t(`priceFormat.units.${unit}`)
    })

  return { priceValue, packageTotal, packagePerLesson }
}
