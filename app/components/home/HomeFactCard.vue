<script setup lang="ts">
import UiCard from '~/components/ui/UiCard.vue'

defineProps<{
  title: string
  body: string
}>()
</script>

<template>
  <UiCard as="article" class="fact-card">
    <h3 class="fact-card__title">{{ title }}</h3>
    <p class="fact-card__body">{{ body }}</p>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.fact-card {
  @apply flex h-full flex-col gap-control-compact;
}

.fact-card__title {
  @apply font-display text-card-title font-semibold text-text;
}

.fact-card__body {
  @apply text-body text-text-muted;
}
</style>
