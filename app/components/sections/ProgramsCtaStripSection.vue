<script setup lang="ts">
import { computed } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'programs',
  locale: locale.value,
  messageIntent: 'ask_program'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <UiSection
    class="programs-page__cta-strip"
    variant="inverse"
    :eyebrow="t('programsSections.ctaStrip.eyebrow')"
    :title="t('programsSections.ctaStrip.title')"
    :description="t('programsSections.ctaStrip.description')"
  >
    <div class="programs-cta-actions">
      <UiButtonLink to="/pricing" variant="primary">
        {{ t('programsSections.ctaStrip.pricingCta') }}
      </UiButtonLink>
      <UiButtonLink to="/teachers" variant="secondary">
        {{ t('programsSections.ctaStrip.teachersCta') }}
      </UiButtonLink>
      <UiButtonLink
        :href="telegramTarget"
        external
        variant="secondary"
        @click="trackTelegramClick"
      >
        {{ t('programsSections.ctaStrip.telegramCta') }}
      </UiButtonLink>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.programs-cta-actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
