<script setup lang="ts">
import { computed } from 'vue'
import UiCarousel from '~/components/ui/UiCarousel.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiStampCard from '~/components/ui/UiStampCard.vue'
import { resolveLocalizedText, testimonials } from '~/data/content'

const { t } = useI18n()
const { locale } = useLocale()

const testimonialItems = computed(() => {
  return testimonials.map((testimonial) => ({
    id: testimonial.id,
    quote: testimonial.quote,
    sourceLabel: resolveLocalizedText(testimonial.sourceLabel, locale.value)
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
      <UiLockupHeading
        id="home-reviews-title"
        level="h2"
        align="center"
        inverse
        :caps="t('homeSections.reviews.title')"
      />
    </template>

    <UiCarousel
      class="reviews__carousel"
      inverse
      :items="testimonialItems"
      :label="t('homeSections.reviews.title')"
      :slide-label="t('homeSections.reviews.slideLabel')"
    >
      <template #slide="{ item }">
        <UiStampCard as="figure" class="reviews__stamp">
          <blockquote class="reviews__quote">{{ item.quote }}</blockquote>
          <figcaption class="reviews__source">{{ item.sourceLabel }}</figcaption>
        </UiStampCard>
      </template>
    </UiCarousel>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Centre the title on the band, matching the brand reference. */
:deep(.section-header) {
  @apply mx-auto max-w-3xl items-center text-center;
}

.reviews__carousel {
  @apply mt-component-gap;
}

/* One stamp per slide, centred on the band like the brand reference. */
.reviews__stamp {
  @apply mx-auto flex max-w-2xl flex-col;
}

.reviews__quote {
  @apply text-body leading-body text-text;
}

.reviews__source {
  @apply mt-component-gap text-eyebrow font-semibold uppercase tracking-display text-accent-burgundy;
}
</style>
