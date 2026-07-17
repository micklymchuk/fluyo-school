<script setup lang="ts">
import TeachersTeamSection from '~/components/sections/teachers/TeachersTeamSection.vue'

useSeo('/teachers')
</script>

<template>
  <div class="teachers-page">
    <TeachersTeamSection />
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teachers-page {
  @apply bg-page;
}
</style>
