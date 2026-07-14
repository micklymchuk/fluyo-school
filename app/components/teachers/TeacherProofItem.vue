<script setup lang="ts">
defineProps<{
  kindLabel: string
  title: string
  caption: string
}>()
</script>

<template>
  <article class="proof-item">
    <span class="proof-item__kind">{{ kindLabel }}</span>
    <h3 class="proof-item__title">{{ title }}</h3>
    <p class="proof-item__caption">{{ caption }}</p>
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.proof-item {
  @apply border-l-2 border-accent-subdued bg-surface-muted p-card-padding;
}

.proof-item__kind {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.proof-item__title {
  @apply mt-control-compact font-display text-[1.35rem] font-semibold leading-tight text-text;
}

.proof-item__caption {
  @apply mt-control-compact text-small text-text-muted;
}
</style>
