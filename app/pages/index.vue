<script setup lang="ts">
import HomeHeroSection from '~/components/sections/HomeHeroSection.vue'
import HomePathCardsSection from '~/components/sections/HomePathCardsSection.vue'
import HomeLessonsSection from '~/components/sections/HomeLessonsSection.vue'
import HomeSpeakingClubSection from '~/components/sections/HomeSpeakingClubSection.vue'
import HomeReviewsSection from '~/components/sections/HomeReviewsSection.vue'
import HomeTrialPricingSection from '~/components/sections/HomeTrialPricingSection.vue'

useSeo('/')
</script>

<template>
  <div class="home-page">
    <HomeHeroSection />
    <HomePathCardsSection />
    <HomeSpeakingClubSection />
    <HomeTrialPricingSection />
    <HomeLessonsSection />
    <HomeReviewsSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-page {
  @apply bg-page;
}
</style>
