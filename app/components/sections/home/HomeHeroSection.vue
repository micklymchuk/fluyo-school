<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
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
  <section id="home" class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__container">
      <UiLockupHeading
        id="home-hero-title"
        level="h1"
        align="center"
        size="hero"
        :script="t('homeSections.hero.scriptWord')"
      >
        <template #caps>
          <span class="home-hero__headline">
            {{ t('homeSections.hero.headingLead') }}
            <span class="home-hero__headline-accent">{{ t('homeSections.hero.headingAccent') }}</span>
          </span>
        </template>
      </UiLockupHeading>
      <p class="home-hero__summary">{{ t('pages.home.intro.summary') }}</p>

      <div class="home-hero__actions">
        <UiButtonLink
          :href="telegramTarget"
          external
          variant="primary"
          @click="trackTelegramClick"
        >
          {{ t('homeSections.hero.trialCta') }}
        </UiButtonLink>
        <UiButtonLink href="#learning-paths" variant="secondary">
          {{ t('homeSections.hero.programsCta') }}
        </UiButtonLink>
      </div>

      <p class="home-hero__assurance">{{ t('homeSections.hero.assurance') }}</p>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.home-hero {
  @apply relative bg-page text-text;
}

.home-hero__container {
  @apply relative mx-auto flex w-full max-w-7xl flex-col items-center gap-frame px-page-gutter py-section-spacious text-center lg:py-32;
}

/* Hero headline breaks the all-caps lockup on purpose: a warmer mixed-case line
   with a burgundy tail, matching the reworked hero mock. */
.home-hero__headline {
  @apply normal-case tracking-normal;
}

.home-hero__headline-accent {
  @apply block text-accent-burgundy;
}

.home-hero__summary {
  @apply max-w-xl text-body text-text-muted;
}

.home-hero__actions {
  @apply flex flex-wrap justify-center gap-control-compact;
}

/* Reassurance line under the CTAs: what happens after you book the trial. */
.home-hero__assurance {
  @apply text-center text-small text-text-muted;
}
</style>
