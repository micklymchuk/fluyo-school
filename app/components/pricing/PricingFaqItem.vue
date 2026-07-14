<script setup lang="ts">
import UiAccordion from '~/components/ui/UiAccordion.vue'

defineProps<{
  id: string
  question: string
  answer: string
}>()
</script>

<template>
  <UiAccordion :id="id" :title="question">
    <p class="faq-answer">{{ answer }}</p>
  </UiAccordion>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.faq-answer {
  @apply text-body text-text-muted;
}
</style>
