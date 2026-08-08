<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { StarSolid } from '@iconoir/vue'

type TabValue = string | number

export interface UiTabSwitchOption {
  value: TabValue
  /** Full label, shown from the sm breakpoint up. */
  label: string
  /** Compact label shown below sm (falls back to `label`). */
  shortLabel?: string
  /** Renders the star badge next to the label. */
  badge?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: TabValue
  options: UiTabSwitchOption[]
  ariaLabel?: string
  badgeLabel?: string
}>(), {
  ariaLabel: undefined,
  badgeLabel: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: TabValue]
}>()

const rootEl = ref<HTMLElement | null>(null)
const values = computed(() => props.options.map((option) => option.value))

function select(value: TabValue) {
  if (value !== props.modelValue) {
    emit('update:modelValue', value)
  }
}

function focusValue(value: TabValue) {
  nextTick(() => {
    rootEl.value?.querySelector<HTMLButtonElement>(`[data-value="${value}"]`)?.focus()
  })
}

function move(delta: number) {
  const index = values.value.indexOf(props.modelValue)
  const from = index === -1 ? 0 : index
  const next = values.value[(from + delta + values.value.length) % values.value.length]

  if (next === undefined) {
    return
  }

  select(next)
  focusValue(next)
}

function selectAndFocus(value: TabValue | undefined) {
  if (value === undefined) {
    return
  }

  select(value)
  focusValue(value)
}

function onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Home':
      event.preventDefault()
      selectAndFocus(values.value[0])
      break
    case 'End':
      event.preventDefault()
      selectAndFocus(values.value[values.value.length - 1])
      break
  }
}
</script>

<template>
  <div
    ref="rootEl"
    class="tab-switch"
    role="radiogroup"
    :aria-label="ariaLabel"
    @keydown="onKeydown"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="tab-switch__option"
      :class="{ 'tab-switch__option--active': option.value === modelValue }"
      role="radio"
      :aria-checked="option.value === modelValue"
      :tabindex="option.value === modelValue ? 0 : -1"
      :data-value="option.value"
      @click="select(option.value)"
    >
      <span class="tab-switch__short">{{ option.shortLabel ?? option.label }}</span>
      <span class="tab-switch__full">{{ option.label }}</span>
      <StarSolid
        v-if="option.badge"
        class="tab-switch__badge"
        :width="16"
        :height="16"
        role="img"
        :aria-label="badgeLabel"
      />
    </button>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.tab-switch {
  @apply inline-flex flex-wrap justify-center gap-micro-gap rounded-pill border border-border-hairline bg-surface p-1;
}

.tab-switch__option {
  @apply relative flex items-center gap-2 rounded-pill px-4 py-2 text-small font-semibold text-text-muted transition-colors duration-short ease-standard;
}

.tab-switch__option:not(.tab-switch__option--active):hover {
  @apply bg-surface-muted text-text;
}

.tab-switch__option--active {
  @apply bg-accent-burgundy text-text-inverse;
}

.tab-switch__option--active:hover {
  @apply bg-accent-burgundy-strong text-text-inverse;
}

/* Below sm the full labels can wrap; show the compact label so all options fit one row. */
.tab-switch__short {
  @apply inline sm:hidden;
}

.tab-switch__full {
  @apply hidden sm:inline;
}

.tab-switch__badge {
  @apply text-accent-burgundy;
}

.tab-switch__option--active .tab-switch__badge {
  @apply text-text-inverse;
}
</style>
