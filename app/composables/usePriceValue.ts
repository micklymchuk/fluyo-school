import { PRICES_CONFIG, type PriceItemId } from '~/data/content'

export const usePriceValue = () => {
  const { t } = useI18n()

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

  return { priceValue }
}
