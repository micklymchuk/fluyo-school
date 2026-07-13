<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'home',
  locale: locale.value,
  messageIntent: 'book_trial'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__inner">
      <div class="home-hero__content">
        <p class="home-hero__eyebrow">{{ t('pages.home.intro.eyebrow') }}</p>
        <h1 id="home-hero-title" class="home-hero__title">{{ t('pages.home.intro.heading') }}</h1>
        <p class="home-hero__summary">{{ t('pages.home.intro.summary') }}</p>

        <div class="home-hero__signals" :aria-label="t('homeSections.hero.signalsAriaLabel')">
          <span>{{ t('homeSections.hero.pathLabel') }}</span>
          <span>{{ t('homeSections.hero.trialLabel') }}</span>
        </div>

        <div class="home-hero__actions">
          <UiButtonLink href="#learning-paths" variant="primary">
            {{ t('homeSections.hero.primaryCta') }}
          </UiButtonLink>
          <UiButtonLink
            :href="telegramTarget"
            external
            variant="secondary"
            @click="trackTelegramClick"
          >
            {{ t('homeSections.hero.telegramCta') }}
          </UiButtonLink>
        </div>
      </div>

      <img
        class="home-hero__brand"
        src="/images/brand/fluyo-logo-full.png"
        width="340"
        height="103"
        :alt="t('homeSections.hero.visualAlt')"
      >
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-hero {
  @apply bg-page text-text;
}

.home-hero__inner {
  @apply mx-auto grid min-h-[calc(86svh-4rem)] w-full max-w-6xl items-center gap-section-compact px-page-gutter py-section md:grid-cols-[minmax(0,1fr)_minmax(14rem,22rem)];
}

.home-hero__content {
  @apply flex max-w-3xl flex-col gap-component-gap;
}

.home-hero__eyebrow {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.home-hero__title {
  @apply font-display text-display-heading font-semibold leading-tight text-text;
}

.home-hero__summary {
  @apply max-w-2xl text-body text-text-muted;
}

.home-hero__signals {
  @apply flex flex-wrap gap-control-compact text-small font-medium text-text;
}

.home-hero__signals span {
  @apply border-l-2 border-accent-subdued pl-control-compact;
}

.home-hero__actions {
  @apply flex flex-wrap gap-control-compact;
}

.home-hero__brand {
  @apply w-full max-w-72 justify-self-start md:justify-self-end;
}
</style>
