<script setup lang="ts">
import { onMounted, watch } from 'vue'
import PricingTrialSection from '~/components/sections/pricing/PricingTrialSection.vue'
import PricingFormatsSection from '~/components/sections/pricing/PricingFormatsSection.vue'
import PricingIncludedSection from '~/components/sections/pricing/PricingIncludedSection.vue'
import PricingFaqSection from '~/components/sections/pricing/PricingFaqSection.vue'
import PricingFinalCtaSection from '~/components/sections/pricing/PricingFinalCtaSection.vue'
import { usePricingPathContext } from '~/composables/usePricingPathContext'

useSeo('/pricing')

const route = useRoute()
const { locale } = useLocale()
const { trackEvent } = useTracking()
const { pathContext, recommendedFormat } = usePricingPathContext()

function trackPricingView() {
  trackEvent('pricing_view', {
    route: route.fullPath,
    locale: locale.value,
    path: pathContext.value,
    format: recommendedFormat.value,
    sourceRoute: 'pricing'
  })
}

onMounted(() => {
  trackPricingView()
})

watch(pathContext, () => {
  trackPricingView()
})
</script>

<template>
  <div class="pricing-page">
    <PricingTrialSection />
    <PricingFormatsSection />
    <PricingIncludedSection />
    <PricingFaqSection />
    <PricingFinalCtaSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.pricing-page {
  @apply bg-page;
}
</style>
