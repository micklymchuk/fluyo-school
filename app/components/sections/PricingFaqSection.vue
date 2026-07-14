<script setup lang="ts">
import PricingFaqItem from '~/components/pricing/PricingFaqItem.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { faqItems } from '~/data/content'

const { t } = useI18n()
</script>

<template>
  <UiSection
    class="pricing-page__faq"
    :eyebrow="t('pricingSections.faq.eyebrow')"
    :title="t('pricingSections.faq.title')"
    :description="t('pricingSections.faq.description')"
  >
    <div class="faq-list">
      <PricingFaqItem
        v-for="faqItem in faqItems"
        :id="`faq-${faqItem.id}`"
        :key="faqItem.id"
        :question="t(`faqItems.${faqItem.id}.question`)"
        :answer="t(`faqItems.${faqItem.id}.answer`)"
      />
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.faq-list {
  @apply mx-auto w-full max-w-3xl;
}
</style>
