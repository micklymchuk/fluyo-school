<script setup lang="ts">
import { Book, GraphUp, TaskList, UserStar } from '@iconoir/vue'
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiInfoBoard from '~/components/ui/UiInfoBoard.vue'
import UiInfoInlineMessage from '~/components/ui/UiInfoInlineMessage.vue'
import UiLockupHeading from '~/components/ui/UiLockupHeading.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'home',
  locale: locale.value,
  messageIntent: 'book_consultation'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)

const boardIcons = [UserStar, Book, TaskList, GraphUp]
const boardItems = computed(() => boardIcons.map((icon, itemIndex) => ({
  id: `home-hero-fact-${itemIndex}`,
  icon,
  description: t(`homeSections.hero.boardItems[${itemIndex}].description`)
})))
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

      <UiInfoBoard
        class="home-hero__board"
        theme="transparent"
        :items="boardItems"
        :icon-size="36"
      />

      <UiInfoInlineMessage class="home-hero__assurance">
        {{ t('homeSections.hero.assurance') }}
      </UiInfoInlineMessage>
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
   with a burgundy tail. */
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

/* Fact row under the CTAs. Layout is the hero's call: a 2x2 quadrant on small
   screens, four across once the row fits, with rules drawn per position. */
.home-hero__board {
  @apply w-full max-w-4xl;
}

.home-hero__board :deep(.info-board__list) {
  @apply grid-cols-2 gap-0 lg:grid-cols-4;
}

.home-hero__board :deep(.info-board__item) {
  @apply px-3 lg:px-5;
}

.home-hero__board :deep(.info-board__item:nth-child(-n + 2)) {
  @apply pb-8 lg:pb-0;
}

.home-hero__board :deep(.info-board__item:nth-child(2n)) {
  @apply border-l border-border-hairline;
}

.home-hero__board :deep(.info-board__item:nth-child(2)) {
  @apply border-t-0 pt-0;
}

.home-hero__board :deep(.info-board__item:nth-child(n + 3)) {
  @apply border-t border-border-hairline pt-8 lg:border-t-0 lg:pt-0;
}

/* Reassurance line under the CTAs: what happens after you book the trial. */
.home-hero__assurance {
  @apply w-full max-w-4xl;
}
</style>
