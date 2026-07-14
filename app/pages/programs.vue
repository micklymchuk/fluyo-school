<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import { resolveTelegramCta } from '~/composables/useTelegramCta'
import {
  learningPaths,
  priceItems,
  type CtaContext,
  type LearningPath,
  type LearningPathId,
  type TrackingTrigger
} from '~/data/content'

useSeo('/programs')

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()
const trackedObservedPaths = new Set<LearningPathId>()
let pathObserver: IntersectionObserver | undefined

const genericTelegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'programs',
  locale: locale.value,
  messageIntent: 'ask_program'
}))
const { url: genericTelegramTarget, trackTelegramClick } = useTelegramCta(genericTelegramContext)

function findPath(pathId: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === pathId)
}

function getPathPriceHints(path: LearningPath) {
  return priceItems.filter((priceItem) => path.priceHintIds.includes(priceItem.id))
}

function getPathTelegramContext(path: LearningPath): CtaContext {
  return {
    path: path.id,
    format: path.telegramFormat,
    sourceRoute: 'programs',
    locale: locale.value,
    messageIntent: path.ctaIntent.messageIntent
  }
}

function getPathTelegramTarget(path: LearningPath) {
  return resolveTelegramCta(getPathTelegramContext(path), route.fullPath).url
}

function trackProgramPathView(path: LearningPath, trigger: TrackingTrigger) {
  trackEvent('program_path_view', {
    route: route.fullPath,
    locale: locale.value,
    path: path.id,
    sourceRoute: 'programs',
    trigger
  })
}

function trackObservedPath(path: LearningPath) {
  if (trackedObservedPaths.has(path.id)) {
    return
  }

  trackedObservedPaths.add(path.id)
  trackProgramPathView(path, 'observe')
}

function handlePricingClick(path: LearningPath) {
  trackProgramPathView(path, 'activate')
}

function handlePathTelegramClick(path: LearningPath) {
  const telegramCta = resolveTelegramCta(getPathTelegramContext(path), route.fullPath)

  trackProgramPathView(path, 'activate')
  trackEvent('telegram_context', telegramCta.contextEvent)
  trackEvent('telegram_click', telegramCta.clickEvent)
}

onMounted(() => {
  const pathSections = Array.from(document.querySelectorAll<HTMLElement>('[data-program-path]'))

  if (!pathSections.length) {
    return
  }

  if (typeof IntersectionObserver === 'undefined') {
    return
  }

  pathObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue
      }

      const rootHeight = entry.rootBounds?.height ?? 0
      const visibleEnough = entry.intersectionRatio >= 0.25
        || (rootHeight > 0 && entry.intersectionRect.height >= rootHeight * 0.5)

      if (!visibleEnough) {
        continue
      }

      const element = entry.target as HTMLElement
      const path = findPath(element.dataset.programPath ?? '')

      if (path) {
        trackObservedPath(path)
      }
    }
  }, { rootMargin: '0px 0px -35% 0px', threshold: [0.05, 0.1, 0.15, 0.2, 0.25] })

  for (const section of pathSections) {
    pathObserver.observe(section)
  }
})

onBeforeUnmount(() => {
  pathObserver?.disconnect()
})
</script>

<template>
  <div class="programs-page">
    <UiSection
      class="programs-page__header"
      variant="spacious"
      :eyebrow="t('pages.programs.intro.eyebrow')"
      :title="t('pages.programs.intro.heading')"
      :description="t('pages.programs.intro.summary')"
    >
      <div class="programs-header-actions">
        <UiButtonLink to="/pricing" variant="primary">
          {{ t('programsSections.header.compareCta') }}
        </UiButtonLink>
        <UiButtonLink to="/teachers" variant="secondary">
          {{ t('programsSections.header.teachersCta') }}
        </UiButtonLink>
        <UiButtonLink
          :href="genericTelegramTarget"
          external
          variant="ghost"
          @click="trackTelegramClick"
        >
          {{ t('programsSections.header.telegramCta') }}
        </UiButtonLink>
      </div>
    </UiSection>

    <section
      v-for="path in learningPaths"
      :id="path.anchorId"
      :key="path.id"
      class="program-panel"
      :data-program-path="path.id"
      :aria-labelledby="`program-${path.id}-title`"
    >
      <div class="program-panel__inner">
        <div class="program-panel__copy">
          <p class="program-panel__eyebrow">{{ t(`programsSections.paths.${path.id}.eyebrow`) }}</p>
          <h2 :id="`program-${path.id}-title`" class="program-panel__title">
            {{ t(`learningPaths.${path.id}.title`) }}
          </h2>
          <p class="program-panel__summary">{{ t(`programsSections.paths.${path.id}.summary`) }}</p>
        </div>

        <div class="program-panel__signals">
          <article class="program-signal">
            <span class="program-signal__label">{{ t('programsSections.signalLabels.fit') }}</span>
            <p>{{ t(`programsSections.paths.${path.id}.fit`) }}</p>
          </article>
          <article class="program-signal">
            <span class="program-signal__label">{{ t('programsSections.signalLabels.method') }}</span>
            <p>{{ t(`programsSections.paths.${path.id}.method`) }}</p>
          </article>
          <article class="program-signal">
            <span class="program-signal__label">{{ t('programsSections.signalLabels.start') }}</span>
            <p>{{ t(`programsSections.paths.${path.id}.diagnosticCue`) }}</p>
          </article>
        </div>

        <div class="program-panel__actions">
          <UiButtonLink
            :to="`/pricing?path=${path.id}`"
            variant="primary"
            @click="handlePricingClick(path)"
          >
            {{ t(`programsSections.paths.${path.id}.pricingCta`) }}
          </UiButtonLink>
          <UiButtonLink
            :href="getPathTelegramTarget(path)"
            external
            variant="secondary"
            @click="handlePathTelegramClick(path)"
          >
            {{ t(`programsSections.paths.${path.id}.telegramCta`) }}
          </UiButtonLink>
        </div>
      </div>
    </section>

    <UiSection
      class="programs-page__price-hints"
      :eyebrow="t('programsSections.priceHints.eyebrow')"
      :title="t('programsSections.priceHints.title')"
      :description="t('programsSections.priceHints.description')"
    >
      <div class="price-hint-grid">
        <article v-for="path in learningPaths" :key="path.id" class="price-hint">
          <h3 class="price-hint__title">{{ t(`learningPaths.${path.id}.title`) }}</h3>
          <div class="price-hint__items">
            <div v-for="priceItem in getPathPriceHints(path)" :key="priceItem.id" class="price-hint__item">
              <span class="price-hint__label">{{ t(`priceItems.${priceItem.id}.label`) }}</span>
              <strong class="price-hint__value">{{ t(`priceItems.${priceItem.id}.value`) }}</strong>
              <span class="price-hint__caption">{{ t(`priceItems.${priceItem.id}.caption`) }}</span>
            </div>
          </div>
        </article>
      </div>
    </UiSection>

    <UiSection
      class="programs-page__cta-strip"
      variant="inverse"
      :eyebrow="t('programsSections.ctaStrip.eyebrow')"
      :title="t('programsSections.ctaStrip.title')"
      :description="t('programsSections.ctaStrip.description')"
    >
      <div class="programs-cta-actions">
        <UiButtonLink to="/pricing" variant="primary">
          {{ t('programsSections.ctaStrip.pricingCta') }}
        </UiButtonLink>
        <UiButtonLink to="/teachers" variant="secondary">
          {{ t('programsSections.ctaStrip.teachersCta') }}
        </UiButtonLink>
        <UiButtonLink
          :href="genericTelegramTarget"
          external
          variant="secondary"
          @click="trackTelegramClick"
        >
          {{ t('programsSections.ctaStrip.telegramCta') }}
        </UiButtonLink>
      </div>
    </UiSection>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.programs-page {
  @apply bg-page;
}

.programs-header-actions,
.programs-cta-actions {
  @apply flex flex-wrap gap-control-compact;
}

.program-panel {
  @apply scroll-mt-36 bg-page px-page-gutter py-section-compact text-text;
}

.program-panel__inner {
  @apply mx-auto grid w-full max-w-6xl gap-component-gap border border-border-hairline bg-surface p-card-padding lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start;
}

.program-panel__copy {
  @apply flex flex-col gap-control-compact;
}

.program-panel__eyebrow {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.program-panel__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.program-panel__summary {
  @apply text-body text-text-muted;
}

.program-panel__signals {
  @apply grid gap-control-compact;
}

.program-signal {
  @apply border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}

.program-signal__label {
  @apply mb-1 block text-eyebrow font-bold uppercase text-text;
}

.program-panel__actions {
  @apply flex flex-wrap gap-control-compact lg:col-span-2;
}

.price-hint-grid {
  @apply grid gap-component-gap lg:grid-cols-3;
}

.price-hint {
  @apply border border-border-hairline bg-surface p-card-padding;
}

.price-hint__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.price-hint__items {
  @apply mt-component-gap grid gap-control-compact;
}

.price-hint__item {
  @apply flex flex-col gap-1 border-t border-border-hairline pt-control-compact;
}

.price-hint__label,
.price-hint__caption {
  @apply text-small text-text-muted;
}

.price-hint__value {
  @apply text-body font-semibold text-text;
}
</style>
