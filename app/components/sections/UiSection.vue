<script setup lang="ts">
import { computed, useId } from 'vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'

type SectionVariant = 'default' | 'compact' | 'spacious' | 'inverse'

const props = withDefaults(defineProps<{
  as?: string
  variant?: SectionVariant
  eyebrow?: string
  title?: string
  description?: string
  labelledby?: string
  watermark?: boolean
}>(), {
  as: 'section',
  description: undefined,
  eyebrow: undefined,
  labelledby: undefined,
  title: undefined,
  variant: 'default',
  watermark: false
})

const generatedId = useId()
const headingId = computed(() => {
  if (props.labelledby) {
    return props.labelledby
  }

  return props.title ? `${generatedId}-heading` : undefined
})

const hasHeader = computed(() => {
  return Boolean(props.eyebrow || props.title || props.description)
})
</script>

<template>
  <component
    :is="as"
    class="section"
    :class="`section--${variant}`"
    :aria-labelledby="headingId"
  >
    <UiWatermark v-if="watermark" :mode="variant === 'inverse' ? 'inverse' : 'cream'" />
    <div class="section-inner">
      <header v-if="hasHeader || $slots.heading" class="section-header">
        <slot name="heading">
          <UiEyebrowPill
            v-if="eyebrow"
            class="section-eyebrow"
            :label="eyebrow"
            :inverse="variant === 'inverse'"
          />
          <h2 v-if="title" :id="headingId" class="section-title">{{ title }}</h2>
          <p v-if="description" class="section-description">{{ description }}</p>
        </slot>
      </header>
      <div class="section-content">
        <slot />
      </div>
    </div>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.section {
  @apply relative bg-page py-section text-text;
}

.section--compact {
  @apply py-section-compact;
}

.section--spacious {
  @apply py-section-spacious;
}

.section--inverse {
  @apply bg-surface-inverse text-text-inverse;
}

/* relative: content must stack above the absolutely-positioned watermark layer. */
.section-inner {
  @apply relative mx-auto flex w-full max-w-6xl flex-col gap-component-gap px-page-gutter;
}

.section-header {
  @apply flex max-w-3xl flex-col gap-control-compact;
}

.section-eyebrow {
  @apply self-start;
}

.section-title {
  @apply font-display text-section-heading font-bold uppercase leading-tight tracking-display text-text;
}

.section-description {
  @apply max-w-2xl text-body text-text-muted;
}

.section-content {
  @apply w-full;
}

.section--inverse .section-title,
.section--inverse .section-description {
  @apply text-text-inverse;
}

/* The global teal focus ring is near-invisible on the burgundy band. */
.section--inverse :deep(:focus-visible) {
  @apply outline-text-inverse;
}

/* Nested light surfaces inside the band keep the teal ring (cream-on-cream is invisible). */
.section--inverse :deep(.card-surface :focus-visible),
.section--inverse :deep(.frame-box__well :focus-visible) {
  @apply outline-focus;
}

/* CTAs on the burgundy band flip to cream treatments (burgundy-on-burgundy is invisible). */
.section--inverse :deep(.ui-button--primary) {
  @apply border-surface-muted bg-surface-muted text-accent-burgundy;
}

.section--inverse :deep(.ui-button--primary:hover) {
  @apply border-page bg-page text-accent-burgundy-strong;
}

.section--inverse :deep(.ui-button--secondary) {
  @apply border-text-inverse bg-transparent text-text-inverse;
}

.section--inverse :deep(.ui-button--secondary:hover) {
  @apply border-text-inverse bg-text-inverse text-accent-burgundy;
}

.section--inverse :deep(.ui-button--ghost) {
  @apply text-text-inverse;
}

.section--inverse :deep(.ui-button--ghost:hover) {
  @apply bg-accent-burgundy-strong text-text-inverse;
}
</style>
