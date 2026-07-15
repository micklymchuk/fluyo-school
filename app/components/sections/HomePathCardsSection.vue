<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import { learningPaths, type LearningPath, type LearningPathId } from '~/data/content'

const pathRoutes = {
  exam: '/programs#exam-preparation',
  kids: '/programs#kids-parents',
  adult: '/programs#adults-speaking'
} satisfies Record<LearningPathId, string>

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()
const localizedTo = useLocalizedTo()

function handlePathClick(path: LearningPath) {
  trackEvent('path_card_click', {
    route: route.fullPath,
    locale: locale.value,
    path: path.id
  })
}
</script>

<template>
  <UiSection
    id="learning-paths"
    :eyebrow="t('homeSections.pathCards.eyebrow')"
    :title="t('homeSections.pathCards.title')"
    :description="t('homeSections.pathCards.description')"
  >
    <div class="path-card-grid">
      <NuxtLink
        v-for="path in learningPaths"
        :key="path.id"
        class="path-card-link"
        :to="localizedTo(pathRoutes[path.id])"
        @click="handlePathClick(path)"
      >
        <UiCard as="div" interactive class="path-card">
          <UiEyebrowPill class="path-card__tag" :label="path.id" />
          <h3 class="path-card__title">{{ t(`learningPaths.${path.id}.title`) }}</h3>
          <p class="path-card__summary">{{ t(`learningPaths.${path.id}.summary`) }}</p>
          <p class="path-card__proof">{{ t(`learningPaths.${path.id}.proofCues[0]`) }}</p>
          <span class="path-card__cta">{{ t('homeSections.pathCards.cardCta') }}</span>
        </UiCard>
      </NuxtLink>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.path-card-grid {
  @apply grid gap-component-gap md:grid-cols-3;
}

.path-card-link {
  @apply block rounded-card text-text no-underline;
}

.path-card {
  @apply flex h-full flex-col gap-control-compact;
}

.path-card__tag {
  @apply self-start;
}

.path-card__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.path-card__summary {
  @apply text-body text-text-muted;
}

.path-card__proof {
  @apply mt-auto border-t border-border-hairline pt-control-compact text-small text-text-muted;
}

.path-card__cta {
  @apply text-small font-semibold text-accent-burgundy;
}
</style>
