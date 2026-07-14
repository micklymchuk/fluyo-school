<script setup lang="ts">
import TeachersHeaderSection from '~/components/sections/TeachersHeaderSection.vue'
import TeachersProofColumnsSection from '~/components/sections/TeachersProofColumnsSection.vue'
import TeachersTestimonialsSection from '~/components/sections/TeachersTestimonialsSection.vue'
import TeachersCtaStripSection from '~/components/sections/TeachersCtaStripSection.vue'

useSeo('/teachers')
</script>

<template>
  <div class="teachers-page">
    <TeachersHeaderSection />
    <TeachersProofColumnsSection />
    <TeachersTestimonialsSection />
    <TeachersCtaStripSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teachers-page {
  @apply bg-page;
}
</style>
