<script setup lang="ts">
import { computed, ref, useId } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  title: string
  defaultOpen?: boolean
  disabled?: boolean
}>(), {
  defaultOpen: false,
  disabled: false,
  id: undefined
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
  <section class="accordion-item">
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
      <span class="accordion-icon" aria-hidden="true">{{ isOpen ? '-' : '+' }}</span>
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

.accordion-panel {
  @apply pb-component-gap text-text-muted;
}
</style>
