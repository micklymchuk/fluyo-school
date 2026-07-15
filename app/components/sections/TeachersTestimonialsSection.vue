<script setup lang="ts">
import { computed } from 'vue'
import TeacherProofItem from '~/components/teachers/TeacherProofItem.vue'
import TeacherTestimonial from '~/components/teachers/TeacherTestimonial.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { useSurfaceViewObserver } from '~/composables/useSurfaceViewObserver'
import { proofAssets, testimonials, type ProofAsset } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()

const resultProofAssets = proofAssets.filter((asset: ProofAsset) => {
  return asset.usageContext.includes('teachers') && asset.kind === 'result'
})

const resultProofItems = computed(() => {
  return resultProofAssets.map((asset) => ({
    id: asset.id,
    kindLabel: t(`teachersSections.proofKindLabels.${asset.kind}`),
    title: t(`proofAssets.${asset.id}.title`),
    caption: t(`proofAssets.${asset.id}.caption`)
  }))
})

const testimonialItems = computed(() => {
  return testimonials.map((testimonial) => ({
    id: testimonial.id,
    quote: t(`testimonials.${testimonial.id}.quote`),
    sourceLabel: t(`testimonials.${testimonial.id}.sourceLabel`)
  }))
})

useSurfaceViewObserver('data-proof-surface', (surface) => {
  if (surface === 'testimonials') {
    trackEvent('teacher_proof_view', {
      route: route.fullPath,
      locale: locale.value,
      sourceRoute: 'teachers',
      surface,
      trigger: 'observe'
    })
  }
})
</script>

<template>
  <UiSection
    class="teachers-page__testimonials"
    data-proof-surface="testimonials"
    variant="inverse"
    watermark
    :eyebrow="t('teachersSections.testimonials.eyebrow')"
    :title="t('teachersSections.testimonials.title')"
    :description="t('teachersSections.testimonials.description')"
  >
    <div class="results-grid">
      <TeacherProofItem
        v-for="proofItem in resultProofItems"
        :key="proofItem.id"
        :kind-label="proofItem.kindLabel"
        :title="proofItem.title"
        :caption="proofItem.caption"
      />

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

.results-grid {
  @apply grid gap-component-gap md:grid-cols-2;
}
</style>
