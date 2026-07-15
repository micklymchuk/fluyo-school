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
  .stamp-card {
    @apply rounded-none bg-transparent;
  }

  /* Perforation: interior rect inset by half the pitch + edge holes repeated `round`. */
  .stamp-card__edge {
    --stamp-pitch: 1.1rem;
    --stamp-hole: 0.28rem;

    @apply block;
    -webkit-mask:
      linear-gradient(black 0 0) center / calc(100% - var(--stamp-pitch)) calc(100% - var(--stamp-pitch)) no-repeat,
      radial-gradient(circle var(--stamp-hole), transparent 98%, black) 50% / var(--stamp-pitch) var(--stamp-pitch) round;
    mask:
      linear-gradient(black 0 0) center / calc(100% - var(--stamp-pitch)) calc(100% - var(--stamp-pitch)) no-repeat,
      radial-gradient(circle var(--stamp-hole), transparent 98%, black) 50% / var(--stamp-pitch) var(--stamp-pitch) round;
  }
}
</style>
