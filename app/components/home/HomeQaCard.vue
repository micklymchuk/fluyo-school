<script setup lang="ts">
import UiAccordion from '~/components/ui/UiAccordion.vue'

defineProps<{
  id: string
  question: string
  answer: string
}>()
</script>

<template>
  <UiAccordion :id="id" variant="card" :title="question">
    <p class="qa-card__answer">{{ answer }}</p>
  </UiAccordion>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.qa-card__answer {
  @apply text-body leading-body text-text-muted;
}
</style>
