<script setup lang="ts">
import { computed } from 'vue'
import PricingFormatCard from '~/components/pricing/PricingFormatCard.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { resolveTelegramCta } from '~/composables/useTelegramCta'
import { usePricingPathContext } from '~/composables/usePricingPathContext'
import { priceItems, pricingFormats, type CtaContext, type PricingFormat } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()
const { activePathId, pathContext } = usePricingPathContext()

const telegramContextFor = (format: PricingFormat): CtaContext => ({
  path: pathContext.value,
  format: format.telegramFormat,
  sourceRoute: 'pricing',
  locale: locale.value,
  messageIntent: 'ask_price'
})

const formatCards = computed(() => {
  return pricingFormats.map((format) => ({
    format,
    title: t(`pricingSections.formats.items.${format.id}.title`),
    recommended: activePathId.value !== undefined && format.pathFit.includes(activePathId.value),
    prices: priceItems
      .filter((priceItem) => format.priceItemIds.includes(priceItem.id))
      .map((priceItem) => ({
        id: priceItem.id,
        label: t(`priceItems.${priceItem.id}.label`),
        value: t(`priceItems.${priceItem.id}.value`),
        caption: t(`priceItems.${priceItem.id}.caption`)
      })),
    fit: t(`pricingSections.formats.items.${format.id}.fit`),
    terms: t(`pricingSections.formats.items.${format.id}.terms`),
    ctaLabel: t(`pricingSections.formats.items.${format.id}.telegramCta`),
    ctaHref: resolveTelegramCta(telegramContextFor(format), route.fullPath).url
  }))
})

function handleCtaClick(format: PricingFormat) {
  const telegramCta = resolveTelegramCta(telegramContextFor(format), route.fullPath)

  trackEvent('telegram_context', telegramCta.contextEvent)
  trackEvent('telegram_click', telegramCta.clickEvent)
}
</script>

<template>
  <UiSection
    class="pricing-page__formats"
    :eyebrow="t('pricingSections.formats.eyebrow')"
    :title="t('pricingSections.formats.title')"
    :description="t('pricingSections.formats.description')"
  >
    <div class="format-grid">
      <PricingFormatCard
        v-for="card in formatCards"
        :id="card.format.id"
        :key="card.format.id"
        :title="card.title"
        :recommended="card.recommended"
        :recommended-label="t('pricingSections.formats.recommendedLabel')"
        :prices="card.prices"
        :fit-label="t('pricingSections.formats.fitLabel')"
        :fit="card.fit"
        :terms-label="t('pricingSections.formats.termsLabel')"
        :terms="card.terms"
        :cta-label="card.ctaLabel"
        :cta-href="card.ctaHref"
        @cta-click="handleCtaClick(card.format)"
      />
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.format-grid {
  @apply grid gap-component-gap lg:grid-cols-3 lg:items-start;
}
</style>
