<script setup lang="ts">
import UiCard from '~/components/ui/UiCard.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { learningPaths, type LearningPath, type LearningPathId } from '~/data/content'

const pathRoutes = {
  general: '/programs#general-english',
  exam: '/programs#exam-preparation',
  'speaking-club': '/programs#speaking-club',
  kids: '/programs#kids-parents',
  professional: '/programs#professional-english',
  interview: '/programs#interview-preparation'
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

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <UiSection id="learning-paths" labelledby="home-paths-title" :watermarks="0">
    <h2 id="home-paths-title" class="sr-only">{{ t('homeSections.pathCards.title') }}</h2>
    <div class="paths__grid">
      <UiReveal
        v-for="(path, index) in learningPaths"
        :key="path.id"
        :delay="index * 70"
      >
        <NuxtLink
          class="path-card-link"
          :to="localizedTo(pathRoutes[path.id])"
          @click="handlePathClick(path)"
        >
          <UiCard as="div" interactive class="path-card">
            <span class="path-card__index" aria-hidden="true">{{ formatIndex(index) }}</span>
            <h3 class="path-card__title">{{ t(`learningPaths.${path.id}.title`) }}</h3>
            <p class="path-card__summary">{{ t(`learningPaths.${path.id}.summary`) }}</p>
          </UiCard>
        </NuxtLink>
      </UiReveal>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.paths__grid {
  @apply grid w-full gap-component-gap md:grid-cols-3;
}

.path-card-link {
  @apply block h-full rounded-card text-text no-underline;
}

.path-card {
  @apply flex h-full flex-col gap-control-compact;
}

.path-card__index {
  @apply font-script text-lockup-script leading-none text-accent-burgundy;
}

.path-card__title {
  @apply font-display text-card-title font-bold uppercase leading-compact tracking-display text-text;
}

.path-card__summary {
  @apply text-body text-text-muted;
}
</style>
