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
    <div class="trial-card">
      <span class="trial-card__label">{{ t('priceItems.trial.label') }}</span>
      <strong class="trial-card__value">{{ t('priceItems.trial.value') }}</strong>
      <p class="trial-card__included">
        <span class="trial-card__included-label">{{ t('pricingSections.trial.includedLabel') }}</span>
        {{ t('priceItems.trial.caption') }}
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
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.trial-card {
  @apply flex max-w-2xl flex-col gap-control-compact border border-border-hairline bg-surface p-card-padding;
}

.trial-card__label {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.trial-card__value {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.trial-card__included {
  @apply text-body text-text-muted;
}

.trial-card__included-label {
  @apply mr-1 font-bold uppercase text-eyebrow text-text;
}

.trial-card__path-note {
  @apply border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}

.trial-card__actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
