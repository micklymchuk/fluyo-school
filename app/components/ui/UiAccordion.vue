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
    <!-- The panel stays in the DOM so open/close can animate; `inert` plus the
         hidden visibility below keep it out of tab order and the a11y tree. -->
    <div
      :id="panelId"
      class="accordion-panel"
      role="region"
      :aria-labelledby="triggerId"
      :inert="!isOpen"
    >
      <div class="accordion-panel__viewport">
        <div class="accordion-panel__content">
          <slot />
        </div>
      </div>
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

/* The answer opens by animating the panel's single grid row from 0fr to 1fr, so
   the height is interpolated against the real content — no measured max-height,
   no clipped long answers. Spacing lives two levels down so the collapsed state
   is a true zero, not a padding-tall sliver. */
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  visibility: hidden;
  transition-property: grid-template-rows, visibility;
  transition-duration: var(--transition-duration-medium);
  transition-timing-function: var(--ease-standard);
}

.accordion-item--open .accordion-panel {
  grid-template-rows: 1fr;
  visibility: visible;
}

/* The viewport is the grid item, and it must stay spacing-free: min-height:0 plus
   its own clipping let it collapse to a real zero. Padding and the hairline live
   one level deeper so they get clipped away instead of holding the row open. */
.accordion-panel__viewport {
  @apply min-h-0 overflow-hidden;
}

/* The text fades and rises slightly behind the opening edge for a softer reveal. */
.accordion-panel__content {
  @apply pb-component-gap text-text-muted;

  opacity: 0;
  transform: translate3d(0, -0.375rem, 0);
  transition-property: opacity, transform;
  transition-duration: var(--transition-duration-medium);
  transition-timing-function: var(--ease-standard);
}

.accordion-item--open .accordion-panel__content {
  opacity: 1;
  transform: none;
  /* Delayed on the way in only, so the text lands after the box has room. */
  transition-delay: 80ms;
}

.accordion-item--card .accordion-panel__content {
  @apply border-t border-border-hairline pt-card-padding pb-card-padding text-body leading-body;
}

/* Reduce ⇒ the answer simply appears at full size, with no motion. */
@media (prefers-reduced-motion: reduce) {
  .accordion-panel,
  .accordion-panel__content,
  .accordion-item--open .accordion-panel__content {
    transition: none;
    transition-delay: 0ms;
  }
}
</style>
