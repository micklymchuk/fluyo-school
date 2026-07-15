<script setup lang="ts">
import { computed } from 'vue'
import HomeFactCard from '~/components/home/HomeFactCard.vue'

const { t } = useI18n()

const lessonItemIndexes = [0, 1, 2] as const
const lessonItems = computed(() => {
  return lessonItemIndexes.map((itemIndex) => ({
    id: itemIndex,
    title: t(`homeSections.lessons.items[${itemIndex}].title`),
    body: t(`homeSections.lessons.items[${itemIndex}].body`)
  }))
})
</script>

<template>
  <section id="lessons" class="lessons" aria-labelledby="home-lessons-title">
    <div class="lessons__band">
      <div class="lessons__container">
        <div class="lessons__panel">
          <img
            class="lessons__sticker lessons__sticker--notebook"
            src="/images/home/sticker-notebook.png"
            width="540"
            height="640"
            alt=""
            aria-hidden="true"
          >
          <img
            class="lessons__sticker lessons__sticker--coffee"
            src="/images/home/sticker-coffee.png"
            width="520"
            height="504"
            alt=""
            aria-hidden="true"
          >
          <p class="lessons__eyebrow">{{ t('homeSections.lessons.eyebrow') }}</p>
          <h2 id="home-lessons-title" class="lessons__title">{{ t('homeSections.lessons.title') }}</h2>
          <p class="lessons__description">{{ t('homeSections.lessons.description') }}</p>
        </div>

        <div class="lessons__grid">
          <HomeFactCard
            v-for="item in lessonItems"
            :key="item.id"
            :title="item.title"
            :body="item.body"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.lessons {
  @apply bg-page text-text;
}

/* Harlequin band: burgundy diamonds on cream, straight from the lessons post.
   A square conic checkerboard is stretched vertically for the elongated argyle shape. */
.lessons__band {
  @apply relative overflow-hidden bg-page py-section;
}

.lessons__band::before {
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
}

.lessons__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col gap-section-compact px-page-gutter;
}

/* Cream note panel floating on the pattern, stickers pinned to its corners. */
.lessons__panel {
  @apply relative mx-auto flex w-full max-w-2xl flex-col items-center gap-control-compact rounded-card bg-surface-muted px-6 py-10 text-center shadow-md sm:px-12;
}

.lessons__eyebrow {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.lessons__title {
  @apply font-display text-section-heading font-bold uppercase leading-tight tracking-display text-text;
}

.lessons__description {
  @apply max-w-xl text-body text-text-muted;
}

.lessons__sticker {
  @apply pointer-events-none absolute hidden h-auto sm:block;
}

.lessons__sticker--notebook {
  @apply -right-14 -top-12 w-32 rotate-12;
}

.lessons__sticker--coffee {
  @apply -bottom-12 -left-12 w-28 -rotate-6;
}

.lessons__grid {
  @apply grid gap-component-gap md:grid-cols-3;
}
</style>
