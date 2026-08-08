<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiGhostLetter from '~/components/ui/UiGhostLetter.vue'
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
    <UiGhostLetter class="home-hero__ghost-wide" placement="bottom-right" size="lg" />
    <UiGhostLetter class="home-hero__ghost-narrow" placement="top-right" size="sm" />
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

      <p class="home-hero__assurance">
        <svg
          class="home-hero__assurance-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span>{{ t('homeSections.hero.assurance') }}</span>
      </p>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Typographic 2A cover: relative + overflow-hidden clip the bleeding ghost F. */
.home-hero {
  @apply relative overflow-hidden bg-page text-text;
}

/* One letterform per viewport: the full-bleed bottom-right F needs sm+ width to
   read as a letter; below that a smaller top-right glyph takes over. */
.home-hero__ghost-wide {
  @apply hidden sm:block;
}

.home-hero__ghost-narrow {
  @apply sm:hidden;
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
  @apply flex items-center justify-center gap-2 text-small text-text-muted;
}

.home-hero__assurance-icon {
  @apply size-5 shrink-0 text-accent-burgundy;
}
</style>
