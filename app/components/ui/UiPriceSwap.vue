<script setup lang="ts">
withDefaults(defineProps<{
  /** Rendered text. Changing it slides the old value out while the new one arrives. */
  value: string
  /**
   * Travel direction of the incoming value: 'up' rises from below (a bigger package,
   * a lower per-lesson price), 'down' drops in from above.
   */
  direction?: 'up' | 'down'
  /** Tag this renders, so it can stand in for the <p>/<span> it replaces. */
  as?: string
}>(), {
  direction: 'up',
  as: 'span'
})
</script>

<template>
  <component :is="as" class="price-swap" :class="`price-swap--${direction}`">
    <!-- No `mode`: the two values cross over in the same grid cell, so the swap reads
         as one move instead of a pause between two. -->
    <Transition name="price-swap">
      <span :key="value" class="price-swap__value">{{ value }}</span>
    </Transition>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Single-cell grid: the outgoing and incoming values share one cell, so neither is
   taken out of flow and the surrounding card never shifts mid-swap. */
.price-swap {
  @apply inline-grid;
  grid-template-areas: 'value';
}

.price-swap__value {
  grid-area: value;
  transition-property: opacity, transform;
  transition-duration: var(--transition-duration-medium);
  transition-timing-function: var(--ease-standard);
}

/* Travel is in `em`, so a card title and a display-size price move proportionally. */
.price-swap--up .price-swap-enter-from,
.price-swap--down .price-swap-leave-to {
  opacity: 0;
  transform: translate3d(0, 0.45em, 0);
}

.price-swap--up .price-swap-leave-to,
.price-swap--down .price-swap-enter-from {
  opacity: 0;
  transform: translate3d(0, -0.45em, 0);
}

@media (prefers-reduced-motion: reduce) {
  .price-swap__value {
    transition: none;
  }

  .price-swap--up .price-swap-enter-from,
  .price-swap--down .price-swap-enter-from,
  .price-swap--up .price-swap-leave-to,
  .price-swap--down .price-swap-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
