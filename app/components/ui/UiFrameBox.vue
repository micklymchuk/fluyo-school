<script setup lang="ts">
type FrameBoxVariant = 'default' | 'tight'

withDefaults(defineProps<{
  as?: string
  variant?: FrameBoxVariant
}>(), {
  as: 'div',
  variant: 'default'
})
</script>

<template>
  <component
    :is="as"
    class="frame-box"
    :class="`frame-box--${variant}`"
  >
    <!-- No overflow clipping: slot content may deliberately cross the frame edge. -->
    <div class="frame-box__well">
      <slot />
    </div>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.frame-box {
  @apply bg-surface-inverse p-frame-tight sm:p-frame;
}

.frame-box--tight {
  @apply p-frame-tight sm:p-frame-tight;
}

.frame-box__well {
  @apply bg-page p-card-padding text-text sm:p-8;
}
</style>
