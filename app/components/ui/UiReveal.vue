<script setup lang="ts">
import { computed } from 'vue'

type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale'

const props = withDefaults(defineProps<{
  // The tag this renders. Set it to whatever the parent layout expects as its
  // direct child (`li` inside a list, `section`, …) so wrapping never breaks a
  // grid/flex relationship.
  as?: string
  variant?: RevealVariant
  // Stagger, in ms — `:delay="index * 70"` walks a row of cards in.
  delay?: number
  // false ⇒ re-hide on the way out and replay on the way back.
  once?: boolean
}>(), {
  as: 'div',
  delay: 0,
  once: true,
  variant: 'up'
})

const { el, visible } = useReveal({ once: props.once })

const delayStyle = computed(() => {
  return props.delay ? { '--reveal-delay': `${props.delay}ms` } : undefined
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="[`reveal--${variant}`, { 'reveal--visible': visible }]"
    :style="delayStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Layout-neutral by design: this element sets ONLY opacity and transform, both
   compositor-only properties. No display, box, spacing or sizing declarations,
   so dropping it around anything leaves the surrounding layout untouched. */
.reveal {
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: var(--transition-duration-long);
  transition-timing-function: var(--ease-standard);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal--up {
  transform: translate3d(0, var(--reveal-distance), 0);
}

.reveal--left {
  transform: translate3d(calc(var(--reveal-distance) * -1), 0, 0);
}

.reveal--right {
  transform: translate3d(var(--reveal-distance), 0, 0);
}

.reveal--scale {
  transform: scale(0.96);
}

.reveal--visible {
  opacity: 1;
  transform: none;
}

/* Both fallbacks must outrank the variants above, so they stay last. */

/* Reduce ⇒ content is simply present. Not "instant transition": nothing here
   may depend on JS having run. */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal--up,
  .reveal--left,
  .reveal--right,
  .reveal--scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* No scripting ⇒ nothing will ever flip the state class, so never hide. */
@media (scripting: none) {
  .reveal,
  .reveal--up,
  .reveal--left,
  .reveal--right,
  .reveal--scale {
    opacity: 1;
    transform: none;
  }
}
</style>
