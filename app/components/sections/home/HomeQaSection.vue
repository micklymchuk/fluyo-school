<script setup lang="ts">
import { computed } from 'vue'
import HomeQaCard from '~/components/home/HomeQaCard.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { type FaqItem, homeFaqItems } from '~/data/content'

const { t } = useI18n()

const questions = computed(() => {
  return homeFaqItems.map((item: FaqItem) => ({
    id: item.id,
    question: t(`faqItems.${item.id}.question`),
    answer: t(`faqItems.${item.id}.answer`)
  }))
})
</script>

<template>
  <UiSection id="questions" class="qa" labelledby="home-qa-title" :watermarks="0">
    <template #heading>
      <UiLockupHeading
        id="home-qa-title"
        level="h2"
        align="center"
        :caps="t('homeSections.qa.title')"
      />
      <p class="qa__line">{{ t('homeSections.qa.description') }}</p>
    </template>

    <div class="qa__list">
      <UiReveal
        v-for="(question, index) in questions"
        :key="question.id"
        :delay="index * 70"
      >
        <HomeQaCard
          :id="`home-qa-${question.id}`"
          :question="question.question"
          :answer="question.answer"
        />
      </UiReveal>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Centre the heading lockup over the question column. */
:deep(.section-header) {
  @apply mx-auto max-w-3xl items-center text-center;
}

.qa__line {
  @apply text-body text-text-muted;
}

.qa__list {
  @apply mx-auto flex w-full max-w-3xl flex-col gap-control-compact;
}
</style>
