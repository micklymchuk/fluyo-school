<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: string
  label?: string
  spikes?: number
}>(), {
  label: undefined,
  spikes: 16
})

// Starburst seal: alternate outer/inner radius around the centre to cut the spiked edge.
const polygon = computed(() => {
  const centre = 50
  const outer = 50
  const inner = 42
  const points: string[] = []

  for (let i = 0; i < props.spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (Math.PI * i) / props.spikes - Math.PI / 2
    const x = centre + radius * Math.cos(angle)
    const y = centre + radius * Math.sin(angle)
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
  }

  return points.join(' ')
})
</script>

<template>
  <span class="discount-badge" role="img" :aria-label="label ? `${value} — ${label}` : value">
    <svg class="discount-badge__burst" viewBox="0 0 100 100" aria-hidden="true">
      <polygon :points="polygon" />
    </svg>
    <span class="discount-badge__content">
      <span class="discount-badge__value">{{ value }}</span>
      <span v-if="label" class="discount-badge__label">{{ label }}</span>
    </span>
  </span>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.discount-badge {
  @apply relative inline-flex size-16 items-center justify-center sm:size-25;
}

.discount-badge__burst {
  @apply absolute inset-0 size-full;

  fill: var(--color-accent-burgundy, #7a1e2b);
}

/* max-w keeps the copy inside the inner circle so it never spills onto the spikes. */
.discount-badge__content {
  @apply relative flex max-w-[60%] flex-col items-center text-center leading-none text-text-inverse;
}

.discount-badge__value {
  @apply font-display text-small font-bold sm:text-body;
}

.discount-badge__label {
  @apply text-[0.42rem] font-semibold uppercase leading-[1.1] tracking-tight sm:text-[0.52rem];
}
</style>
