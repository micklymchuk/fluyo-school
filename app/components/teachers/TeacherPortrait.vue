<script setup lang="ts">
type PortraitTone = 'well' | 'bare'

withDefaults(defineProps<{
  src: string
  alt: string
  tone?: PortraitTone
}>(), {
  tone: 'well'
})
</script>

<template>
  <!--
    Cut-out portrait (transparent PNG with the brand's hand-drawn burgundy outline baked in).
    `well` sits it on a blush panel for the team cards; `bare` floats it straight on the cream
    page for the founder, so the outline reads as a collage element.
  -->
  <figure class="portrait" :class="`portrait--${tone}`">
    <img
      class="portrait__img"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
    >
  </figure>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.portrait {
  @apply relative m-0 flex items-end justify-center;
}

.portrait__img {
  @apply block h-full w-full object-contain object-bottom;
}

/* Team-card treatment: blush well, stable tall aspect, portrait stands on the base. */
.portrait--well {
  @apply aspect-[4/5] overflow-hidden rounded-card bg-accent-subdued;
}

/* Founder treatment: no panel — the portrait floats on cream as a collage cut-out. */
.portrait--bare {
  @apply aspect-[3/4];
}
</style>
