<script setup lang="ts">
import { computed } from 'vue'
import TeacherPortrait from '~/components/teachers/TeacherPortrait.vue'
import HomeFactCard from '~/components/home/HomeFactCard.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import { founderProfile } from '~/data/content'

const { t } = useI18n()

// Four facts flank the portrait: the first two sit left of it, the last two right.
const factIndexes = [0, 1, 2, 3] as const

const facts = computed(() => {
  return factIndexes.map((factIndex) => ({
    index: factIndex,
    title: t(`homeSections.founder.items[${factIndex}].title`),
    body: t(`homeSections.founder.items[${factIndex}].body`)
  }))
})

const leftFacts = computed(() => facts.value.slice(0, 2))
const rightFacts = computed(() => facts.value.slice(2))
</script>

<template>
  <section id="founder" class="founder" aria-labelledby="home-founder-title">
    <div class="founder__container">
      <UiLockupHeading
        id="home-founder-title"
        level="h2"
        align="center"
        size="display"
        accent
        :caps="t('homeSections.founder.capsWord')"
        :script="t('homeSections.founder.scriptWord')"
      />
      <p class="founder__lead">{{ t('homeSections.founder.description') }}</p>

      <!-- Collage layout: portrait centred, facts flanking it from lg where three columns have room.
           Each column reveals from its own side, closing in on the portrait. -->
      <div class="founder__layout">
        <div class="founder__portrait">
          <TeacherPortrait
            :src="founderProfile.founderPhoto"
            :alt="t('assets.portrait-catherina-founder.alt')"
            tone="bare"
          />
        </div>

        <div class="founder__column founder__column--left">
          <UiReveal
            v-for="fact in leftFacts"
            :key="fact.index"
            variant="left"
            :delay="fact.index * 70"
          >
            <HomeFactCard :title="fact.title" :body="fact.body" />
          </UiReveal>
        </div>

        <div class="founder__column founder__column--right">
          <UiReveal
            v-for="fact in rightFacts"
            :key="fact.index"
            variant="right"
            :delay="fact.index * 70"
          >
            <HomeFactCard :title="fact.title" :body="fact.body" />
          </UiReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.founder {
  @apply relative bg-page py-section text-text;
}

.founder__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col items-center gap-component-gap px-page-gutter text-center;
}

.founder__lead {
  @apply max-w-2xl text-body text-text-muted;
}

/* Portrait leads on mobile, then the facts stack under it; from lg the grid places
   the columns either side of it so the portrait stays the centre of the collage.
   Below lg the three columns squeeze the card copy into ribbons, so they stay stacked. */
.founder__layout {
  @apply grid w-full gap-component-gap lg:grid-cols-[minmax(0,1fr)_minmax(15rem,22rem)_minmax(0,1fr)] lg:items-center;
}

.founder__portrait {
  @apply mx-auto w-full max-w-xs lg:col-start-2 lg:row-start-1 lg:max-w-none;
}

.founder__column {
  @apply flex flex-col gap-component-gap text-left lg:row-start-1;
}

.founder__column--left {
  @apply lg:col-start-1;
}

.founder__column--right {
  @apply lg:col-start-3;
}
</style>
