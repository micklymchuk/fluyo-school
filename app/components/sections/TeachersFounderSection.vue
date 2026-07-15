<script setup lang="ts">
import { computed } from 'vue'
import HomeFactCard from '~/components/home/HomeFactCard.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiUnderlineList from '~/components/ui/UiUnderlineList.vue'

const { t } = useI18n()

const factIndexes = [0, 1] as const
const facts = computed(() => {
  return factIndexes.map((factIndex) => ({
    id: factIndex,
    title: t(`teachersSections.founder.facts[${factIndex}].title`),
    body: t(`teachersSections.founder.facts[${factIndex}].body`)
  }))
})

const directionIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const
const directionColumns = computed(() => {
  const directions = directionIndexes.map((directionIndex) => t(`teachersSections.founder.directions[${directionIndex}]`))
  const midpoint = Math.ceil(directions.length / 2)
  return [directions.slice(0, midpoint), directions.slice(midpoint)]
})
</script>

<template>
  <section id="founder" class="founder" aria-labelledby="teachers-founder-title">
    <div class="founder__container">
      <UiEyebrowPill class="founder__eyebrow" :label="t('teachersSections.founder.eyebrow')" />
      <UiLockupHeading
        id="teachers-founder-title"
        level="h2"
        :script="t('teachersSections.founder.scriptName')"
        :caps="t('teachersSections.founder.role')"
      />

      <div class="founder__grid">
        <div class="founder__facts">
          <HomeFactCard
            v-for="fact in facts"
            :key="fact.id"
            :title="fact.title"
            :body="fact.body"
          />
        </div>

        <div class="founder__directions" role="group" :aria-label="t('teachersSections.founder.directionsTitle')">
          <h3 class="founder__directions-title">{{ t('teachersSections.founder.directionsTitle') }}</h3>
          <div class="founder__directions-columns">
            <UiUnderlineList
              v-for="(column, columnIndex) in directionColumns"
              :key="columnIndex"
              :items="column"
            />
          </div>
        </div>
      </div>

      <blockquote class="founder__quote">
        <p class="founder__quote-text">{{ t('teachersSections.founder.quote') }}</p>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.founder {
  @apply bg-page py-section text-text;
}

.founder__container {
  @apply mx-auto flex w-full max-w-6xl flex-col gap-component-gap px-page-gutter;
}

.founder__eyebrow {
  @apply self-start;
}

.founder__grid {
  @apply grid gap-component-gap md:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)];
}

.founder__facts {
  @apply flex flex-col gap-component-gap;
}

.founder__directions {
  @apply rounded-card border border-border-hairline bg-surface p-card-padding;
}

.founder__directions-title {
  @apply mb-4 text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.founder__directions-columns {
  @apply grid gap-3 sm:grid-cols-2;
}

/* Founder quote band: the burgundy closing strip from the founder post. */
.founder__quote {
  @apply rounded-card bg-surface-inverse px-6 py-10 text-center sm:px-12;
}

.founder__quote-text {
  @apply mx-auto max-w-3xl text-body leading-body text-text-inverse;
}
</style>
