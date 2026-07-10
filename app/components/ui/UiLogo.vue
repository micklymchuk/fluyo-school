<script setup lang="ts">
import { computed, resolveComponent } from 'vue'

type LogoVariant = 'full' | 'short'
type LogoSize = 'compact' | 'default' | 'large'

const props = withDefaults(defineProps<{
  variant?: LogoVariant
  size?: LogoSize
  to?: string
  label?: string
}>(), {
  label: 'Fluyo School',
  size: 'default',
  to: undefined,
  variant: 'full'
})

const logos = {
  full: {
    src: '/images/brand/fluyo-logo-full.png',
    width: 2597,
    height: 1368
  },
  short: {
    src: '/images/brand/fluyo-logo-short.png',
    width: 2168,
    height: 1528
  }
} as const

function resolveLogoVariant(value: unknown): LogoVariant {
  return value === 'short' ? 'short' : 'full'
}

const logoVariant = computed(() => resolveLogoVariant(props.variant))
const logo = computed(() => logos[logoVariant.value])
const componentType = computed(() => props.to ? resolveComponent('NuxtLink') : 'span')
const componentProps = computed(() => props.to ? { to: props.to, 'aria-label': props.label } : {})
</script>

<template>
  <component
    :is="componentType"
    class="ui-logo"
    :class="[`ui-logo--${logoVariant}`, `ui-logo--${size}`]"
    v-bind="componentProps"
  >
    <img
      class="ui-logo__image"
      :src="logo.src"
      :width="logo.width"
      :height="logo.height"
      :alt="to ? '' : label"
      decoding="async"
    >
    <span v-if="to" class="visually-hidden">{{ label }}</span>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.ui-logo {
  @apply inline-flex min-h-11 items-center text-text no-underline;
}

.ui-logo:hover {
  @apply text-text;
}

.ui-logo__image {
  @apply block h-auto w-auto object-contain;
}

.ui-logo--short.ui-logo--compact .ui-logo__image {
  @apply h-11 max-w-20;
}

.ui-logo--short.ui-logo--default .ui-logo__image {
  @apply h-14 max-w-24;
}

.ui-logo--short.ui-logo--large .ui-logo__image {
  @apply h-16 max-w-28;
}

.ui-logo--full.ui-logo--compact .ui-logo__image {
  @apply h-12 max-w-40;
}

.ui-logo--full.ui-logo--default .ui-logo__image {
  @apply h-14 max-w-44;
}

.ui-logo--full.ui-logo--large .ui-logo__image {
  @apply h-20 max-w-56;
}
</style>
