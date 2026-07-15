<script setup lang="ts">
import UiCard from '~/components/ui/UiCard.vue'

defineProps<{
  label: string
  value: string
  caption: string
}>()
</script>

<template>
  <UiCard as="article" class="price-card">
    <div class="price-card__head">
      <h3 class="price-card__label">{{ label }}</h3>
      <strong class="price-card__value">{{ value }}</strong>
    </div>
    <p class="price-card__caption">{{ caption }}</p>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.price-card {
  @apply flex h-full flex-col gap-control-compact;
}

.price-card__head {
  @apply flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1;
}

.price-card__label {
  @apply font-display text-body font-semibold text-text;
}

.price-card__value {
  @apply whitespace-nowrap font-display text-card-title font-bold text-accent-burgundy;
}

.price-card__caption {
  @apply text-small text-text-muted;
}
</style>
