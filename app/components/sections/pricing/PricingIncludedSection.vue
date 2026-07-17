<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'
import UiCard from '~/components/ui/UiCard.vue'
import { pricingIncludedItems } from '~/data/content'

const { t } = useI18n()
</script>

<template>
  <UiSection
    class="pricing-page__included"
    :eyebrow="t('pricingSections.included.eyebrow')"
    :title="t('pricingSections.included.title')"
    :description="t('pricingSections.included.description')"
  >
    <ul class="included-grid">
      <UiCard v-for="item in pricingIncludedItems" :key="item.id" as="li" class="included-item">
        <h3 class="included-item__title">{{ t(`pricingSections.included.items.${item.id}.title`) }}</h3>
        <p class="included-item__description">{{ t(`pricingSections.included.items.${item.id}.description`) }}</p>
      </UiCard>
    </ul>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.included-grid {
  @apply grid gap-component-gap md:grid-cols-2;
}

.included-item {
  @apply flex flex-col gap-control-compact;
}

.included-item__title {
  @apply font-display text-card-title font-semibold text-text;
}

.included-item__description {
  @apply text-body text-text-muted;
}
</style>
