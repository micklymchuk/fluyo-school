<script setup lang="ts">
type SparkleTone = 'subdued' | 'burgundy' | 'rose'
type SparkleFill = 'outline' | 'solid'

withDefaults(defineProps<{
  size?: number
  tone?: SparkleTone
  fill?: SparkleFill
}>(), {
  size: 40,
  tone: 'subdued',
  fill: 'outline'
})
</script>

<template>
  <!-- Decorative four-point sparkle from the brand posts (the twinkles around the founder lockup). -->
  <svg
    class="sparkle"
    :class="[`sparkle--${tone}`, `sparkle--${fill}`]"
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      class="sparkle__path"
      d="M50 2C54 40 60 46 98 50C60 54 54 60 50 98C46 60 40 54 2 50C40 46 46 40 50 2Z"
      stroke-width="3"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.sparkle {
  @apply pointer-events-none select-none;
}

/* Outline is the reference look; solid is available for denser accents. */
.sparkle--outline .sparkle__path {
  fill: none;
}

.sparkle--subdued .sparkle__path {
  @apply stroke-accent-subdued;
}

.sparkle--rose .sparkle__path {
  @apply stroke-accent-rose;
}

.sparkle--burgundy .sparkle__path {
  @apply stroke-accent-burgundy;
}

.sparkle--solid.sparkle--subdued .sparkle__path {
  @apply fill-accent-subdued;
}

.sparkle--solid.sparkle--rose .sparkle__path {
  @apply fill-accent-rose;
}

.sparkle--solid.sparkle--burgundy .sparkle__path {
  @apply fill-accent-burgundy;
}
</style>
