<script setup lang="ts">
import UiSparkle from './UiSparkle.vue'

withDefaults(defineProps<{
  iconSize?: number
}>(), {
  iconSize: 28
})
</script>

<template>
  <p class="info-inline">
    <span class="info-inline__icon">
      <slot name="icon">
        <UiSparkle :size="iconSize" tone="burgundy" />
      </slot>
    </span>
    <span class="info-inline__text">
      <slot />
    </span>
  </p>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* One-line aside on a soft board: a glyph, then the message. */
.info-inline {
  @apply flex w-full flex-col items-center justify-center gap-3 rounded-card border border-border-hairline px-4 py-4 text-center sm:flex-row sm:gap-4 sm:px-8;
}

.info-inline__icon {
  @apply flex shrink-0 items-center justify-center;
}

.info-inline__text {
  @apply text-balance text-small text-text sm:text-body;
}
</style>
