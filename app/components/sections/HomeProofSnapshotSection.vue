<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'

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
      <article v-for="itemIndex in proofItemIndexes" :key="itemIndex" class="proof-item">
        <span class="proof-item__status">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].status`) }}</span>
        <h3 class="proof-item__title">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].title`) }}</h3>
        <p class="proof-item__body">{{ t(`homeSections.proofSnapshot.items[${itemIndex}].body`) }}</p>
      </article>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.proof-grid {
  @apply grid gap-component-gap md:grid-cols-3;
}

.proof-item {
  @apply border-l-2 border-accent-subdued bg-surface-muted p-card-padding;
}

.proof-item__status {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.proof-item__title {
  @apply mt-control-compact font-display text-[1.35rem] font-semibold leading-tight text-text;
}

.proof-item__body {
  @apply mt-control-compact text-small text-text-muted;
}
</style>
