<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'
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
      <li v-for="item in pricingIncludedItems" :key="item.id" class="included-item">
        <h3 class="included-item__title">{{ t(`pricingSections.included.items.${item.id}.title`) }}</h3>
        <p class="included-item__description">{{ t(`pricingSections.included.items.${item.id}.description`) }}</p>
      </li>
    </ul>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.included-grid {
  @apply grid gap-component-gap md:grid-cols-2;
}

.included-item {
  @apply flex flex-col gap-control-compact border-l-2 border-accent-subdued bg-surface-muted p-card-padding;
}

.included-item__title {
  @apply font-display text-[1.35rem] font-semibold leading-tight text-text;
}

.included-item__description {
  @apply text-body text-text-muted;
}
</style>
