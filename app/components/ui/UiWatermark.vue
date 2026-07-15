<script setup lang="ts">
type WatermarkMode = 'cream' | 'inverse'

withDefaults(defineProps<{
  mode?: WatermarkMode
}>(), {
  mode: 'cream'
})

// Fixed scatter: deterministic positions keep SSR and client renders identical.
const glyphs = [
  { top: '4%', left: '6%', rotate: '-14deg', size: '5.5rem' },
  { top: '18%', left: '78%', rotate: '10deg', size: '7rem' },
  { top: '42%', left: '30%', rotate: '-6deg', size: '4.5rem' },
  { top: '55%', left: '88%', rotate: '-18deg', size: '5rem' },
  { top: '68%', left: '10%', rotate: '12deg', size: '6.5rem' },
  { top: '82%', left: '55%', rotate: '-10deg', size: '5.5rem' }
]
</script>

<template>
  <!-- Parent must provide position: relative and keep content stacked above. -->
  <div
    class="watermark"
    :class="{ 'watermark--inverse': mode === 'inverse' }"
    aria-hidden="true"
  >
    <span
      v-for="glyph in glyphs"
      :key="`${glyph.top}-${glyph.left}`"
      class="watermark__glyph"
      :style="{
        top: glyph.top,
        left: glyph.left,
        fontSize: glyph.size,
        transform: `rotate(${glyph.rotate})`
      }"
    >F</span>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.watermark {
  @apply pointer-events-none absolute inset-0 overflow-hidden;
}

.watermark__glyph {
  @apply absolute font-script leading-none text-accent-burgundy;
  opacity: 0.06;
}

.watermark--inverse .watermark__glyph {
  @apply text-text-inverse;
}
</style>
