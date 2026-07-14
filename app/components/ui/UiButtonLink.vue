<script setup lang="ts">
import { computed, resolveComponent } from 'vue'
import UiButton from './UiButton.vue'
import { useLocalizedTo } from '~/composables/useLocale'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'default' | 'compact'
type ButtonType = 'button' | 'submit' | 'reset'

const props = withDefaults(defineProps<{
  to?: string | Record<string, unknown>
  href?: string
  label?: string
  ariaLabel?: string
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  external?: boolean
  disabled?: boolean
  loading?: boolean
}>(), {
  ariaLabel: undefined,
  disabled: false,
  external: false,
  href: undefined,
  label: undefined,
  loading: false,
  size: 'default',
  to: undefined,
  type: 'button',
  variant: 'secondary'
})

const isDisabled = computed(() => props.disabled || props.loading)
const localizedTo = useLocalizedTo()

const componentType = computed(() => {
  if (props.to && !isDisabled.value) {
    return resolveComponent('NuxtLink')
  }

  if (props.href && !isDisabled.value) {
    return 'a'
  }

  return 'button'
})

const externalLink = computed(() => {
  return props.external || props.href?.startsWith('http') === true
})

const componentProps = computed(() => {
  if (props.to && !isDisabled.value) {
    return {
      to: typeof props.to === 'string' ? localizedTo(props.to) : props.to
    }
  }

  if (props.href && !isDisabled.value) {
    return {
      href: props.href,
      target: externalLink.value ? '_blank' : undefined,
      rel: externalLink.value ? 'noopener noreferrer' : undefined
    }
  }

  return {}
})
</script>

<template>
  <UiButton
    :as="componentType"
    :variant="variant"
    :size="size"
    :type="type"
    :label="label"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :loading="loading"
    v-bind="componentProps"
  >
    <slot>{{ label }}</slot>
  </UiButton>
</template>
