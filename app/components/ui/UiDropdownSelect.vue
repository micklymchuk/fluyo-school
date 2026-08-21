<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

type DropdownItem = {
  id: string
  label: string
}

type DropdownAlign = 'start' | 'end'

const props = withDefaults(defineProps<{
  items: DropdownItem[]
  label: string
  selectedId?: string
  align?: DropdownAlign
}>(), {
  align: 'start',
  selectedId: undefined
})

const isOpen = ref(false)
const root = ref<HTMLElement | null>(null)
const hasSelection = computed(() => {
  return props.items.some((item) => item.id === props.selectedId)
})

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}

function handleDocumentPointerDown(event: PointerEvent) {
  const target = event.target

  if (target instanceof Node && root.value?.contains(target)) {
    return
  }

  close()
}

watch(isOpen, (nextOpen) => {
  if (typeof document === 'undefined') {
    return
  }

  if (nextOpen) {
    document.addEventListener('pointerdown', handleDocumentPointerDown)
    return
  }

  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', handleDocumentPointerDown)
  }
})

defineExpose({ open, close, toggle })
</script>

<template>
  <div ref="root" class="dropdown" @keydown.esc="close">
    <!-- The trigger is the caller's element: it gets the toggle handler and the
         open / selected flags so it can style itself. -->
    <slot
      name="anchor"
      :toggle="toggle"
      :open="isOpen"
      :selected="hasSelection"
    />

    <Transition name="dropdown-panel">
      <div
        v-if="isOpen"
        class="dropdown__panel"
        :class="`dropdown__panel--${align}`"
        role="menu"
        :aria-label="label"
      >
        <ul class="dropdown__list">
          <li
            v-for="item in items"
            :key="item.id"
            class="dropdown__item"
            :class="{ 'dropdown__item--selected': item.id === selectedId }"
            role="none"
          >
            <slot
              name="item"
              :item="item"
              :selected="item.id === selectedId"
              :close="close"
            >
              {{ item.label }}
            </slot>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.dropdown {
  @apply relative inline-flex;
}

/* Panel carries the same card treatment as a standalone content block. */
.dropdown__panel {
  @apply absolute top-full z-overlay mt-2 min-w-48 w-max rounded-card border border-border-hairline bg-surface p-3 text-text shadow-md;
}

.dropdown__panel--start {
  @apply left-0;
}

.dropdown__panel--end {
  @apply right-0;
}

.dropdown__list {
  @apply flex flex-col gap-2;
}

.dropdown__item {
  @apply flex w-full rounded-card transition-colors duration-short ease-standard;
}

.dropdown__item:hover {
  @apply bg-surface-muted;
}

.dropdown__item--selected {
  @apply bg-surface-muted;
}

.dropdown-panel-enter-active,
.dropdown-panel-leave-active {
  @apply transition-opacity duration-short ease-standard;
}

.dropdown-panel-enter-from,
.dropdown-panel-leave-to {
  @apply opacity-0;
}
</style>
