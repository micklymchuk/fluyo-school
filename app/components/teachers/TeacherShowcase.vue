<script setup lang="ts">
import { computed } from 'vue'
import FounderIntro from '~/components/teachers/FounderIntro.vue'
import TeacherPortrait from '~/components/teachers/TeacherPortrait.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiUnderlineList from '~/components/ui/UiUnderlineList.vue'

const props = withDefaults(defineProps<{
  scriptName: string
  role: string
  description: string
  focusTitle: string
  focusItems: string[]
  photoSrc: string
  photoAlt: string
  eyebrow?: string
  headingId?: string
  level?: 'h1' | 'h2' | 'h3'
  sparkles?: boolean
  reversed?: boolean
}>(), {
  eyebrow: undefined,
  headingId: undefined,
  level: 'h2',
  sparkles: false,
  reversed: false
})

// Two balanced columns, matching the founder post's directions list.
const focusColumns = computed(() => {
  const midpoint = Math.ceil(props.focusItems.length / 2)
  return [props.focusItems.slice(0, midpoint), props.focusItems.slice(midpoint)]
})
</script>

<template>
  <div class="showcase">
    <div class="showcase__intro">
      <UiEyebrowPill v-if="eyebrow" :label="eyebrow" />
      <FounderIntro
        :heading-id="headingId"
        :level="level"
        :script-name="scriptName"
        :role="role"
        :sparkles="sparkles"
      />
    </div>

    <div class="showcase__grid" :class="{ 'showcase__grid--reversed': reversed }">
      <div class="showcase__info">
        <p class="showcase__description">{{ description }}</p>

        <div v-if="focusItems.length" class="showcase__focus" role="group" :aria-label="focusTitle">
          <h3 class="showcase__focus-title">{{ focusTitle }}</h3>
          <div class="showcase__focus-columns">
            <UiUnderlineList
              v-for="(column, columnIndex) in focusColumns"
              :key="columnIndex"
              :items="column"
            />
          </div>
        </div>
      </div>

      <div class="showcase__portrait">
        <TeacherPortrait :src="photoSrc" :alt="photoAlt" tone="bare" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.showcase {
  @apply flex flex-col gap-section;
}

.showcase__intro {
  @apply flex flex-col items-center gap-component-gap;
}

.showcase__grid {
  @apply grid items-center gap-component-gap md:grid-cols-[minmax(0,1fr)_minmax(15rem,24rem)];
}

/* Alternate the portrait side so stacked profiles keep a collage rhythm. */
.showcase__grid--reversed {
  @apply md:grid-cols-[minmax(15rem,24rem)_minmax(0,1fr)];
}

.showcase__grid--reversed .showcase__info {
  @apply md:order-2;
}

.showcase__grid--reversed .showcase__portrait {
  @apply md:order-1;
}

.showcase__info {
  @apply flex flex-col gap-component-gap;
}

.showcase__description {
  @apply text-body text-text-muted;
}

.showcase__focus {
  @apply rounded-card border border-border-hairline bg-surface p-card-padding;
}

.showcase__focus-title {
  @apply mb-4 text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.showcase__focus-columns {
  @apply grid gap-3 sm:grid-cols-2;
}

.showcase__portrait {
  @apply mx-auto w-full max-w-sm md:max-w-none;
}
</style>
