<script setup lang="ts">
import { computed } from 'vue'

type WatermarkShape = 'star' | 'star-outlined' | 'star-line' | 'double-star'
type WatermarkTone = 'burgundy' | 'rose' | 'subdued' | 'inverse'

// The asset is used as a CSS mask, not as an <img>. Every file in
// public/images/svg is hard-coded burgundy (#7A1E2C), and masking is what lets
// the same file also sit on the burgundy band in cream — plus it keeps the mark
// on the brand tokens instead of a colour frozen into the file.
//
// Intrinsic size of each file, kept as a ratio: the element's box must carry the
// asset's own ratio, otherwise `mask-size: contain` letterboxes the shape inside
// it and the mark drifts away from where the caller placed it.
const aspects: Record<WatermarkShape, number> = {
  'double-star': 261 / 257,
  'star': 40 / 39,
  'star-line': 306 / 39,
  'star-outlined': 77 / 77
}

// Distance kept between a mark and the edge of the box it decorates.
const edge = 0.5

const props = withDefaults(defineProps<{
  shape?: WatermarkShape
  /** Width in rem; the height follows the asset's own ratio. */
  size?: number
  /** Which gutter the mark hangs in. */
  side?: 'left' | 'right'
  /** Distance from that gutter's edge, in rem. */
  inset?: number
  /** Vertical centre of the mark, in % of the positioned parent. */
  y?: number
  opacity?: number
  tone?: WatermarkTone
}>(), {
  inset: 1.5,
  opacity: 0.12,
  shape: 'star',
  side: 'right',
  size: 4,
  tone: 'burgundy',
  y: 50
})

// A mark must never be cut off by the edge of the section it decorates: the next
// section paints its own opaque background over anything that bleeds out, so a
// mark crossing the boundary reads as sliced in half rather than as bleeding.
// Nothing here measures the box, so it holds on the server too:
//  - the horizontal anchor is an offset from one edge, not a centred percentage,
//    so the mark's own width can never carry it past that edge;
//  - the vertical position is the wanted centre, clamped into the range where
//    the whole mark still fits. `max()` inside keeps the ceiling above the floor
//    in a box too short for the mark, where clamp() would otherwise flip;
//  - the max-width/max-height in the stylesheet then shrink a mark that is
//    taller than its box, which `mask-size: contain` handles without drift.
const style = computed(() => {
  const height = props.size / aspects[props.shape]

  return {
    '--watermark-src': `url("/images/svg/${props.shape}.svg")`,
    [props.side]: `${props.inset.toFixed(2)}rem`,
    height: `${height.toFixed(3)}rem`,
    opacity: props.opacity.toFixed(3),
    top: `clamp(${edge}rem, calc(${props.y.toFixed(2)}% - ${(height / 2).toFixed(3)}rem), max(${edge}rem, calc(100% - ${height.toFixed(3)}rem - ${edge}rem)))`,
    width: `${props.size.toFixed(3)}rem`
  }
})
</script>

<template>
  <span class="watermark" :class="`watermark--${tone}`" :style="style" aria-hidden="true" />
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Purely decorative and inert: absolute, unhittable, and carrying no text, so
   dropping one into any positioned box costs nothing in layout or a11y. The
   colour comes from `background`, which the mask then cuts the shape out of. */
.watermark {
  @apply pointer-events-none absolute block select-none;
  /* Never wider or taller than the box it decorates, so it cannot be clipped by
     the section edge. `mask-size: contain` keeps the shape's ratio when this
     bites. */
  max-height: calc(100% - 1rem);
  max-width: calc(100% - 1rem);
  mask-image: var(--watermark-src);
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: contain;
  /* Safari below 15.4 only knows the prefixed properties; without these the
     mask is ignored and the mark paints as a solid rectangle. */
  -webkit-mask-image: var(--watermark-src);
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: contain;
}

.watermark--burgundy {
  @apply bg-accent-burgundy;
}

.watermark--rose {
  @apply bg-accent-rose;
}

.watermark--subdued {
  @apply bg-accent-subdued;
}

/* For marks on the burgundy band, where a burgundy mark is invisible. */
.watermark--inverse {
  @apply bg-text-inverse;
}
</style>
