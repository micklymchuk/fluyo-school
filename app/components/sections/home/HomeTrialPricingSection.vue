<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PriceSimpleCard from '~/components/home/PriceSimpleCard.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiDiscountBadge from '~/components/ui/UiDiscountBadge.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiPencilMark from '~/components/ui/UiPencilMark.vue'
import UiPriceSwap from '~/components/ui/UiPriceSwap.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import UiTabSwitch from '~/components/ui/UiTabSwitch.vue'
import UiWatermarkField from '~/components/ui/UiWatermarkField.vue'
import { usePricePackageOptions } from '~/composables/usePricePackageOptions'
import { priceAudienceIds, type CtaContext, type PriceAudienceId, type PriceItemId } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { priceValue, packageTotal, packagePerLesson } = usePriceValue()
const { trackEvent } = useTracking()
/** Both rate cards are resolved once — the switch only picks which one is on screen. */
const packagesByAudience: Record<PriceAudienceId, ReturnType<typeof usePricePackageOptions>> = {
  adults: usePricePackageOptions('adults'),
  kids: usePricePackageOptions('kids')
}

const observerTarget = ref<HTMLElement | null>(null)
const hasTrackedPricingSummary = ref(false)
let pricingSummaryObserver: IntersectionObserver | undefined

const selectedAudience = ref<PriceAudienceId>('adults')
/** Cards enter with a scroll-reveal stagger once; after a swap the swap animation carries them. */
const hasSwappedAudience = ref(false)

const activePackages = computed(() => packagesByAudience[selectedAudience.value])

const selectedLessonCount = ref(
  packagesByAudience.adults.popularLessonCount ?? packagesByAudience.adults.lessonCounts[0] ?? 1
)
/** Prices travel with the switcher: a bigger package sends them up, a smaller one down. */
const priceDirection = ref<'up' | 'down'>('up')
/**
 * The total chip stays mounted so its slot can animate its height, so it needs a value
 * even while collapsed: it holds the last real package total instead of flashing a
 * one-lesson "total" on the way out.
 */
const chipLessonCount = ref(
  selectedLessonCount.value > 1
    ? selectedLessonCount.value
    : packagesByAudience.adults.lessonCounts.find((count) => count > 1) ?? selectedLessonCount.value
)

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

const audienceOptions = computed(() =>
  priceAudienceIds.map((audience) => ({
    value: audience,
    label: t(`homeSections.trialPricing.audiences.${audience}.label`),
    shortLabel: t(`homeSections.trialPricing.audiences.${audience}.shortLabel`)
  }))
)

const switcherOptions = computed(() =>
  activePackages.value.lessonCounts.map((count) => ({
    value: count,
    label: t(`pricingSections.packages.lessonLabels.${count}`),
    shortLabel: String(count),
    badge: count === activePackages.value.popularLessonCount
  }))
)

const tracks = computed(() =>
  activePackages.value.trackOptions.map((track) => {
    const option = track.options.find((item) => item.lessonCount === selectedLessonCount.value) ?? track.options[0]!
    const chipOption = track.options.find((item) => item.lessonCount === chipLessonCount.value) ?? option

    return {
      id: track.id,
      title: t(`pricingSections.packages.tracks.${track.id}.title`),
      description: t(`priceItems.${track.priceItemId}.caption`),
      perLesson: packagePerLesson(option, track.unit),
      totalLine: `${packageTotal(chipOption)} ${t('pricingSections.packages.totalLabel')}`,
      /** The single lesson has no package total, so its chip closes away. */
      hasTotal: option.lessonCount > 1
    }
  })
)

/** Desktop columns follow the card count, so a shorter rate card still centres
    under the switcher instead of leaving an empty column. */
const gridCardCount = computed(() =>
  tracks.value.length + (selectedAudience.value === 'adults' ? singleFormatItems.length : 0)
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

function revealDelay(index: number) {
  return hasSwappedAudience.value ? 0 : index * 70
}

function onAudienceChange(value: string | number) {
  const audience = priceAudienceIds.find((id) => id === value)

  if (!audience || audience === selectedAudience.value) {
    return
  }

  selectedAudience.value = audience
  hasSwappedAudience.value = true

  // Lesson counts match across audiences today; fall back if a rate card ever drops one.
  if (!activePackages.value.lessonCounts.includes(selectedLessonCount.value)) {
    selectedLessonCount.value =
      activePackages.value.popularLessonCount ?? activePackages.value.lessonCounts[0] ?? 1
  }

  trackPricingSummaryView()
  trackEvent('pricing_switcher_change', {
    route: route.fullPath,
    locale: locale.value,
    sourceRoute: 'home',
    path: audience === 'kids' ? 'kids' : 'general'
  })
}

function onLessonCountChange(value: string | number) {
  const count = Number(value)

  if (count === selectedLessonCount.value) {
    return
  }

  priceDirection.value = count > selectedLessonCount.value ? 'up' : 'down'
  selectedLessonCount.value = count

  if (count > 1) {
    chipLessonCount.value = count
  }
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
        <p id="home-audience-label" class="trial-pricing__switcher-heading">
          {{ t('homeSections.trialPricing.audienceHeading') }}
        </p>
        <UiTabSwitch
          :model-value="selectedAudience"
          :options="audienceOptions"
          :aria-label="t('homeSections.trialPricing.audienceAria')"
          @update:model-value="onAudienceChange"
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

      <!-- Swapping the audience drops the old rate card downwards, then the new one
           arrives from above: out-in, so the two never overlap. -->
      <div class="trial-pricing__swap">
        <Transition name="audience-swap" mode="out-in">
          <div
            :key="selectedAudience"
            class="trial-pricing__grid"
            :class="`trial-pricing__grid--${gridCardCount}`"
          >
            <UiReveal v-for="(track, index) in tracks" :key="track.id" :delay="revealDelay(index)">
              <UiCard class="track-card">
                <h3 class="track-card__title">{{ track.title }}</h3>
                <UiPriceSwap
                  as="p"
                  class="track-card__value"
                  :value="track.perLesson"
                  :direction="priceDirection"
                />
                <!-- The chip stays in the DOM so the slot can animate its height against
                     real content; `inert` plus the hidden visibility below keep the
                     collapsed total out of the a11y tree. -->
                <div
                  class="track-card__total-slot"
                  :class="{ 'track-card__total-slot--collapsed': !track.hasTotal }"
                  :inert="!track.hasTotal"
                >
                  <div class="track-card__total-viewport">
                    <UiPriceSwap
                      as="p"
                      class="track-card__total"
                      :value="track.totalLine"
                      :direction="priceDirection"
                    />
                  </div>
                </div>
                <p class="track-card__desc">{{ track.description }}</p>
              </UiCard>
            </UiReveal>
            <!-- Pair and mini-group are adult formats; the children's card is priced by age.
                 Single formats continue the package tracks' stagger, one grid, one wave. -->
            <template v-if="selectedAudience === 'adults'">
              <UiReveal
                v-for="(item, index) in singleFormatItems"
                :key="item"
                :delay="revealDelay(tracks.length + index)"
              >
                <PriceSimpleCard
                  :label="t(`priceItems.${item}.label`)"
                  :value="priceValue(item)"
                  :caption="t(`priceItems.${item}.caption`)"
                />
              </UiReveal>
            </template>
          </div>
        </Transition>
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

.trial-pricing__swap {
  @apply w-full;
}

.trial-pricing__grid {
  @apply grid w-full gap-component-gap text-left sm:grid-cols-2;
}

.trial-pricing__grid--3 {
  @apply lg:grid-cols-3;
}

/* Two columns can't split three cards evenly, so the trailing card takes the row
   instead of leaving a gap beside it. */
.trial-pricing__grid--3 > *:last-child {
  @apply sm:col-span-2 lg:col-span-1;
}

.trial-pricing__grid--4 {
  @apply lg:grid-cols-4;
}

/* Audience swap: the outgoing rate card sinks and fades, the incoming one drops in
   from above. `mode="out-in"` keeps the two moves sequential. */
.audience-swap-enter-active,
.audience-swap-leave-active {
  transition-property: opacity, transform;
  transition-timing-function: var(--ease-standard);
}

.audience-swap-enter-active {
  transition-duration: var(--transition-duration-medium);
}

.audience-swap-leave-active {
  transition-duration: var(--transition-duration-short);
}

.audience-swap-enter-from {
  opacity: 0;
  transform: translate3d(0, calc(var(--reveal-distance) * -1), 0);
}

.audience-swap-leave-to {
  opacity: 0;
  transform: translate3d(0, var(--reveal-distance), 0);
}

@media (prefers-reduced-motion: reduce) {
  .audience-swap-enter-active,
  .audience-swap-leave-active {
    transition: none;
  }

  .audience-swap-enter-from,
  .audience-swap-leave-to {
    opacity: 1;
    transform: none;
  }
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

/* Package total sits in a soft burgundy chip so it reads clearly under the per-lesson price.
   It fades and lifts behind the closing edge of its slot, so the total doesn't sit at full
   strength while its room disappears. */
.track-card__total {
  @apply w-fit rounded-pill bg-accent-subdued px-2.5 py-1 text-small font-semibold text-accent-burgundy-strong;

  transition-property: opacity, transform;
  transition-duration: var(--transition-duration-medium);
  transition-timing-function: var(--ease-standard);
}

.track-card__desc {
  @apply grow text-small text-text-muted;
}

/* From 4 lessons up the card carries a package total; below that the slot closes.
   Same mechanism as UiAccordion: one grid row animated from 1fr to 0fr, so the height
   is interpolated against the real chip instead of a measured max-height. The chip is
   never unmounted — an `fr` row measures its content, so removing it would snap the
   card's height in one frame. */
.track-card__total-slot {
  @apply grid overflow-hidden;

  grid-template-rows: 1fr;
  transition-property: grid-template-rows, margin-top, visibility;
  transition-duration: var(--transition-duration-medium);
  transition-timing-function: var(--ease-standard);
}

/* The viewport is the grid item: min-height:0 plus its own clipping let the row reach
   a true zero. The negative margin swallows the card's flex gap, so a closed slot
   takes up nothing at all. */
.track-card__total-viewport {
  @apply min-h-0 overflow-hidden;
}

.track-card__total-slot--collapsed {
  grid-template-rows: 0fr;
  margin-top: calc(var(--spacing-control-compact) * -1);
  visibility: hidden;
}

.track-card__total-slot--collapsed .track-card__total {
  opacity: 0;
  transform: scale(0.94) translate3d(0, -0.25rem, 0);
}

@media (prefers-reduced-motion: reduce) {
  .track-card__total-slot,
  .track-card__total {
    transition: none;
  }

  .track-card__total-slot--collapsed .track-card__total {
    opacity: 1;
    transform: none;
  }
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
