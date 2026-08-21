<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PriceSimpleCard from '~/components/home/PriceSimpleCard.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiDiscountBadge from '~/components/ui/UiDiscountBadge.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiTabSwitch from '~/components/ui/UiTabSwitch.vue'
import { usePricePackageOptions } from '~/composables/usePricePackageOptions'
import type { CtaContext, PriceItemId } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { priceValue, packageTotal, packagePerLesson } = usePriceValue()
const { trackEvent } = useTracking()
const { trackOptions, lessonCounts, popularLessonCount } = usePricePackageOptions()

const observerTarget = ref<HTMLElement | null>(null)
const hasTrackedPricingSummary = ref(false)
let pricingSummaryObserver: IntersectionObserver | undefined

const selectedLessonCount = ref(popularLessonCount ?? lessonCounts[0] ?? 1)

/** The two ways to start: the free consultation and the paid trial lesson. */
const startItems = [
  { id: 'TRIAL', recommended: true },
  { id: 'TRIAL_LESSON', recommended: false }
] as const satisfies readonly { id: PriceItemId, recommended: boolean }[]

const singleFormatItems = ['PAIR', 'MINI_GROUP'] as const satisfies readonly PriceItemId[]

const discountBadgeIds = [] as const; // 'first-package', 'military-family'] as const
const discountBadges = computed(() =>
  discountBadgeIds.map((id) => ({
    id,
    value: t(`homeSections.trialPricing.discounts.items.${id}.value`),
    label: t(`homeSections.trialPricing.discounts.items.${id}.label`)
  }))
)

const switcherOptions = computed(() =>
  lessonCounts.map((count) => ({
    value: count,
    label: t(`pricingSections.packages.lessonLabels.${count}`),
    shortLabel: String(count),
    badge: count === popularLessonCount
  }))
)

const tracks = computed(() =>
  trackOptions.map((track) => {
    const option = track.options.find((item) => item.lessonCount === selectedLessonCount.value) ?? track.options[0]!

    return {
      id: track.id,
      title: t(`pricingSections.packages.tracks.${track.id}.title`),
      description: t(`priceItems.${track.priceItemId}.caption`),
      perLesson: packagePerLesson(option),
      total: packageTotal(option),
      lessonCount: option.lessonCount
    }
  })
)

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'section',
  locale: locale.value,
  messageIntent: 'book_consultation'
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
    messageIntent: 'book_consultation'
  })
}

function onLessonCountChange(value: string | number) {
  const count = Number(value)

  if (count === selectedLessonCount.value) {
    return
  }

  selectedLessonCount.value = count
  trackPricingSummaryView()
  trackEvent('pricing_switcher_change', {
    route: route.fullPath,
    locale: locale.value,
    sourceRoute: 'home'
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
    <div ref="observerTarget" class="trial-pricing__container">
      <UiLockupHeading
        id="home-trial-pricing-title"
        level="h2"
        align="center"
        size="display"
        :caps="t('homeSections.trialPricing.title')"
      />
      <p class="trial-pricing__line">{{ t('homeSections.trialPricing.description') }}</p>

      <div class="trial-pricing__start-grid">
        <PriceSimpleCard
          v-for="item in startItems"
          :key="item.id"
          :label="t(`priceItems.${item.id}.label`)"
          :value="priceValue(item.id)"
          :caption="t(`priceItems.${item.id}.caption`)"
          :recommended="item.recommended"
          :recommended-label="item.recommended ? t('homeSections.trialPricing.recommendedBadge') : undefined"
        />
      </div>

      <div class="trial-pricing__switcher-block">
        <p id="home-switcher-label" class="trial-pricing__switcher-heading">
          {{ t('homeSections.trialPricing.switcherHeading') }}
        </p>
        <div class="trial-pricing__switcher-row">
          <div v-if="discountBadges[0]" class="trial-pricing__badge trial-pricing__badge--left">
            <UiDiscountBadge :value="discountBadges[0].value" :label="discountBadges[0].label" />
          </div>
          <UiTabSwitch
            :model-value="selectedLessonCount"
            :options="switcherOptions"
            :aria-label="t('homeSections.trialPricing.switcherAria')"
            :badge-label="t('pricingSections.packages.popularLabel')"
            @update:model-value="onLessonCountChange"
          />
          <div v-if="discountBadges[1]" class="trial-pricing__badge trial-pricing__badge--right">
            <UiDiscountBadge :value="discountBadges[1].value" :label="discountBadges[1].label" />
          </div>
        </div>
      </div>

      <div class="trial-pricing__grid">
        <UiCard v-for="track in tracks" :key="track.id" class="track-card">
          <h3 class="track-card__title">{{ track.title }}</h3>
          <p class="track-card__value">{{ track.perLesson }}</p>
          <p v-if="track.lessonCount > 1" class="track-card__total">
            {{ track.total }} {{ t('pricingSections.packages.totalLabel') }}
          </p>
          <p class="track-card__desc">{{ track.description }}</p>
        </UiCard>
        <PriceSimpleCard
          v-for="item in singleFormatItems"
          :key="item"
          :label="t(`priceItems.${item}.label`)"
          :value="priceValue(item)"
          :caption="t(`priceItems.${item}.caption`)"
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

.trial-pricing__line {
  @apply max-w-2xl text-body text-text-muted;
}

.trial-pricing__switcher-block {
  @apply flex w-full flex-col items-center gap-control-compact;
}

.trial-pricing__switcher-heading {
  @apply text-eyebrow font-bold uppercase tracking-display text-text;
}

/* pt-3: breathing room for the recommended badge overhanging the consultation card. */
.trial-pricing__start-grid {
  @apply grid w-full max-w-3xl gap-component-gap pt-3 text-left sm:grid-cols-2;
}

.trial-pricing__grid {
  @apply grid w-full gap-component-gap text-left sm:grid-cols-2 lg:grid-cols-4;
}

.track-card {
  @apply flex flex-col gap-control-compact;
}

.track-card__title {
  @apply font-display text-small font-bold uppercase tracking-display text-text;
}

.track-card__value {
  @apply font-display text-card-title font-bold text-accent-burgundy;
}

.track-card__total {
  @apply text-small text-text-muted;
}

.track-card__desc {
  @apply grow text-small text-text-muted;
}

/* The switcher row is the anchor: discount seals sit just outside its left/right edges,
   vertically centred on the pills, on every screen size. */
.trial-pricing__switcher-row {
  @apply relative inline-flex;
}

.trial-pricing__badge {
  @apply pointer-events-none absolute top-1/2 z-10 -translate-y-1/2;
}

.trial-pricing__badge--left {
  @apply right-full top-3 mr-2 -rotate-6;
}

.trial-pricing__badge--right {
  @apply left-full ml-2 rotate-6;
}

.trial-pricing__actions {
  @apply flex flex-wrap items-center justify-center gap-control-compact;
}
</style>
