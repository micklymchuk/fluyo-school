<script setup lang="ts">
import { computed } from 'vue'
import HomeFactCard from '~/components/home/HomeFactCard.vue'
import HomeHarlequinBand from '~/components/home/HomeHarlequinBand.vue'
import UiSticker from '~/components/ui/UiSticker.vue'

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
    <HomeHarlequinBand>
      <div class="lessons__container">
        <div class="lessons__panel">
          <UiSticker
            class="lessons__sticker lessons__sticker--notebook"
            src="/images/home/sticker-notebook.png"
            :width="540"
            :height="640"
            :rotate="12"
          />
          <UiSticker
            class="lessons__sticker lessons__sticker--coffee"
            src="/images/home/sticker-coffee.png"
            :width="520"
            :height="504"
            :rotate="-6"
          />
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
    </HomeHarlequinBand>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.lessons {
  @apply bg-page text-text;
}

.lessons__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col gap-section-compact px-page-gutter;
}

/* Cream note panel floating on the pattern, stickers pinned to its corners.
   bg-surface: one card tone across the section, matching the fact cards. */
.lessons__panel {
  @apply relative mx-auto flex w-full max-w-2xl flex-col items-center gap-control-compact rounded-card border border-accent-burgundy bg-surface px-6 py-10 text-center sm:px-12;
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
  @apply absolute hidden sm:block;
}

.lessons__sticker--notebook {
  @apply -right-14 -top-12 w-32;
}

.lessons__sticker--coffee {
  @apply -bottom-12 -left-12 w-28;
}

.lessons__grid {
  @apply grid gap-component-gap md:grid-cols-3;
}
</style>
