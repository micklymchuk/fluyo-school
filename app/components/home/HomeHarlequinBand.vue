<template>
  <div class="harlequin-band">
    <slot />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Harlequin band: burgundy diamonds on cream, straight from the lessons post.
   A square conic checkerboard is stretched vertically for the elongated argyle shape. */
.harlequin-band {
  @apply relative overflow-hidden bg-page py-section;
}

.harlequin-band::before {
  --diamond-size: 5.25rem;
  --diamond-stretch: 1.6;

  content: '';

  @apply absolute inset-x-0 top-0;
  height: calc(100% / var(--diamond-stretch));
  background: conic-gradient(
      from 45deg,
      var(--color-accent-burgundy) 0 25%,
      transparent 0 50%,
      var(--color-accent-burgundy) 0 75%,
      transparent 0
    )
    50% 0 / var(--diamond-size) var(--diamond-size);
  transform: scaleY(var(--diamond-stretch));
  transform-origin: top;
  /* Deliberate bottom edge: the pattern dissolves over its last diamond row instead
     of hard-cutting mid-diamond against whatever band follows. The fade distance is
     pre-transform, so scaleY stretches it to exactly one visual diamond row at any width. */
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - var(--diamond-size)), transparent);
  mask-image: linear-gradient(to bottom, black calc(100% - var(--diamond-size)), transparent);
}
</style>
