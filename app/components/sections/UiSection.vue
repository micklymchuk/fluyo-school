<script setup lang="ts">
import { computed, useId } from 'vue'

type SectionVariant = 'default' | 'compact' | 'spacious' | 'inverse'

const props = withDefaults(defineProps<{
  as?: string
  variant?: SectionVariant
  eyebrow?: string
  title?: string
  description?: string
  labelledby?: string
}>(), {
  as: 'section',
  description: undefined,
  eyebrow: undefined,
  labelledby: undefined,
  title: undefined,
  variant: 'default'
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
    <div class="section-inner">
      <header v-if="hasHeader || $slots.heading" class="section-header">
        <slot name="heading">
          <p v-if="eyebrow" class="section-eyebrow">{{ eyebrow }}</p>
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
  @apply bg-page py-section text-text;
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

.section-inner {
  @apply mx-auto flex w-full max-w-6xl flex-col gap-component-gap px-page-gutter;
}

.section-header {
  @apply flex max-w-3xl flex-col gap-control-compact;
}

.section-eyebrow {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.section-title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.section-description {
  @apply max-w-2xl text-body text-text-muted;
}

.section-content {
  @apply w-full;
}

.section--inverse .section-title,
.section--inverse .section-description,
.section--inverse .section-eyebrow {
  @apply text-text-inverse;
}
</style>
