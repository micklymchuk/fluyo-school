<script setup lang="ts">
type WatermarkMode = 'cream' | 'inverse'

withDefaults(defineProps<{
  mode?: WatermarkMode
}>(), {
  mode: 'cream'
})

// Deliberate corner/edge placement: four uniform glyphs held to the outer band of the
// section (content at max-w-6xl/7xl never reaches the outer ~8% at desktop widths),
// so watermarks read as texture and never collide with card grids.
// Deterministic positions keep SSR and client renders identical.
const glyphs = [
  { top: '6%', left: '2%', rotate: '-10deg' },
  { top: '14%', left: '90%', rotate: '8deg' },
  { top: '68%', left: '4%', rotate: '6deg' },
  { top: '60%', left: '91%', rotate: '-8deg' }
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
  @apply absolute font-script text-watermark-glyph text-accent-burgundy;
  opacity: 0.06;
}

.watermark--inverse .watermark__glyph {
  @apply text-text-inverse;
}
</style>
