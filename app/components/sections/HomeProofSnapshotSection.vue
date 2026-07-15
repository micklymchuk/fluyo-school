<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'
import UiCard from '~/components/ui/UiCard.vue'

const { t } = useI18n()
const proofItemIndexes = [0, 1, 2] as const
</script>

<template>
  <UiSection
    id="proof-snapshot"
    variant="compact"
    :eyebrow="t('homeSections.proofSnapshot.eyebrow')"
    :title="t('homeSections.proofSnapshot.title')"
    :description="t('homeSections.proofSnapshot.description')"
  >
    <div class="proof-grid">
      <UiCard v-for="itemIndex in proofItemIndexes" :key="itemIndex" class="proof-item">
        <span class="proof-item__status">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].status`) }}</span>
        <h3 class="proof-item__title">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].title`) }}</h3>
        <p class="proof-item__body">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].body`) }}</p>
      </UiCard>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.proof-grid {
  @apply grid gap-component-gap md:grid-cols-3;
}

.proof-item__status {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.proof-item__title {
  @apply mt-control-compact font-display text-card-title font-semibold text-text;
}

.proof-item__body {
  @apply mt-control-compact text-small text-text-muted;
}
</style>
