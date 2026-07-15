<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  value: string
  caption: string
  recommended?: boolean
  recommendedLabel?: string
}>(), {
  recommended: false,
  recommendedLabel: undefined
})
</script>

<template>
  <article
    class="price-simple-card"
    :class="{ 'price-simple-card--recommended': recommended }"
  >
    <p v-if="recommended && recommendedLabel" class="price-simple-card__badge">
      {{ recommendedLabel }}
    </p>
    <h3 class="price-simple-card__label">{{ label }}</h3>
    <p class="price-simple-card__value">{{ value }}</p>
    <p class="price-simple-card__caption">{{ caption }}</p>
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.price-simple-card {
  @apply relative flex h-full flex-col gap-control-compact rounded-card border border-border-hairline bg-surface p-card-padding text-text;
}

/* The one burgundy moment of the grid: the recommended starting point. */
.price-simple-card--recommended {
  @apply border-accent-burgundy bg-surface-inverse text-text-inverse;
}

.price-simple-card__badge {
  @apply absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-accent-burgundy px-4 py-1 text-eyebrow font-bold uppercase tracking-display text-text-inverse shadow-sm;
}

.price-simple-card--recommended .price-simple-card__badge {
  @apply bg-surface-muted text-accent-burgundy;
}

.price-simple-card__label {
  @apply font-display text-small font-bold uppercase tracking-display text-text;
}

.price-simple-card__value {
  @apply font-display text-card-title font-bold text-accent-burgundy;
}

.price-simple-card__caption {
  @apply grow text-small text-text-muted;
}

.price-simple-card--recommended .price-simple-card__label {
  @apply text-text-inverse;
}

.price-simple-card--recommended .price-simple-card__value {
  @apply text-text-inverse;
}

.price-simple-card--recommended .price-simple-card__caption {
  @apply text-text-inverse/85;
}
</style>
