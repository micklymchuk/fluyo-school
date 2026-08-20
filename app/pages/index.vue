<script setup lang="ts">
import HomeHeroSection from '~/components/sections/home/HomeHeroSection.vue'
import HomePathCardsSection from '~/components/sections/home/HomePathCardsSection.vue'
import HomeLessonsSection from '~/components/sections/home/HomeLessonsSection.vue'
import HomeSpeakingClubSection from '~/components/sections/home/HomeSpeakingClubSection.vue'
import HomeFounderSection from '~/components/sections/home/HomeFounderSection.vue'
import HomeTeachersSection from '~/components/sections/home/HomeTeachersSection.vue'
import HomeQaSection from '~/components/sections/home/HomeQaSection.vue'
import HomeReviewsSection from '~/components/sections/home/HomeReviewsSection.vue'
import HomeTrialPricingSection from '~/components/sections/home/HomeTrialPricingSection.vue'

useSeo('/')
</script>

<template>
  <div class="home-page">
    <HomeHeroSection />
    <HomePathCardsSection />
    <HomeSpeakingClubSection />
    <HomeTrialPricingSection />
    <HomeTeachersSection />
    <HomeFounderSection />
    <!--    <HomeLessonsSection />-->
    <HomeReviewsSection />
    <HomeQaSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-page {
  @apply bg-page;
}
</style>
