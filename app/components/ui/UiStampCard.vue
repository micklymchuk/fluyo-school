<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'article'
})
</script>

<template>
  <component :is="as" class="stamp-card">
    <div class="stamp-card__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Plain cream card: the perforated stamp edge was retired by design review —
   the testimonial surface stays a single calm card on any ground. */
.stamp-card {
  @apply relative rounded-card bg-surface-muted p-card-padding text-text;
}

.stamp-card__body {
  @apply relative;
}
</style>
