<script setup lang="ts" generic="T">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  items: T[]
  label: string
  inverse?: boolean
  slideLabel?: string
}>(), {
  inverse: false,
  slideLabel: 'Go to slide'
})

defineSlots<{
  slide(props: { item: T, index: number, active: boolean }): unknown
}>()

const activeIndex = ref(0)
const count = computed(() => props.items.length)

function go(index: number) {
  const max = count.value - 1
  activeIndex.value = Math.min(Math.max(index, 0), max)
}

function next() {
  go(activeIndex.value + 1)
}

function previous() {
  go(activeIndex.value - 1)
}

/* Horizontal swipe: commit a slide once the drag passes the threshold. */
const SWIPE_THRESHOLD = 40
const pointerStartX = ref(0)
const pointerTracking = ref(false)

function onPointerDown(event: PointerEvent) {
  pointerTracking.value = true
  pointerStartX.value = event.clientX
  // Capture so we still get pointerup even if the finger/cursor drifts off the viewport.
  ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
}

function onPointerUp(event: PointerEvent) {
  if (!pointerTracking.value) {
    return
  }

  pointerTracking.value = false
  const deltaX = event.clientX - pointerStartX.value

  if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
    return
  }

  if (deltaX < 0) {
    next()
  } else {
    previous()
  }
}
</script>

<template>
  <div
    class="carousel"
    role="group"
    aria-roledescription="carousel"
    :aria-label="label"
    tabindex="0"
    @keydown.left.prevent="previous"
    @keydown.right.prevent="next"
  >
    <div
      class="carousel__viewport"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointercancel="pointerTracking = false"
    >
      <ul
        class="carousel__track"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="carousel__slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} / ${count}`"
          :aria-hidden="index === activeIndex ? undefined : 'true'"
        >
          <slot name="slide" :item="item" :index="index" :active="index === activeIndex" />
        </li>
      </ul>
    </div>

    <ul
      v-if="count > 1"
      class="carousel__dots"
      :class="{ 'carousel__dots--inverse': inverse }"
    >
      <li v-for="(item, index) in items" :key="index">
        <button
          type="button"
          class="carousel__dot"
          :class="{ 'carousel__dot--active': index === activeIndex }"
          :aria-label="`${slideLabel} ${index + 1}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="go(index)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.carousel {
  @apply flex flex-col gap-component-gap outline-none;
}

/* Clips neighbouring slides; the slide padding keeps the stamp perforations off the clip edge.
   touch-action pan-y lets a vertical page scroll through while we own the horizontal swipe;
   select-none stops the quote text from highlighting mid-drag. */
.carousel__viewport {
  @apply select-none overflow-hidden;
  touch-action: pan-y;
}

.carousel__track {
  @apply flex transition-transform duration-medium ease-standard;
}

.carousel__slide {
  @apply w-full shrink-0 px-2 py-2;
}

.carousel__dots {
  @apply flex list-none flex-wrap items-center justify-center gap-control-compact p-0;
}

.carousel__dot {
  @apply block h-2.5 w-2.5 rounded-pill bg-accent-subdued transition-[width,background-color] duration-short ease-standard;
}

.carousel__dot--active {
  @apply w-6 bg-accent-burgundy;
}

/* On the burgundy band the dots flip to cream so they read against burgundy. */
.carousel__dots--inverse .carousel__dot {
  @apply bg-accent-rose;
}

.carousel__dots--inverse .carousel__dot--active {
  @apply bg-text-inverse;
}

@media (prefers-reduced-motion: reduce) {
  .carousel__track {
    @apply transition-none;
  }
}
</style>
