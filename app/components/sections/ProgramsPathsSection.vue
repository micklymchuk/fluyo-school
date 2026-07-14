<script setup lang="ts">
import { computed } from 'vue'
import ProgramPathPanel from '~/components/programs/ProgramPathPanel.vue'
import { resolveTelegramCta } from '~/composables/useTelegramCta'
import { useSurfaceViewObserver } from '~/composables/useSurfaceViewObserver'
import {
  learningPaths,
  type CtaContext,
  type LearningPath,
  type TrackingTrigger
} from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()

function getPathTelegramContext(path: LearningPath): CtaContext {
  return {
    path: path.id,
    format: path.telegramFormat,
    sourceRoute: 'programs',
    locale: locale.value,
    messageIntent: path.ctaIntent.messageIntent
  }
}

const pathPanels = computed(() => {
  return learningPaths.map((path) => ({
    path,
    eyebrow: t(`programsSections.paths.${path.id}.eyebrow`),
    title: t(`learningPaths.${path.id}.title`),
    summary: t(`programsSections.paths.${path.id}.summary`),
    signals: [
      {
        id: 'fit',
        label: t('programsSections.signalLabels.fit'),
        text: t(`programsSections.paths.${path.id}.fit`)
      },
      {
        id: 'method',
        label: t('programsSections.signalLabels.method'),
        text: t(`programsSections.paths.${path.id}.method`)
      },
      {
        id: 'start',
        label: t('programsSections.signalLabels.start'),
        text: t(`programsSections.paths.${path.id}.diagnosticCue`)
      }
    ],
    pricingCtaLabel: t(`programsSections.paths.${path.id}.pricingCta`),
    pricingCtaTo: `/pricing?path=${path.id}`,
    telegramCtaLabel: t(`programsSections.paths.${path.id}.telegramCta`),
    telegramCtaHref: resolveTelegramCta(getPathTelegramContext(path), route.fullPath).url
  }))
})

function trackProgramPathView(path: LearningPath, trigger: TrackingTrigger) {
  trackEvent('program_path_view', {
    route: route.fullPath,
    locale: locale.value,
    path: path.id,
    sourceRoute: 'programs',
    trigger
  })
}

function handlePricingClick(path: LearningPath) {
  trackProgramPathView(path, 'activate')
}

function handleTelegramClick(path: LearningPath) {
  const telegramCta = resolveTelegramCta(getPathTelegramContext(path), route.fullPath)

  trackProgramPathView(path, 'activate')
  trackEvent('telegram_context', telegramCta.contextEvent)
  trackEvent('telegram_click', telegramCta.clickEvent)
}

useSurfaceViewObserver('data-program-path', (observedPathId) => {
  const path = learningPaths.find((candidate) => candidate.id === observedPathId)

  if (path) {
    trackProgramPathView(path, 'observe')
  }
})
</script>

<template>
  <ProgramPathPanel
    v-for="panel in pathPanels"
    :id="panel.path.id"
    :key="panel.path.id"
    :anchor-id="panel.path.anchorId"
    :eyebrow="panel.eyebrow"
    :title="panel.title"
    :summary="panel.summary"
    :signals="panel.signals"
    :pricing-cta-label="panel.pricingCtaLabel"
    :pricing-cta-to="panel.pricingCtaTo"
    :telegram-cta-label="panel.telegramCtaLabel"
    :telegram-cta-href="panel.telegramCtaHref"
    @pricing-click="handlePricingClick(panel.path)"
    @telegram-click="handleTelegramClick(panel.path)"
  />
</template>
