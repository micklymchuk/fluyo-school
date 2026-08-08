<script setup lang="ts">
import { computed } from 'vue'
import PricingPackageCard from '~/components/pricing/PricingPackageCard.vue'
import UiSection from '~/components/sections/UiSection.vue'
import { resolveTelegramCta } from '~/composables/useTelegramCta'
import { pricePackages, type CtaContext, type PricePackageTrack } from '~/data/content'

const route = useRoute()
const { locale } = useLocale()
const { t } = useI18n()
const { packageTotal, packagePerLesson } = usePriceValue()
const { trackEvent } = useTracking()

const telegramContextFor = (track: PricePackageTrack): CtaContext => ({
  path: track.telegramPath,
  format: track.telegramFormat,
  sourceRoute: 'pricing',
  locale: locale.value,
  messageIntent: 'ask_price'
})

const packageTracks = computed(() => {
  return pricePackages.map((track) => ({
    track,
    title: t(`pricingSections.packages.tracks.${track.id}.title`),
    ctaLabel: t(`pricingSections.packages.tracks.${track.id}.telegramCta`),
    ctaHref: resolveTelegramCta(telegramContextFor(track), route.fullPath).url,
    tiers: track.tiers.map((tier) => ({
      id: `${track.id}-${tier.lessonCount}`,
      lessonLabel: t(`pricingSections.packages.lessonLabels.${tier.lessonCount}`),
      total: packageTotal(tier),
      perLesson: packagePerLesson(tier),
      popular: tier.isPopular
    }))
  }))
})

function handleCtaClick(track: PricePackageTrack) {
  const telegramCta = resolveTelegramCta(telegramContextFor(track), route.fullPath)

  trackEvent('telegram_context', telegramCta.contextEvent)
  trackEvent('telegram_click', telegramCta.clickEvent)
}
</script>

<template>
  <UiSection
    class="pricing-page__packages"
    :eyebrow="t('pricingSections.packages.eyebrow')"
    :title="t('pricingSections.packages.title')"
    :description="t('pricingSections.packages.description')"
  >
    <div class="package-tracks">
      <section
        v-for="group in packageTracks"
        :key="group.track.id"
        class="package-track"
        :aria-labelledby="`package-track-${group.track.id}`"
      >
        <h3 :id="`package-track-${group.track.id}`" class="package-track__title">{{ group.title }}</h3>
        <div class="package-track__grid">
          <PricingPackageCard
            v-for="tier in group.tiers"
            :key="tier.id"
            :track-id="group.track.id"
            :tier-id="tier.id"
            :lesson-label="tier.lessonLabel"
            :total="tier.total"
            :total-label="t('pricingSections.packages.totalLabel')"
            :per-lesson="tier.perLesson"
            :popular="tier.popular"
            :popular-label="t('pricingSections.packages.popularLabel')"
            :cta-label="group.ctaLabel"
            :cta-href="group.ctaHref"
            @cta-click="handleCtaClick(group.track)"
          />
        </div>
      </section>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.package-tracks {
  @apply grid gap-section-compact;
}

.package-track {
  @apply flex flex-col gap-component-gap;
}

.package-track__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.package-track__grid {
  @apply grid gap-component-gap lg:grid-cols-3 lg:items-start;
}
</style>
