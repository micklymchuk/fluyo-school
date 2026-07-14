<script setup lang="ts">
import { computed } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import type { CtaContext, TrackingTrigger } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { trackEvent } = useTracking()

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'teachers',
  locale: locale.value,
  messageIntent: 'ask_teacher'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)

function trackTrustCta(trigger: TrackingTrigger) {
  trackEvent('teacher_proof_view', {
    route: route.fullPath,
    locale: locale.value,
    sourceRoute: 'teachers',
    surface: 'trust-cta',
    trigger
  })
}

function handleCtaRouteClick() {
  trackTrustCta('activate')
}

function handleTelegramClick() {
  trackTrustCta('activate')
  trackTelegramClick()
}
</script>

<template>
  <UiSection
    class="teachers-page__cta-strip"
    variant="inverse"
    :eyebrow="t('teachersSections.ctaStrip.eyebrow')"
    :title="t('teachersSections.ctaStrip.title')"
    :description="t('teachersSections.ctaStrip.description')"
  >
    <div class="teachers-cta-actions">
      <UiButtonLink to="/pricing" variant="primary" @click="handleCtaRouteClick">
        {{ t('teachersSections.ctaStrip.pricingCta') }}
      </UiButtonLink>
      <UiButtonLink to="/programs" variant="secondary" @click="handleCtaRouteClick">
        {{ t('teachersSections.ctaStrip.programsCta') }}
      </UiButtonLink>
      <UiButtonLink
        :href="telegramTarget"
        external
        variant="secondary"
        @click="handleTelegramClick"
      >
        {{ t('teachersSections.ctaStrip.telegramCta') }}
      </UiButtonLink>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teachers-cta-actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
