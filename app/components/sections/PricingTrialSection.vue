<script setup lang="ts">
import { computed } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiFrameBox from '~/components/ui/UiFrameBox.vue'
import { usePricingPathContext } from '~/composables/usePricingPathContext'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const { priceValue } = usePriceValue()
const { pathContext, recommendedFormat } = usePricingPathContext()

const telegramContext = computed<CtaContext>(() => ({
  path: pathContext.value,
  format: recommendedFormat.value,
  sourceRoute: 'pricing',
  locale: locale.value,
  messageIntent: 'book_trial'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <UiSection
    class="pricing-page__trial"
    variant="spacious"
    :eyebrow="t('pages.pricing.intro.eyebrow')"
    :title="t('pages.pricing.intro.heading')"
    :description="t('pages.pricing.intro.summary')"
  >
    <UiFrameBox class="trial-card">
      <div class="trial-card__body">
        <span class="trial-card__label">{{ t('priceItems.TRIAL.label') }}</span>
        <strong class="trial-card__value">{{ priceValue('TRIAL') }}</strong>
        <p class="trial-card__included">
          <span class="trial-card__included-label">{{ t('pricingSections.trial.includedLabel') }}</span>
          {{ t('priceItems.TRIAL.caption') }}
        </p>
        <p class="trial-card__path-note">{{ t(`pricingSections.trial.pathNotes.${pathContext}`) }}</p>
        <div class="trial-card__actions">
          <UiButtonLink
            :href="telegramTarget"
            external
            variant="primary"
            @click="trackTelegramClick"
          >
            {{ t('pricingSections.trial.telegramCta') }}
          </UiButtonLink>
        </div>
      </div>
    </UiFrameBox>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.trial-card {
  @apply max-w-2xl;
}

.trial-card__body {
  @apply flex flex-col gap-control-compact;
}

.trial-card__label {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.trial-card__value {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.trial-card__included {
  @apply text-body text-text-muted;
}

.trial-card__included-label {
  @apply mr-micro-gap font-bold uppercase text-eyebrow text-text;
}

.trial-card__path-note {
  @apply border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}

.trial-card__actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
