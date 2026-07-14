<script setup lang="ts">
interface ProgramPriceHintCardPrice {
  id: string
  label: string
  value: string
  caption: string
}

defineProps<{
  title: string
  prices: ProgramPriceHintCardPrice[]
}>()
</script>

<template>
  <article class="price-hint">
    <h3 class="price-hint__title">{{ title }}</h3>
    <div class="price-hint__items">
      <div v-for="price in prices" :key="price.id" class="price-hint__item">
        <span class="price-hint__label">{{ price.label }}</span>
        <strong class="price-hint__value">{{ price.value }}</strong>
        <span class="price-hint__caption">{{ price.caption }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

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
