<script setup lang="ts">
defineProps<{
  quote: string
  sourceLabel: string
}>()
</script>

<template>
  <figure class="testimonial">
    <blockquote>
      <p class="testimonial__quote">{{ quote }}</p>
    </blockquote>
    <figcaption class="testimonial__source">{{ sourceLabel }}</figcaption>
  </figure>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.testimonial {
  @apply flex flex-col gap-control-compact border border-border-hairline bg-surface p-card-padding;
}

.testimonial__quote {
  @apply text-body text-text;
}

.testimonial__source {
  @apply text-small text-text-muted;
}
</style>
