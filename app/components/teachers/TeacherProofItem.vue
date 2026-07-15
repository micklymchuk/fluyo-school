<script setup lang="ts">
import UiCard from '~/components/ui/UiCard.vue'

defineProps<{
  kindLabel: string
  title: string
  caption: string
}>()
</script>

<template>
  <UiCard class="proof-item">
    <span class="proof-item__kind">{{ kindLabel }}</span>
    <h3 class="proof-item__title">{{ title }}</h3>
    <p class="proof-item__caption">{{ caption }}</p>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.proof-item__kind {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.proof-item__title {
  @apply mt-control-compact font-display text-card-title font-semibold text-text;
}

.proof-item__caption {
  @apply mt-control-compact text-small text-text-muted;
}
</style>
