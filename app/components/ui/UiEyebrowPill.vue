<script setup lang="ts">
import { useSlots } from 'vue'

type EyebrowPillVariant = 'caps' | 'script'

const props = withDefaults(defineProps<{
  as?: string
  label?: string
  variant?: EyebrowPillVariant
  inverse?: boolean
}>(), {
  as: 'span',
  inverse: false,
  label: undefined,
  variant: 'caps'
})

const slots = useSlots()

if (import.meta.dev && props.variant === 'script' && props.label && /[Ѐ-ӿ]/.test(props.label)) {
  console.warn('[UiEyebrowPill] script variant sets Latin only — Pinyon Script has no Cyrillic glyphs')
}
</script>

<template>
  <component
    :is="as"
    v-if="label || slots.default"
    class="eyebrow-pill"
    :class="[
      `eyebrow-pill--${variant}`,
      { 'eyebrow-pill--inverse': inverse }
    ]"
  >
    <!-- Script variant sets Latin content only: Pinyon has no Cyrillic glyphs. -->
    <span class="eyebrow-pill__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Fixed height + flex centering: script font metrics overflow padding-driven pills.
   Caps pills use the same height as a minimum so long wrapping labels stay covered. */
.eyebrow-pill {
  @apply inline-flex min-h-7 items-center justify-center rounded-pill bg-accent-burgundy px-4 text-center text-text-inverse;
}

.eyebrow-pill--script {
  @apply h-7;
}

.eyebrow-pill--caps .eyebrow-pill__label {
  @apply text-eyebrow font-semibold uppercase tracking-display;
}

.eyebrow-pill--script .eyebrow-pill__label {
  @apply font-script text-eyebrow-script;
  transform: translateY(-0.12em);
}

.eyebrow-pill--inverse {
  @apply bg-surface-muted text-accent-burgundy;
}
</style>
