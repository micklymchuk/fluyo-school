<script setup lang="ts">
import HomeHeroSection from '~/components/sections/HomeHeroSection.vue'
import HomePathCardsSection from '~/components/sections/HomePathCardsSection.vue'
import HomeProofSnapshotSection from '~/components/sections/HomeProofSnapshotSection.vue'
import HomeTrialPricingSection from '~/components/sections/HomeTrialPricingSection.vue'

useSeo('/')
</script>

<template>
  <div class="home-page">
    <HomeHeroSection />
    <HomePathCardsSection />
    <HomeProofSnapshotSection />
    <HomeTrialPricingSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-page {
  @apply bg-page;
}
</style>
