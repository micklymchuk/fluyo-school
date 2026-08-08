<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'
import UiCard from '~/components/ui/UiCard.vue'

const { t } = useI18n()

const conditionIds = ['first-package', 'military-family'] as const
</script>

<template>
  <UiSection
    class="pricing-page__special-conditions"
    variant="compact"
    :eyebrow="t('pricingSections.specialConditions.eyebrow')"
    :title="t('pricingSections.specialConditions.title')"
    :description="t('pricingSections.specialConditions.description')"
  >
    <ul class="special-conditions">
      <UiCard v-for="id in conditionIds" :key="id" as="li" class="special-condition">
        <h3 class="special-condition__title">{{ t(`pricingSections.specialConditions.items.${id}.title`) }}</h3>
        <p class="special-condition__description">{{ t(`pricingSections.specialConditions.items.${id}.description`) }}</p>
      </UiCard>
    </ul>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.special-conditions {
  @apply grid gap-component-gap md:grid-cols-2;
}

.special-condition {
  @apply flex flex-col gap-control-compact;
}

.special-condition__title {
  @apply font-display text-card-title font-semibold text-text;
}

.special-condition__description {
  @apply text-body text-text-muted;
}
</style>
