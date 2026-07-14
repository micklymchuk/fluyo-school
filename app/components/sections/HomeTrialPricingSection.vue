<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { priceItems, type CtaContext, type PriceItemId } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()
const observerTarget = ref<HTMLElement | null>(null)
const hasTrackedPricingSummary = ref(false)
let pricingSummaryObserver: IntersectionObserver | undefined
const formatSignalIndexes = [0, 1, 2] as const
const summaryPriceItemIds = ['trial', 'exam-group', 'kids-group', 'adult-individual'] as const satisfies readonly PriceItemId[]
const summaryPriceItems = priceItems.filter((item) => (summaryPriceItemIds as readonly PriceItemId[]).includes(item.id))

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'section',
  locale: locale.value,
  messageIntent: 'ask_price'
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
    messageIntent: 'ask_price'
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
  <UiSection
    id="trial-pricing-summary"
    :eyebrow="t('homeSections.trialPricing.eyebrow')"
    :title="t('homeSections.trialPricing.title')"
    :description="t('homeSections.trialPricing.description')"
  >
    <div ref="observerTarget" class="pricing-summary">
      <div class="pricing-summary__panel">
        <div class="pricing-summary__items">
          <article v-for="item in summaryPriceItems" :key="item.id" class="pricing-summary__item">
            <span class="pricing-summary__item-label">{{ t(`priceItems.${item.id}.label`) }}</span>
            <strong class="pricing-summary__item-value">{{ t(`priceItems.${item.id}.value`) }}</strong>
            <span class="pricing-summary__item-caption">{{ t(`priceItems.${item.id}.caption`) }}</span>
          </article>
        </div>
      </div>

      <div class="pricing-summary__formats" :aria-label="t('homeSections.trialPricing.formatSignalsAriaLabel')">
        <span v-for="signalIndex in formatSignalIndexes" :key="signalIndex" class="pricing-summary__format">
          {{ t(`homeSections.trialPricing.formatSignals[${signalIndex}]`) }}
        </span>
      </div>

      <div class="pricing-summary__actions">
        <UiButtonLink to="/pricing" variant="secondary" @click="trackPricingSummaryView">
          {{ t('homeSections.trialPricing.pricingCta') }}
        </UiButtonLink>
        <UiButtonLink
          :href="telegramTarget"
          external
          variant="primary"
          @click="handleTelegramClick"
        >
          {{ t('homeSections.trialPricing.telegramCta') }}
        </UiButtonLink>
      </div>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.pricing-summary {
  @apply grid gap-component-gap lg:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)] lg:items-start;
}

.pricing-summary__panel {
  @apply border border-border-hairline bg-surface p-card-padding;
}

.pricing-summary__items {
  @apply grid gap-control-compact md:grid-cols-2;
}

.pricing-summary__item {
  @apply flex flex-col gap-1 border-l-2 border-accent-subdued pl-control-compact;
}

.pricing-summary__item-label,
.pricing-summary__item-caption {
  @apply text-small text-text-muted;
}

.pricing-summary__item-value {
  @apply text-body font-semibold text-text;
}

.pricing-summary__formats {
  @apply flex flex-wrap gap-control-compact lg:flex-col;
}

.pricing-summary__format {
  @apply inline-flex min-h-11 items-center border border-border-hairline bg-surface px-4 text-small font-semibold text-text;
}

.pricing-summary__actions {
  @apply flex flex-wrap gap-control-compact lg:col-span-2;
}
</style>
