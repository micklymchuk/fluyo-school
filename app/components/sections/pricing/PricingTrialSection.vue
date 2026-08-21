<script setup lang="ts">
import { computed } from 'vue'
import PricingStartOfferCard from '~/components/pricing/PricingStartOfferCard.vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiFrameBox from '~/components/ui/UiFrameBox.vue'
import { resolveTelegramCta } from '~/composables/useTelegramCta'
import { usePricingPathContext } from '~/composables/usePricingPathContext'
import type { CtaContext, MessageIntent, PriceItemId } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { priceValue } = usePriceValue()
const { trackEvent } = useTracking()
const { pathContext, recommendedFormat } = usePricingPathContext()

/** The two ways to start: the free consultation and the paid trial lesson. */
const startOffers = [
  { id: 'consultation', priceItemId: 'TRIAL', ctaKey: 'telegramCta', messageIntent: 'book_consultation', highlighted: true },
  { id: 'trial-lesson', priceItemId: 'TRIAL_LESSON', ctaKey: 'trialLessonCta', messageIntent: 'book_trial', highlighted: false }
] as const satisfies readonly {
  id: string
  priceItemId: PriceItemId
  ctaKey: string
  messageIntent: MessageIntent
  highlighted: boolean
}[]

type StartOffer = (typeof startOffers)[number]

const telegramContextFor = (offer: StartOffer): CtaContext => ({
  path: pathContext.value,
  format: recommendedFormat.value,
  sourceRoute: 'pricing',
  locale: locale.value,
  messageIntent: offer.messageIntent
})

const offerCards = computed(() =>
  startOffers.map((offer) => ({
    offer,
    label: t(`priceItems.${offer.priceItemId}.label`),
    value: priceValue(offer.priceItemId),
    caption: t(`priceItems.${offer.priceItemId}.caption`),
    ctaLabel: t(`pricingSections.trial.${offer.ctaKey}`),
    ctaHref: resolveTelegramCta(telegramContextFor(offer), route.fullPath).url
  }))
)

function handleCtaClick(offer: StartOffer) {
  const telegramCta = resolveTelegramCta(telegramContextFor(offer), route.fullPath)

  trackEvent('telegram_context', telegramCta.contextEvent)
  trackEvent('telegram_click', telegramCta.clickEvent)
}
</script>

<template>
  <UiSection
    class="pricing-page__trial"
    variant="spacious"
    :eyebrow="t('pages.pricing.intro.eyebrow')"
    :title="t('pages.pricing.intro.heading')"
    :description="t('pages.pricing.intro.summary')"
  >
    <UiFrameBox class="start-card">
      <div class="start-card__grid">
        <PricingStartOfferCard
          v-for="card in offerCards"
          :id="card.offer.id"
          :key="card.offer.id"
          :label="card.label"
          :value="card.value"
          :included-label="t('pricingSections.trial.includedLabel')"
          :caption="card.caption"
          :cta-label="card.ctaLabel"
          :cta-href="card.ctaHref"
          :highlighted="card.offer.highlighted"
          @cta-click="handleCtaClick(card.offer)"
        />
      </div>
      <p class="start-card__path-note">{{ t(`pricingSections.trial.pathNotes.${pathContext}`) }}</p>
    </UiFrameBox>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.start-card__grid {
  @apply grid gap-component-gap sm:grid-cols-2 sm:items-stretch;
}

.start-card__path-note {
  @apply mt-component-gap border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}
</style>
