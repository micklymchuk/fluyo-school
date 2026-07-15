<script setup lang="ts">
import UiStampCard from '~/components/ui/UiStampCard.vue'

defineProps<{
  quote: string
  sourceLabel: string
}>()
</script>

<template>
  <UiStampCard as="figure" class="testimonial">
    <blockquote>
      <p class="testimonial__quote">{{ quote }}</p>
    </blockquote>
    <figcaption class="testimonial__source">{{ sourceLabel }}</figcaption>
  </UiStampCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Quote leads the stamp; attribution stays a small, clearly subordinate caption. */
.testimonial__quote {
  @apply text-card-title text-text;
}

.testimonial__source {
  @apply mt-component-gap text-eyebrow font-semibold uppercase tracking-display text-text-muted;
}
</style>
