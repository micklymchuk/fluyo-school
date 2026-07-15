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
  <section class="home-hero" aria-labelledby="home-hero-title">
    <UiGhostLetter class="home-hero__ghost-wide" placement="bottom-right" size="lg" />
    <UiGhostLetter class="home-hero__ghost-narrow" placement="top-right" size="sm" />
    <div class="home-hero__container">
      <UiLockupHeading
        id="home-hero-title"
        level="h1"
        align="center"
        size="hero"
        :script="t('homeSections.hero.scriptWord')"
        :caps="t('pages.home.intro.heading')"
      />
      <p class="home-hero__summary">{{ t('pages.home.intro.summary') }}</p>

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
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Typographic 2A cover: relative + overflow-hidden clip the bleeding ghost F. */
.home-hero {
  @apply relative overflow-hidden border-b border-border-hairline bg-page text-text;
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

.home-hero__summary {
  @apply max-w-xl text-body text-text-muted;
}

.home-hero__actions {
  @apply flex flex-wrap justify-center gap-control-compact;
}
</style>
