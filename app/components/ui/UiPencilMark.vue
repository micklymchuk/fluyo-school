<script setup lang="ts">
import { computed, useId } from 'vue'

type PencilMarkName = 'underline' | 'circle' | 'loop' | 'arrow' | 'curl' | 'burst'
type PencilTone = 'burgundy' | 'graphite' | 'rose' | 'inverse'

interface PencilStroke {
  d: string
  /** Stroke width in viewBox units. */
  width: number
  opacity: number
  /** ms into the mark's own sequence when this stroke starts drawing. */
  offset: number
  duration: number
}

interface PencilShape {
  viewBox: string
  /** Stretch to the annotated phrase's box (underline, circle) or keep its own shape (arrow). */
  stretch: boolean
  /** Fixed so the grain is identical on the server and the client. */
  seed: number
  strokes: PencilStroke[]
}

// Hand-authored geometry, not generated: every path wobbles irregularly and
// overshoots its ends, because a hand never starts or stops exactly on the word.
// A smooth bezier reads as vector ink no matter what texture you put on it.
const shapes: Record<PencilMarkName, PencilShape> = {
  // Two passes — a light broad sweep, then a darker narrow one landing slightly
  // off it. That offset is what makes graphite look built up rather than printed.
  underline: {
    viewBox: '0 0 300 14',
    stretch: true,
    seed: 4,
    strokes: [
      { d: 'M3 8C47 4.8 91 9.4 140 6.6C189 3.9 244 8.8 298 4.8', width: 5.4, opacity: 0.3, offset: 0, duration: 520 },
      { d: 'M6 10.4C52 7.2 96 11.6 145 8.6C194 5.6 243 10.6 295 7.2', width: 3.2, opacity: 0.95, offset: 90, duration: 560 }
    ]
  },
  // One continuous loop that carries on past where it started — the giveaway of
  // a word circled by hand.
  circle: {
    viewBox: '0 0 200 104',
    stretch: true,
    seed: 9,
    strokes: [
      {
        d: 'M42 84C17 71 10 43 33 25C57 7 110 3 150 12C184 20 195 40 186 60C177 80 138 95 94 95C62 95 37 87 25 72C18 63 18 53 24 44',
        width: 3.4,
        opacity: 0.95,
        offset: 0,
        duration: 1040
      }
    ]
  },
  // A ring for a block rather than a word, shaped as a squircle — a superellipse
  // of roughly n=3 — not an ellipse. That choice is load-bearing, not cosmetic: a
  // card's text corner sits at about (0.82a, 0.65b) of the ring, where an ellipse
  // (n=2) gives 0.82^2 + 0.65^2 = 1.11 > 1 and so cuts through the copy, while
  // n=3 gives 0.84 < 1 and clears it. Reaching the same clearance with an ellipse
  // would need ~1.4x the size, which would swallow the neighbouring card.
  loop: {
    viewBox: '0 0 300 160',
    stretch: true,
    seed: 12,
    strokes: [
      {
        d: 'M72 7C118 4 178 5 228 7C272 7 293 12 293 48C294 72 294 96 292 116C292 146 270 153 230 153C180 156 118 156 70 153C30 152 8 145 8 112C6 88 7 62 9 44C10 14 32 7 72 6C96 5 118 5 140 5',
        width: 3.2,
        opacity: 0.95,
        offset: 0,
        duration: 1120
      }
    ]
  },
  // Three straight rays flicking outward, for putting emphasis beside something
  // rather than around it. They fan from a virtual origin but start well clear of
  // it: a burst whose rays converge reads as a star, not as emphasis.
  //
  // One stroke per ray, uniform width. A stroke that widens toward its tip is not
  // available here: an SVG stroke carries ONE width for its whole length, so a
  // taper would mean either stacking several strokes per ray or switching to a
  // filled shape revealed through a mask.
  burst: {
    viewBox: '0 0 99 91',
    stretch: false,
    seed: 21,
    strokes: [
      { d: 'M11.6 61.8L6.0 16.1', width: 3.0, opacity: 0.95, offset: 0, duration: 190 },
      { d: 'M35.1 65.2L79.7 6.0', width: 3.1, opacity: 0.95, offset: 105, duration: 250 },
      { d: 'M45.3 84.0L92.9 72.2', width: 3.0, opacity: 0.95, offset: 215, duration: 195 }
    ]
  },
  // A curled arrow after a brush-stroke arrow, rotated 180 degrees so it reads
  // left-pointing (a rotation, not a mirror — that keeps the spiral's handedness).
  // Short tail top-right, one loop above the line, long sweep to a big head.
  //
  // Two details carry the form, and both are load-bearing:
  //  - the loop TIGHTENS (r 30 -> 20). An opening spiral puts the exit above the
  //    tail, so the sweep runs alongside it and never crosses; a tightening one
  //    brings the exit out underneath, which forces the crossing.
  //  - the loop and the sweep curve in OPPOSITE senses, and that S-transition is
  //    what gives the stroke its swing.
  //
  // The curve is a Catmull-Rom spline through evenly spaced anchors, so every
  // join's control points are collinear with their anchor and the stroke cannot
  // kink. Hand-picked bezier controls were what made an earlier version read as
  // crooked: the breaks land exactly on the segment joins. If you retouch this,
  // keep the joins tangent-continuous.
  //
  // Aspect-preserving on purpose — stretching this one would flatten the loop
  // into an ellipse and lose the whole gesture.
  curl: {
    viewBox: '0 0 200 107',
    stretch: false,
    seed: 15,
    strokes: [
      {
        d: 'M184.0 58.6C182.5 58.8 178.0 59.5 175.0 59.9C172.0 60.3 168.8 60.7 165.8 61.1C162.7 61.4 159.8 61.8 156.8 62.2C153.7 62.5 150.6 63.0 147.5 62.9C144.5 62.9 141.4 62.7 138.5 61.8C135.7 60.9 132.7 59.4 130.3 57.6C127.9 55.8 125.8 53.4 124.3 50.9C122.7 48.4 121.6 45.4 121.1 42.5C120.6 39.5 120.6 36.1 121.3 33.2C121.9 30.3 123.2 27.4 125.0 25.0C126.8 22.6 129.3 20.3 131.8 18.8C134.4 17.3 137.5 16.3 140.4 16.1C143.4 15.8 146.8 16.3 149.6 17.3C152.3 18.3 155.1 20.2 157.0 22.3C159.0 24.4 160.7 27.3 161.5 30.1C162.2 33.0 162.4 36.5 161.7 39.3C161.0 42.2 159.5 45.1 157.5 47.3C155.5 49.4 152.5 51.1 149.8 52.3C147.0 53.4 143.9 53.8 140.9 54.4C138.0 54.9 135.0 55.3 132.0 55.8C128.9 56.2 125.8 56.7 122.8 57.3C119.8 57.8 116.9 58.3 113.9 58.8C110.8 59.4 107.7 60.0 104.7 60.6C101.7 61.1 98.8 61.7 95.8 62.3C92.8 63.0 89.7 63.6 86.7 64.3C83.7 64.9 80.8 65.6 77.9 66.3C74.9 67.0 72.0 67.7 69.0 68.4C66.1 69.1 63.0 69.9 60.0 70.6C57.1 71.4 54.2 72.2 51.2 72.9C48.3 73.7 45.2 74.6 42.3 75.4C39.3 76.2 36.5 77.1 33.6 77.9C30.6 78.8 27.6 79.7 24.7 80.6C21.7 81.5 17.4 82.9 16.0 83.3',
        width: 3,
        opacity: 0.95,
        offset: 0,
        duration: 1010
      },
      { d: 'M16.0 83.3C26.6 87.3 38.3 89.8 49.2 90.5', width: 3.3, opacity: 0.95, offset: 930, duration: 210 },
      { d: 'M16.0 83.3C25.0 76.4 33.3 67.9 39.7 59.0', width: 3.3, opacity: 0.95, offset: 1030, duration: 210 }
    ]
  },
  // Shaft first; the two head strokes flick out from the tip once it has landed.
  // Drawing all three at once is the single most artificial-looking mistake.
  arrow: {
    viewBox: '0 0 150 70',
    stretch: false,
    seed: 6,
    strokes: [
      { d: 'M7 10C28 19 49 33 72 44C92 53 111 58 131 61', width: 3.2, opacity: 0.95, offset: 0, duration: 470 },
      { d: 'M132 61C124 56 118 49 113 40', width: 3, opacity: 0.95, offset: 420, duration: 190 },
      { d: 'M132 61C123 62 113 61 103 57', width: 3, opacity: 0.95, offset: 500, duration: 190 }
    ]
  }
}

const props = withDefaults(defineProps<{
  mark?: PencilMarkName
  tone?: PencilTone
  /** ms to wait after the mark scrolls into view before the first stroke starts. */
  delay?: number
}>(), {
  delay: 0,
  mark: 'underline',
  tone: 'burgundy'
})

const grainId = `pencil-grain-${useId()}`
const shape = computed(() => shapes[props.mark])

// Purely decorative, so it must never touch layout: the caller positions it, and
// `visible` comes from the same shared observer that drives UiReveal.
const { el, visible } = useReveal()

function strokeStyle(stroke: PencilStroke) {
  return {
    '--pencil-delay': `${props.delay + stroke.offset}ms`,
    '--pencil-duration': `${stroke.duration}ms`,
    '--pencil-opacity': String(stroke.opacity)
  }
}
</script>

<template>
  <svg
    ref="el"
    class="pencil-mark"
    :class="[`pencil-mark--${tone}`, { 'pencil-mark--drawn': visible }]"
    :viewBox="shape.viewBox"
    :preserveAspectRatio="shape.stretch ? 'none' : 'xMidYMid meet'"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <!-- Graphite: displace the stroke edges so they go ragged, then punch the
           same noise through its alpha so the fill breaks up like paper tooth.
           One filter per instance — fine for a handful of marks, but this is the
           expensive part of the effect, so don't scatter dozens across a page. -->
      <filter :id="grainId" x="-12%" y="-30%" width="124%" height="160%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.5"
          numOctaves="2"
          :seed="shape.seed"
          result="grain"
        />
        <feColorMatrix
          in="grain"
          type="matrix"
          values="0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  1.6 0 0 0 0.05"
          result="grainAlpha"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="grain"
          scale="1.3"
          xChannelSelector="R"
          yChannelSelector="G"
          result="rough"
        />
        <feComposite in="rough" in2="grainAlpha" operator="in" />
      </filter>
    </defs>

    <g :filter="`url(#${grainId})`">
      <path
        v-for="(stroke, index) in shape.strokes"
        :key="index"
        class="pencil-mark__stroke"
        :d="stroke.d"
        :stroke-width="stroke.width"
        :style="strokeStyle(stroke)"
        pathLength="1"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Decorative overlay: absolute and inert, so dropping one into a heading costs
   nothing in layout. The caller owns the offsets and the size. overflow-visible
   because the grain filter pushes pixels past the viewBox edge. */
.pencil-mark {
  @apply pointer-events-none absolute select-none overflow-visible;
}

/* pathLength="1" normalizes every path to one unit, so the dash maths needs no
   getTotalLength() call — no measurement JS, nothing to mismatch on hydration. */
.pencil-mark__stroke {
  opacity: var(--pencil-opacity, 1);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset var(--pencil-duration, 520ms) var(--ease-pencil) var(--pencil-delay, 0ms);
}

.pencil-mark--drawn .pencil-mark__stroke {
  stroke-dashoffset: 0;
}

.pencil-mark--burgundy .pencil-mark__stroke {
  @apply stroke-accent-burgundy;
}

.pencil-mark--rose .pencil-mark__stroke {
  @apply stroke-accent-rose;
}

/* The literal-graphite option, for marks that should read as a real pencil
   rather than a brand accent. */
.pencil-mark--graphite .pencil-mark__stroke {
  @apply stroke-text;
}

/* For marks sitting on the burgundy band, where a burgundy stroke is invisible. */
.pencil-mark--inverse .pencil-mark__stroke {
  @apply stroke-text-inverse;
}

/* Both fallbacks must outrank the rules above, so they stay last. */

/* Reduce ⇒ the mark is simply already drawn. */
@media (prefers-reduced-motion: reduce) {
  .pencil-mark__stroke {
    stroke-dashoffset: 0;
    transition: none;
  }
}

/* No scripting ⇒ nothing will ever add the drawn class, so never hide it. */
@media (scripting: none) {
  .pencil-mark__stroke {
    stroke-dashoffset: 0;
  }
}
</style>
