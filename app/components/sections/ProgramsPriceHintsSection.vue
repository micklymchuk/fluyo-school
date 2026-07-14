<script setup lang="ts">
import { computed } from 'vue'
import ProgramPriceHintCard from '~/components/programs/ProgramPriceHintCard.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { learningPaths, priceItems, type LearningPath } from '~/data/content'

const { t } = useI18n()

function getPathPriceHints(path: LearningPath) {
  return priceItems.filter((priceItem) => path.priceHintIds.includes(priceItem.id))
}

const priceHintCards = computed(() => {
  return learningPaths.map((path) => ({
    id: path.id,
    title: t(`learningPaths.${path.id}.title`),
    prices: getPathPriceHints(path).map((priceItem) => ({
      id: priceItem.id,
      label: t(`priceItems.${priceItem.id}.label`),
      value: t(`priceItems.${priceItem.id}.value`),
      caption: t(`priceItems.${priceItem.id}.caption`)
    }))
  }))
})
</script>

<template>
  <UiSection
    class="programs-page__price-hints"
    :eyebrow="t('programsSections.priceHints.eyebrow')"
    :title="t('programsSections.priceHints.title')"
    :description="t('programsSections.priceHints.description')"
  >
    <div class="price-hint-grid">
      <ProgramPriceHintCard
        v-for="card in priceHintCards"
        :key="card.id"
        :title="card.title"
        :prices="card.prices"
      />
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.price-hint-grid {
  @apply grid gap-component-gap lg:grid-cols-3;
}
</style>
