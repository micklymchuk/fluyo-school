<script setup lang="ts">
import ProgramsHeaderSection from '~/components/sections/programs/ProgramsHeaderSection.vue'
import ProgramsPathsSection from '~/components/sections/programs/ProgramsPathsSection.vue'
import ProgramsPriceHintsSection from '~/components/sections/programs/ProgramsPriceHintsSection.vue'
import ProgramsCtaStripSection from '~/components/sections/programs/ProgramsCtaStripSection.vue'

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
