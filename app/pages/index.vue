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
    <HomeFounderSection />
    <HomeTeachersSection />
    <HomeTrialPricingSection />
    <!--    <HomeLessonsSection />-->
    <HomeReviewsSection />
    <HomeQaSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* overflow-x-clip: side reveals (UiReveal variant="left"/"right") start their travel
   outside the page gutter, which would otherwise make the page scroll sideways for as
   long as they sit un-revealed. `clip` and not `hidden` — it must not become a
   scroll container. */
.home-page {
  @apply overflow-x-clip bg-page;
}
</style>
