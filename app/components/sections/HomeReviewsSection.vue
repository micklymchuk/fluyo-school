<script setup lang="ts">
import { computed } from 'vue'
import TeacherTestimonial from '~/components/teachers/TeacherTestimonial.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { testimonials } from '~/data/content'

const { t } = useI18n()

const testimonialItems = computed(() => {
  return testimonials.map((testimonial) => ({
    id: testimonial.id,
    quote: t(`testimonials.${testimonial.id}.quote`),
    sourceLabel: t(`testimonials.${testimonial.id}.sourceLabel`)
  }))
})
</script>

<template>
  <UiSection
    id="student-reviews"
    variant="inverse"
    watermark
    labelledby="home-reviews-title"
  >
    <template #heading>
      <UiEyebrowPill
        class="reviews__eyebrow"
        :label="t('homeSections.reviews.eyebrow')"
        inverse
      />
      <UiLockupHeading
        id="home-reviews-title"
        level="h2"
        inverse
        :caps="t('homeSections.reviews.title')"
      />
      <p class="reviews__description">{{ t('homeSections.reviews.description') }}</p>
    </template>

    <div class="reviews__grid">
      <TeacherTestimonial
        v-for="testimonialItem in testimonialItems"
        :key="testimonialItem.id"
        :quote="testimonialItem.quote"
        :source-label="testimonialItem.sourceLabel"
      />
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.reviews__eyebrow {
  @apply self-start;
}

.reviews__description {
  @apply max-w-2xl text-body text-text-inverse;
}

/* Three-up only from lg: 768px stamps get too narrow for full quotes. */
.reviews__grid {
  @apply grid gap-component-gap lg:grid-cols-3;
}
</style>
