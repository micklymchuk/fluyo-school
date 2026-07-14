<script setup lang="ts">
import ProgramsHeaderSection from '~/components/sections/ProgramsHeaderSection.vue'
import ProgramsPathsSection from '~/components/sections/ProgramsPathsSection.vue'
import ProgramsPriceHintsSection from '~/components/sections/ProgramsPriceHintsSection.vue'
import ProgramsCtaStripSection from '~/components/sections/ProgramsCtaStripSection.vue'

useSeo('/programs')
</script>

<template>
  <div class="programs-page">
    <ProgramsHeaderSection />
    <ProgramsPathsSection />
    <ProgramsPriceHintsSection />
    <ProgramsCtaStripSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.programs-page {
  @apply bg-page;
}
</style>
