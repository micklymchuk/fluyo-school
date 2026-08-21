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
  /** Seconds for one leg of the ping-pong. 0 keeps the mark still. */
  breathe?: number
  /** Seconds of phase offset; negative starts the mark part-way through a leg. */
  phase?: number
  /** Fraction of full size the mark grows in from. */
  fromScale?: number
  tone?: WatermarkTone
}>(), {
  breathe: 0,
  fromScale: 0.55,
  inset: 1.5,
  opacity: 0.12,
  phase: 0,
  shape: 'star',
  side: 'right',
  size: 4,
  tone: 'burgundy',
  y: 50
})

// A mark must never sit under the copy, and never be cut off by the edge of the
// section either. Both are geometry, not luck, and neither measures anything —
// so both hold on the server and at every viewport width.
//
// Horizontally the mark is confined to the empty gutter beside the centred
// content column: it hangs off its own edge and may grow no wider than
// (section - content) / 2 minus its offset. Wide screens give it the full size,
// a narrowing window shrinks it, and once the content column fills the section
// the width reaches zero and the mark is simply not there. That is why the width
// is CSS math rather than a JS number: the page has no fixed width to solve for.
//
// Vertically it has the whole section to itself, because the gutter it lives in
// holds no content at any height:
//  - the horizontal anchor is an offset from one edge, not a centred percentage,
//    so the mark's own width can never carry it past that edge;
//  - the vertical position is the wanted centre, clamped into the range where
//    the whole mark still fits. `max()` inside keeps the ceiling above the floor
//    in a box too short for the mark, where clamp() would otherwise flip;
//  - the max-width/max-height in the stylesheet then shrink a mark that is
//    taller than its box, which `mask-size: contain` handles without drift.
const style = computed(() => {
  const height = props.size / aspects[props.shape]
  // A still mark carries no timing variables at all, so the markup says plainly
  // which marks move.
  const motion = props.breathe > 0
    ? {
        '--watermark-breathe': `${props.breathe.toFixed(2)}s`,
        '--watermark-from-scale': props.fromScale.toFixed(3),
        '--watermark-phase': `${props.phase.toFixed(2)}s`
      }
    : undefined

  return {
    // The peak opacity is a variable, not a declaration: a running animation
    // outranks any inline `opacity`, so the keyframes have to be able to read the
    // per-mark value or every mark would breathe to the same strength.
    '--watermark-opacity': props.opacity.toFixed(3),
    ...motion,
    '--watermark-src': `url("/images/svg/${props.shape}.svg")`,
    [props.side]: `${props.inset.toFixed(2)}rem`,
    height: `${height.toFixed(3)}rem`,
    // min()/max() clamp this into [0, gutter - inset]; a negative result would be
    // an invalid width, which CSS resolves to 0 — exactly the wanted outcome.
    width: `min(${props.size.toFixed(3)}rem, max(0rem, (100% - var(--watermark-content, 72rem)) / 2 - ${props.inset.toFixed(2)}rem))`,
    top: `clamp(${edge}rem, calc(${props.y.toFixed(2)}% - ${(height / 2).toFixed(3)}rem), max(${edge}rem, calc(100% - ${height.toFixed(3)}rem - ${edge}rem)))`
  }
})
</script>

<template>
  <span
    class="watermark"
    :class="[`watermark--${tone}`, { 'watermark--breathing': breathe > 0 }]"
    :style="style"
    aria-hidden="true"
  />
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Purely decorative and inert: absolute, unhittable, and carrying no text, so
   dropping one into any positioned box costs nothing in layout or a11y. The
   colour comes from `background`, which the mask then cuts the shape out of. */
.watermark {
  @apply pointer-events-none absolute block select-none;
  /* Never taller than the box it decorates, so it cannot be clipped by the
     section edge; the width is already held inside the gutter. `mask-size:
     contain` keeps the shape's ratio whenever either cap bites, and centres it
     in the box, so a shrunk mark stays on the band it was placed on. */
  max-height: calc(100% - 1rem);
  opacity: var(--watermark-opacity, 0.12);
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

/* Ping-pong, not a loop: one leg grows the mark in from small and then holds it,
   and `alternate` replays the same keyframes backwards for the way out — so
   appearing and disappearing are mirror images of each other rather than two
   animations that have to be kept in sync.
   Only opacity and transform move, both compositor properties, so a page-worth
   of marks breathing at once costs no layout or paint work. Scaling is safe next
   to the no-crop geometry above: the mark scales about its own centre and never
   past 1, so it can only ever pull further inside its box. */
.watermark--breathing {
  animation: watermark-breathe var(--watermark-breathe) var(--ease-standard) var(--watermark-phase) infinite alternate;
}

@keyframes watermark-breathe {
  from {
    opacity: 0;
    transform: scale(var(--watermark-from-scale));
  }

  /* The hold is what stops this reading as a blink: each leg spends most of its
     back half at rest, so the eye meets a settled mark far more often than a
     moving one. */
  55%,
  100% {
    opacity: var(--watermark-opacity);
    transform: scale(1);
  }
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

/* Must outrank the rules above, so it stays last. Reduce ⇒ every mark simply
   sits at its full size and strength; the base rule already puts it there. */
@media (prefers-reduced-motion: reduce) {
  .watermark--breathing {
    animation: none;
  }
}
</style>
