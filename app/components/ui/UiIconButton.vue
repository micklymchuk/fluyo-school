<script setup lang="ts">
import type { Component } from 'vue'
import UiButtonLink from './UiButtonLink.vue'

type IconButtonVariant = 'primary' | 'secondary' | 'ghost'
type IconButtonSize = 'default' | 'compact'

withDefaults(defineProps<{
  icon: Component
  label: string
  to?: string | Record<string, unknown>
  href?: string
  variant?: IconButtonVariant
  size?: IconButtonSize
  external?: boolean
  disabled?: boolean
  loading?: boolean
  iconSize?: number | string
  strokeWidth?: number | string
}>(), {
  disabled: false,
  external: false,
  href: undefined,
  iconSize: 20,
  loading: false,
  size: 'compact',
  strokeWidth: 1.8,
  to: undefined,
  variant: 'ghost'
})
</script>

<template>
  <UiButtonLink
    class="ui-icon-button"
    :class="`ui-icon-button--${size}`"
    :to="to"
    :href="href"
    :aria-label="label"
    :variant="variant"
    :size="size"
    :external="external"
    :disabled="disabled"
    :loading="loading"
  >
    <component
      :is="icon"
      class="ui-icon-button__icon"
      :width="iconSize"
      :height="iconSize"
      :stroke-width="strokeWidth"
      aria-hidden="true"
    />
  </UiButtonLink>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.ui-icon-button {
  @apply min-h-11 min-w-11 px-0;
}

.ui-icon-button--compact {
  @apply min-h-11 min-w-11 px-0;
}

.ui-icon-button__icon {
  @apply shrink-0;
}
</style>
