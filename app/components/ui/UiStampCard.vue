<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'article'
})
</script>

<template>
  <component :is="as" class="stamp-card">
    <span class="stamp-card__edge" aria-hidden="true" />
    <div class="stamp-card__body">
      <slot />
    </div>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Base = fallback: a plain rounded cream card wherever mask-repeat: round is unsupported. */
.stamp-card {
  @apply relative rounded-card bg-surface-muted p-card-padding text-text;
}

.stamp-card__edge {
  @apply absolute inset-0 hidden bg-surface-muted;
}

.stamp-card__body {
  @apply relative;
}

@supports (mask-repeat: round) or (-webkit-mask-repeat: round) {
  /* p-6: the dot ring occupies the outer ~1.1rem, so the body steps in past it. */
  .stamp-card {
    @apply rounded-none bg-transparent p-6;
  }

  /* Perforation: `round` rescales the hole tile to an integer fit, and anchoring the grid
     at 0 0 (never `center` — a centered grid drifts per card size) pins a dot row exactly
     half a pitch from every edge. The interior rect, inset by a full pitch, re-covers all
     holes except that edge ring, leaving one uniform row of full dots on all four sides.
     Pitch/hole sized so the postage-stamp edge registers at arm's length. */
  .stamp-card__edge {
    --stamp-pitch: 1.35rem;
    --stamp-hole: 0.4rem;

    @apply block;
    -webkit-mask:
      linear-gradient(black 0 0) center / calc(100% - 2 * var(--stamp-pitch)) calc(100% - 2 * var(--stamp-pitch)) no-repeat,
      radial-gradient(circle var(--stamp-hole), transparent 98%, black) 0 0 / var(--stamp-pitch) var(--stamp-pitch) round;
    mask:
      linear-gradient(black 0 0) center / calc(100% - 2 * var(--stamp-pitch)) calc(100% - 2 * var(--stamp-pitch)) no-repeat,
      radial-gradient(circle var(--stamp-hole), transparent 98%, black) 0 0 / var(--stamp-pitch) var(--stamp-pitch) round;
  }
}
</style>
