<script setup lang="ts">
type GhostPlacement = 'bottom-right' | 'top-right'
type GhostSize = 'sm' | 'lg'

withDefaults(defineProps<{
  letter?: string
  placement?: GhostPlacement
  size?: GhostSize
}>(), {
  letter: 'F',
  placement: 'bottom-right',
  size: 'lg'
})
</script>

<template>
  <span
    class="ghost-letter"
    :class="[`ghost-letter--${placement}`, `ghost-letter--${size}`]"
    aria-hidden="true"
  >{{ letter }}</span>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* One anchored decorative letterform; the parent provides relative + overflow-hidden. */
.ghost-letter {
  @apply pointer-events-none absolute select-none font-script text-accent-burgundy opacity-5;
}

.ghost-letter--sm {
  @apply text-ghost-letter;
}

.ghost-letter--lg {
  @apply text-ghost-letter-lg;
}

.ghost-letter--bottom-right {
  @apply -bottom-36 -right-16;
}

.ghost-letter--top-right {
  @apply -right-8 -top-10;
}
</style>
