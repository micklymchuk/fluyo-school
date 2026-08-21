<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PriceSimpleCard from '~/components/home/PriceSimpleCard.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiDiscountBadge from '~/components/ui/UiDiscountBadge.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiPencilMark from '~/components/ui/UiPencilMark.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import UiTabSwitch from '~/components/ui/UiTabSwitch.vue'
import UiWatermarkField from '~/components/ui/UiWatermarkField.vue'
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
    <UiWatermarkField seed="home-trial-pricing" :count="4" />
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
        <UiReveal
          v-for="(item, index) in startItems"
          :key="item.id"
          class="trial-pricing__start-cell"
          :delay="index * 70"
        >
          <PriceSimpleCard
            :label="t(`priceItems.${item.id}.label`)"
            :value="priceValue(item.id)"
            :caption="t(`priceItems.${item.id}.caption`)"
            :recommended="item.recommended"
            :recommended-label="item.recommended ? t('homeSections.trialPricing.recommendedBadge') : undefined"
          />
          <!-- Emphasis rays flick out past the trial-lesson card's corner once it
               has faded in. -->
          <UiPencilMark
            v-if="item.id === 'TRIAL_LESSON'"
            class="trial-pricing__spark"
            mark="burst"
            :delay="420"
          />
        </UiReveal>
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
        <UiReveal v-for="(track, index) in tracks" :key="track.id" :delay="index * 70">
          <UiCard class="track-card">
            <h3 class="track-card__title">{{ track.title }}</h3>
            <p class="track-card__value">{{ track.perLesson }}</p>
            <p v-if="track.lessonCount > 1" class="track-card__total">
              {{ track.total }} {{ t('pricingSections.packages.totalLabel') }}
            </p>
            <p class="track-card__desc">{{ track.description }}</p>
          </UiCard>
        </UiReveal>
        <!-- Single formats continue the package tracks' stagger, one grid, one wave. -->
        <UiReveal
          v-for="(item, index) in singleFormatItems"
          :key="item"
          :delay="(tracks.length + index) * 70"
        >
          <PriceSimpleCard
            :label="t(`priceItems.${item}.label`)"
            :value="priceValue(item)"
            :caption="t(`priceItems.${item}.caption`)"
          />
        </UiReveal>
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

/* Anchors the pencil mark to the card, without touching the grid's own maths. */
.trial-pricing__start-cell {
  @apply relative;
}

/* Sits just off the card's top-right corner, outside the card, in the gap the
   grid already leaves. Both axes explicit: an <svg> is a replaced element and
   would otherwise derive one from its viewBox ratio. */
.trial-pricing__spark {
  top: -0.96rem;
  right: -1rem;
  width: 3.60rem;
  height: 3.31rem;
}

.trial-pricing__grid {
  @apply grid w-full gap-component-gap text-left sm:grid-cols-2 lg:grid-cols-4;
}

/* h-full: the reveal wrapper is the grid item now, so the card fills the row. */
.track-card {
  @apply flex h-full flex-col gap-control-compact;
}

.track-card__title {
  @apply font-display text-small font-bold uppercase tracking-display text-text;
}

.track-card__value {
  @apply font-display text-card-title font-bold text-accent-burgundy;
}

/* Package total sits in a soft burgundy chip so it reads clearly under the per-lesson price. */
.track-card__total {
  @apply w-fit rounded-pill bg-accent-subdued px-2.5 py-1 text-small font-semibold text-accent-burgundy-strong;
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
