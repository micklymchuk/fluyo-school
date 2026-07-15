<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiFrameBox from '~/components/ui/UiFrameBox.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiUnderlineList from '~/components/ui/UiUnderlineList.vue'
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

const heroSignals = computed(() => [
  t('homeSections.hero.pathLabel'),
  t('homeSections.hero.trialLabel')
])
</script>

<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__container">
      <UiFrameBox class="home-hero__frame">
        <div class="home-hero__inner">
          <div class="home-hero__content">
            <UiEyebrowPill class="home-hero__eyebrow" :label="t('pages.home.intro.eyebrow')" />
            <!-- Caps-only lockup: the heading copy has no Latin brand word, so no script line. -->
            <UiLockupHeading
              id="home-hero-title"
              level="h1"
              :caps="t('pages.home.intro.heading')"
            />
            <p class="home-hero__summary">{{ t('pages.home.intro.summary') }}</p>

            <UiUnderlineList
              class="home-hero__signals"
              :items="heroSignals"
              :aria-label="t('homeSections.hero.signalsAriaLabel')"
            />

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
      </UiFrameBox>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-hero {
  @apply bg-page text-text;
}

.home-hero__container {
  @apply mx-auto w-full max-w-6xl px-page-gutter py-section-spacious;
}

.home-hero__inner {
  @apply grid items-center gap-section-compact md:grid-cols-[minmax(0,1fr)_minmax(14rem,22rem)];
}

.home-hero__content {
  @apply flex max-w-3xl flex-col gap-component-gap;
}

.home-hero__eyebrow {
  @apply self-start;
}

.home-hero__summary {
  @apply max-w-2xl text-body text-text-muted;
}

.home-hero__actions {
  @apply flex flex-wrap gap-control-compact;
}

.home-hero__brand {
  @apply w-full max-w-hero-logo justify-self-start md:justify-self-end;
}
</style>
