<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import UiUnderlineList from '~/components/ui/UiUnderlineList.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'
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
    <UiWatermark />
    <div class="home-hero__container">
      <div class="home-hero__content">
        <UiEyebrowPill class="home-hero__eyebrow" :label="t('pages.home.intro.eyebrow')" />
        <UiLockupHeading
          id="home-hero-title"
          level="h1"
          :script="t('homeSections.hero.scriptWord')"
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

      <div class="home-hero__visual">
        <img
          class="home-hero__founder"
          src="/images/home/hero-founder.png"
          width="1000"
          height="694"
          :alt="t('homeSections.hero.founderImageAlt')"
        >
        <p class="home-hero__note">
          <span class="home-hero__note-inner">{{ t('homeSections.hero.noteText') }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Borderless full-width band; the hairline hands off to the next section. */
.home-hero {
  @apply relative border-b border-border-hairline bg-page text-text;
}

/* relative: content stacks above the watermark layer.
   items-end drops the photo desk onto the section's bottom edge.
   Two columns only from lg: below that the minmax track starves the text column.
   The photo column widens stepwise so text keeps a comfortable measure. */
.home-hero__container {
  @apply relative mx-auto grid w-full max-w-7xl items-end gap-x-section-compact gap-y-component-gap px-page-gutter pt-section-compact lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:pt-section xl:grid-cols-[minmax(0,1fr)_minmax(24rem,36rem)];
}

.home-hero__content {
  @apply flex max-w-3xl flex-col gap-component-gap pb-section-compact lg:pb-section;
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

.home-hero__visual {
  @apply relative w-full max-w-md justify-self-center sm:max-w-lg lg:max-w-none lg:justify-self-end;
}

.home-hero__founder {
  @apply block h-auto w-full;
}

.home-hero__note {
  @apply absolute bottom-6 right-2 max-w-56 rotate-3 bg-accent-burgundy p-2 shadow-md sm:right-6 md:max-w-64;
}

.home-hero__note-inner {
  @apply block bg-surface-muted px-4 py-3 text-center font-display text-small font-bold uppercase tracking-display text-text;
}
</style>
