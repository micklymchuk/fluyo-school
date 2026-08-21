<script setup lang="ts">
import type { Component } from 'vue'

type InfoBoardTheme = 'surface' | 'transparent'

type InfoBoardItem = {
  id: string
  icon: Component
  title?: string
  description: string
}

withDefaults(defineProps<{
  items: InfoBoardItem[]
  theme?: InfoBoardTheme
  iconSize?: number | string
  strokeWidth?: number | string
}>(), {
  iconSize: 44,
  strokeWidth: 1.4,
  theme: 'surface'
})
</script>

<template>
  <div class="info-board" :class="`info-board--${theme}`">
    <ul class="info-board__list">
      <li v-for="item in items" :key="item.id" class="info-board__item">
        <component
          :is="item.icon"
          class="info-board__icon"
          :width="iconSize"
          :height="iconSize"
          :stroke-width="strokeWidth"
          aria-hidden="true"
        />
        <p v-if="item.title" class="info-board__title">{{ item.title }}</p>
        <p class="info-board__description">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Board holding a row of icon + optional title + description facts. */
.info-board {
  @apply w-full;
}

/* Card tone, for a board that has to lift off the page. */
.info-board--surface {
  @apply rounded-card border border-border-hairline bg-surface px-6 py-10 sm:px-8;
}

/* Bare tone, for a board that sits inside another surface: rules only. */
.info-board--transparent {
  @apply px-2 py-2;
}

.info-board__list {
  @apply grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0;
}

.info-board__item {
  @apply flex flex-col items-center gap-3 text-center lg:px-5;
}

/* Hairline rules: stacked on mobile, between columns once the row is single-line. */
.info-board__item + .info-board__item {
  @apply border-t border-border-hairline pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:border-border-hairline;
}

.info-board__icon {
  @apply shrink-0 text-accent-burgundy;
}

.info-board__title {
  @apply font-display text-body font-bold text-text;
}

.info-board__description {
  @apply text-balance text-small text-text-muted;
}
</style>
