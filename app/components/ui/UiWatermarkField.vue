<script setup lang="ts">
import { computed } from 'vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'

type WatermarkShape = 'star' | 'star-outlined' | 'star-line' | 'double-star'
type WatermarkTone = 'burgundy' | 'rose' | 'subdued' | 'inverse'

interface ShapeSpec {
  /** Width range in rem — a star reads at 3rem, the double star needs 10. */
  minSize: number
  maxSize: number
}

// Size only: marks are never rotated, so each asset keeps the axis it was drawn
// on and only its scale varies between fields.
const shapeSpecs: Record<WatermarkShape, ShapeSpec> = {
  'double-star': { maxSize: 13, minSize: 7 },
  'star': { maxSize: 4.2, minSize: 2.2 },
  // Sized for a caller placing it by hand — the ruled line is deliberately out
  // of the scatter pool below, because a rule running into the reading column
  // reads as a strikethrough rather than as a watermark.
  'star-line': { maxSize: 17, minSize: 10 },
  'star-outlined': { maxSize: 6, minSize: 3 }
}

// Draw order, and the weighting at once: the small solid star appears three
// times because a field of nothing but 13rem double stars is wallpaper, not a
// watermark.
const pool: WatermarkShape[] = [
  'star',
  'star-outlined',
  'double-star',
  'star',
  'star-outlined',
  'star',
  'double-star'
]

const props = withDefaults(defineProps<{
  /** Anything stable and section-specific; the whole scatter is derived from it. */
  seed: string
  count?: number
  /** Extra marks for the right gutter, on top of `count`. */
  rightExtra?: number
  tone?: WatermarkTone
}>(), {
  count: 3,
  rightExtra: 2,
  tone: 'burgundy'
})

// FNV-1a over the seed, then mulberry32. Every number in a field comes from its
// seed string and nothing else, so the scatter looks random yet renders
// identically on the server and the client. Math.random() here would mean a
// hydration mismatch on every single mark.
function hashSeed(seed: string) {
  let hash = 0x811c9dc5

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 0x01000193)
  }

  return hash >>> 0
}

function randomizer(state: number) {
  let value = state

  return () => {
    value = (value + 0x6d2b79f5) >>> 0
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)

    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

const marks = computed(() => {
  const hash = hashSeed(props.seed)
  const next = randomizer(hash)
  // Marks hang in the gutters either side of the centred reading column, anchored
  // to their own edge rather than centred on a percentage — that is what keeps a
  // wide mark from being sliced off by the section boundary.
  const mark = (id: string, side: 'left' | 'right', y: number) => {
    const shape = pool[Math.floor(next() * pool.length)] ?? 'star'
    const spec = shapeSpecs[shape]

    return {
      id,
      inset: 0.75 + next() * 3.5,
      opacity: 0.07 + next() * 0.08,
      shape,
      side,
      size: spec.minSize + next() * (spec.maxSize - spec.minSize),
      y
    }
  }

  // One mark per horizontal band, so the scatter spreads down the section
  // instead of piling into one corner. One band in three goes left; the rest
  // weight the right edge, and the hash picks which band that is so
  // neighbouring sections do not march in step.
  const leftBand = hash % 3
  const scatter = Array.from({ length: Math.max(props.count, 0) }, (_, index) => {
    const side = index % 3 === leftBand ? 'left' : 'right'

    return mark(`band-${index}`, side, ((index + 0.18 + next() * 0.64) / Math.max(props.count, 1)) * 100)
  })

  // The right gutter then gets a second, denser pass, offset roughly half a band
  // from the first so the extra marks interleave with it rather than double up.
  const extras = Array.from({ length: Math.max(props.rightExtra, 0) }, (_, index) => {
    return mark(`right-${index}`, 'right', ((index + 0.55 + next() * 0.35) / Math.max(props.rightExtra, 1)) * 100)
  })

  return [...scatter, ...extras]
})

// Fades in with the section it decorates, off the same shared observer as
// UiReveal — one observer target per field, not one per mark.
const { el, visible } = useReveal()
</script>

<template>
  <div
    ref="el"
    class="watermark-field"
    :class="{ 'watermark-field--visible': visible }"
    aria-hidden="true"
  >
    <UiWatermark
      v-for="mark in marks"
      :key="mark.id"
      :shape="mark.shape"
      :size="mark.size"
      :side="mark.side"
      :inset="mark.inset"
      :y="mark.y"
      :opacity="mark.opacity"
      :tone="tone"
    />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Fills its positioned parent without touching layout. overflow-clip and not
   overflow-hidden: marks are placed to bleed past the section edges, and a
   scroll container here would let a wide mark push the page sideways. */
.watermark-field {
  @apply pointer-events-none absolute inset-0 select-none overflow-clip;
  opacity: 0;
  transition: opacity var(--transition-duration-long) var(--ease-standard);
}

/* Narrow screens have no gutter to hide in, so the marks sit behind the copy —
   held back further there to keep the text the strongest thing on the page. */
@media (max-width: 40rem) {
  .watermark-field {
    --watermark-field-opacity: 0.55;
  }
}

.watermark-field--visible {
  opacity: var(--watermark-field-opacity, 1);
}

/* Both fallbacks must outrank the rules above, so they stay last. */

/* Reduce ⇒ the marks are simply there. */
@media (prefers-reduced-motion: reduce) {
  .watermark-field {
    opacity: var(--watermark-field-opacity, 1);
    transition: none;
  }
}

/* No scripting ⇒ nothing will ever add the visible class, so never hide them. */
@media (scripting: none) {
  .watermark-field {
    opacity: var(--watermark-field-opacity, 1);
  }
}
</style>
