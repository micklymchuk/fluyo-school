<script setup lang="ts">
import { computed, ref, useId } from 'vue'

type AccordionVariant = 'hairline' | 'card'

const props = withDefaults(defineProps<{
  id?: string
  title: string
  defaultOpen?: boolean
  disabled?: boolean
  variant?: AccordionVariant
}>(), {
  defaultOpen: false,
  disabled: false,
  id: undefined,
  variant: 'hairline'
})

const generatedId = useId()
const isOpen = ref(props.defaultOpen)
const rootId = computed(() => props.id ?? generatedId)
const triggerId = computed(() => `${rootId.value}-trigger`)
const panelId = computed(() => `${rootId.value}-panel`)

function toggle() {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value
}
</script>

<template>
  <section
    class="accordion-item"
    :class="[`accordion-item--${variant}`, { 'accordion-item--open': isOpen }]"
  >
    <button
      :id="triggerId"
      class="accordion-trigger"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="accordion-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="variant !== 'card'" class="accordion-icon" aria-hidden="true">{{ isOpen ? '-' : '+' }}</span>
    </button>
    <div
      v-show="isOpen"
      :id="panelId"
      class="accordion-panel"
      role="region"
      :aria-labelledby="triggerId"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.accordion-item {
  @apply border-b border-border-hairline;
}

/* Card variant: the question is a rounded bordered surface that simply grows to hold its answer. */
.accordion-item--card {
  @apply rounded-card border border-border-hairline bg-surface px-card-padding transition-colors duration-short ease-standard;
}

.accordion-item--card:hover {
  @apply border-accent-subdued bg-surface-muted;
}

.accordion-item--card.accordion-item--open {
  @apply border-accent-burgundy bg-surface-muted;
}

.accordion-trigger {
  @apply flex min-h-11 w-full items-center justify-between gap-component-gap py-control-compact text-left text-text transition-colors duration-short ease-standard;
}

.accordion-trigger:hover {
  @apply text-accent-burgundy;
}

.accordion-trigger:disabled {
  @apply cursor-not-allowed opacity-50;
}

.accordion-title {
  @apply text-body font-semibold leading-compact;
}

.accordion-icon {
  @apply flex size-11 shrink-0 items-center justify-center text-section-heading leading-tight;
}

.accordion-item--card .accordion-trigger {
  @apply items-start py-card-padding;
}

.accordion-item--card .accordion-title {
  @apply text-card-title font-semibold;
}

.accordion-panel {
  @apply pb-component-gap text-text-muted;
}

.accordion-item--card .accordion-panel {
  @apply border-t border-border-hairline pt-card-padding pb-card-padding text-body leading-body;
}
</style>
