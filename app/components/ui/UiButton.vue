<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'compact'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(defineProps<{
  as?: string | object
  label?: string
  ariaLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
}>(), {
  ariaLabel: undefined,
  as: 'button',
  disabled: false,
  label: undefined,
  loading: false,
  size: 'default',
  type: 'button',
  variant: 'secondary'
})

defineOptions({
  inheritAttrs: false
})

const isDisabled = computed(() => props.disabled || props.loading)
const componentType = computed(() => props.as)
const isNativeButton = computed(() => componentType.value === 'button')
const nativeButtonType = computed(() => isNativeButton.value ? props.type : undefined)
const nativeDisabled = computed(() => isNativeButton.value ? isDisabled.value : undefined)
const ariaDisabled = computed(() => !isNativeButton.value && isDisabled.value ? 'true' : undefined)
const tabIndex = computed(() => !isNativeButton.value && isDisabled.value ? -1 : undefined)

function handleClick(event: MouseEvent) {
  if (!isDisabled.value) {
    return
  }

  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}
</script>

<template>
  <component
    :is="componentType"
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--disabled': isDisabled }
    ]"
    :type="nativeButtonType"
    :disabled="nativeDisabled"
    :aria-label="ariaLabel"
    :aria-disabled="ariaDisabled"
    :aria-busy="loading ? 'true' : undefined"
    :tabindex="tabIndex"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span class="ui-button__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.ui-button {
  @apply inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border-[1.5px] px-6 text-center text-small font-semibold no-underline transition-colors duration-short ease-standard;
}

.ui-button--compact {
  @apply min-h-11 px-6 text-eyebrow;
}

.ui-button--primary {
  @apply border-accent-burgundy bg-accent-burgundy text-text-inverse;
}

.ui-button--primary:hover {
  @apply border-accent-burgundy-strong bg-accent-burgundy-strong text-text-inverse;
}

.ui-button--secondary {
  @apply border-accent-burgundy bg-transparent text-accent-burgundy;
}

.ui-button--secondary:hover {
  @apply border-accent-burgundy bg-accent-subdued text-accent-burgundy-strong;
}

.ui-button--ghost {
  @apply border-transparent bg-transparent text-accent-burgundy;
}

.ui-button--ghost:hover {
  @apply bg-surface-muted text-accent-burgundy-strong;
}

.ui-button--disabled {
  @apply cursor-not-allowed opacity-50;
}

.ui-button__label {
  @apply leading-compact;
}
</style>
