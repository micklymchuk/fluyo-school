<script setup lang="ts">
import { computed } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import { usePricingPathContext } from '~/composables/usePricingPathContext'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const { pathContext, recommendedFormat } = usePricingPathContext()

const telegramContext = computed<CtaContext>(() => ({
  path: pathContext.value,
  format: recommendedFormat.value,
  sourceRoute: 'final-booking',
  locale: locale.value,
  messageIntent: 'book_trial'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <UiSection
    class="pricing-page__final-cta"
    variant="inverse"
    :eyebrow="t('pricingSections.finalCta.eyebrow')"
    :title="t('pricingSections.finalCta.title')"
    :description="t(`pricingSections.finalCta.pathDescriptions.${pathContext}`)"
  >
    <div class="pricing-cta-actions">
      <UiButtonLink
        :href="telegramTarget"
        external
        variant="primary"
        @click="trackTelegramClick"
      >
        {{ t('pricingSections.finalCta.telegramCta') }}
      </UiButtonLink>
      <UiButtonLink to="/programs" variant="secondary">
        {{ t('pricingSections.finalCta.programsCta') }}
      </UiButtonLink>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.pricing-cta-actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
