<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PriceSimpleCard from '~/components/home/PriceSimpleCard.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'
import { priceItems, type CtaContext, type PriceItemId } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { priceValue } = usePriceValue()
const { trackEvent } = useTracking()
const observerTarget = ref<HTMLElement | null>(null)
const hasTrackedPricingSummary = ref(false)
let pricingSummaryObserver: IntersectionObserver | undefined
const summaryPriceItemIds = ['TRIAL', 'EXAM_PREP', 'INDIVIDUAL', 'MINI_GROUP'] as const satisfies readonly PriceItemId[]
const recommendedPriceItemId: PriceItemId = 'TRIAL'
const summaryPriceItems = priceItems.filter((item) => (summaryPriceItemIds as readonly PriceItemId[]).includes(item.id))

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'section',
  locale: locale.value,
  messageIntent: 'book_trial'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)

function trackPricingSummaryView() {
  if (hasTrackedPricingSummary.value) {
    return
  }

  hasTrackedPricingSummary.value = true
  trackEvent('pricing_summary_view', {
    route: route.fullPath,
    locale: locale.value,
    sourceRoute: 'home',
    messageIntent: 'book_trial'
  })
}

function handleTelegramClick() {
  trackPricingSummaryView()
  trackTelegramClick()
}

onMounted(() => {
  if (!observerTarget.value || typeof IntersectionObserver === 'undefined') {
    trackPricingSummaryView()
    return
  }

  pricingSummaryObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      trackPricingSummaryView()
      pricingSummaryObserver?.disconnect()
    }
  }, { threshold: 0.35 })

  pricingSummaryObserver.observe(observerTarget.value)
})

onBeforeUnmount(() => {
  pricingSummaryObserver?.disconnect()
})
</script>

<template>
  <section id="trial-pricing-summary" class="trial-pricing" aria-labelledby="home-trial-pricing-title">
    <UiWatermark />
    <div ref="observerTarget" class="trial-pricing__container">
      <h2 id="home-trial-pricing-title" class="trial-pricing__title">{{ t('homeSections.trialPricing.title') }}</h2>
      <p class="trial-pricing__line">{{ t('homeSections.trialPricing.description') }}</p>

      <div class="trial-pricing__grid">
        <PriceSimpleCard
          v-for="item in summaryPriceItems"
          :key="item.id"
          :label="t(`priceItems.${item.id}.label`)"
          :value="priceValue(item.id)"
          :caption="t(`priceItems.${item.id}.caption`)"
          :recommended="item.id === recommendedPriceItemId"
          :recommended-label="t('homeSections.trialPricing.recommendedBadge')"
        />
      </div>

      <div class="trial-pricing__actions">
        <UiButtonLink
          :href="telegramTarget"
          external
          variant="primary"
          @click="handleTelegramClick"
        >
          {{ t('homeSections.trialPricing.telegramCta') }}
        </UiButtonLink>
        <UiButtonLink to="/pricing" variant="secondary" @click="trackPricingSummaryView">
          {{ t('homeSections.trialPricing.pricingCta') }}
        </UiButtonLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.trial-pricing {
  @apply relative bg-page py-section text-text;
}

.trial-pricing__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col items-center gap-component-gap px-page-gutter text-center;
}

/* Poster-scale heading echoing the speaking club section typography.
   Caps-only: the script face is Latin-only, so translated titles stay in the display font. */
.trial-pricing__title {
  @apply text-center font-display font-bold uppercase tracking-display text-accent-burgundy;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
}

.trial-pricing__line {
  @apply max-w-2xl text-body text-text-muted;
}

/* pt: breathing room for the recommended badge overhanging the first card. */
.trial-pricing__grid {
  @apply grid w-full gap-component-gap pt-3 text-left sm:grid-cols-2 lg:grid-cols-4;
}

.trial-pricing__actions {
  @apply flex flex-wrap items-center justify-center gap-control-compact;
}
</style>
