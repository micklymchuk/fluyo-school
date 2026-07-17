<script setup lang="ts">
import UiSparkle from '~/components/ui/UiSparkle.vue'

withDefaults(defineProps<{
  scriptName: string
  role: string
  headingId?: string
  level?: 'h1' | 'h2' | 'h3'
  sparkles?: boolean
}>(), {
  headingId: undefined,
  level: 'h2',
  sparkles: true
})
</script>

<template>
  <component :is="level" :id="headingId" class="founder-intro">
    <span class="founder-intro__name-row">
      <UiSparkle v-if="sparkles" class="founder-intro__sparkle" :size="30" />
      <!-- Latin script name — Pinyon has no Cyrillic glyphs, so it stays a brand moment. -->
      <span class="founder-intro__name">{{ scriptName }}</span>
      <UiSparkle v-if="sparkles" class="founder-intro__sparkle" :size="30" />
    </span>
    <span class="founder-intro__role">{{ role }}</span>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.founder-intro {
  @apply m-0 flex flex-col items-center gap-2 text-center;
}

.founder-intro__name-row {
  @apply flex items-center justify-center gap-4;
}

.founder-intro__name {
  @apply font-script text-poster-script text-accent-burgundy sm:text-poster-script-sm;
}

.founder-intro__sparkle {
  @apply shrink-0;
}

.founder-intro__role {
  @apply font-display text-card-title font-medium tracking-normal text-text sm:text-section-heading;
}
</style>
