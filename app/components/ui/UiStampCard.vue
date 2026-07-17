<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'figure'
})
</script>

<template>
  <component :is="as" class="stamp-card">
    <slot />
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Fallback: a plain rounded cream card wherever the perforation mask is unsupported. */
.stamp-card {
  @apply rounded-card bg-surface p-card-padding text-text;
}

/* Postage-stamp edge: two composited mask layers. A solid interior rectangle
   (inset half a pitch on every side) keeps the body fully opaque; a grid of
   holes — sized by `round` so an integer number of tiles fits each axis exactly —
   is then unioned in, so only the outer ring shows dots. The result is one uniform
   row of perforations on all four sides. Pitch/hole are tuned to read at arm's length. */
@supports (mask-repeat: round) or (-webkit-mask-repeat: round) {
  .stamp-card {
    --stamp-pitch: 1.375rem;
    --stamp-hole: 0.4375rem;

    @apply rounded-none;
    padding: clamp(1.75rem, 4vw, 2.4rem);
    -webkit-mask:
      linear-gradient(black 0 0) calc(var(--stamp-pitch) / 2) calc(var(--stamp-pitch) / 2) / calc(100% - var(--stamp-pitch)) calc(100% - var(--stamp-pitch)) no-repeat,
      radial-gradient(var(--stamp-hole), transparent 98%, black) round calc(var(--stamp-pitch) / -2) calc(var(--stamp-pitch) / -2) / var(--stamp-pitch) var(--stamp-pitch);
    mask:
      linear-gradient(black 0 0) calc(var(--stamp-pitch) / 2) calc(var(--stamp-pitch) / 2) / calc(100% - var(--stamp-pitch)) calc(100% - var(--stamp-pitch)) no-repeat,
      radial-gradient(var(--stamp-hole), transparent 98%, black) round calc(var(--stamp-pitch) / -2) calc(var(--stamp-pitch) / -2) / var(--stamp-pitch) var(--stamp-pitch);
  }
}
</style>
