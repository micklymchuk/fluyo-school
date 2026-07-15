<script setup lang="ts">
type StickerRotate = -12 | -6 | -3 | 0 | 3 | 6 | 12

withDefaults(defineProps<{
  src: string
  width: number
  height: number
  rotate?: StickerRotate
}>(), {
  rotate: 0
})
</script>

<template>
  <img
    class="sticker"
    :class="`sticker--r${rotate}`"
    :src="src"
    :width="width"
    :height="height"
    alt=""
    aria-hidden="true"
  >
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Decorative cutout image; display width and positioning come from the parent. */
.sticker {
  @apply pointer-events-none h-auto select-none;
}

.sticker--r0 {
  @apply rotate-0;
}

.sticker--r3 {
  @apply rotate-3;
}

.sticker--r6 {
  @apply rotate-6;
}

.sticker--r12 {
  @apply rotate-12;
}

.sticker--r-3 {
  @apply -rotate-3;
}

.sticker--r-6 {
  @apply -rotate-6;
}

.sticker--r-12 {
  @apply -rotate-12;
}
</style>
