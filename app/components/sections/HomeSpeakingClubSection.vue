<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const telegramContext = computed<CtaContext>(() => ({
  path: 'adult',
  format: 'speaking-club',
  sourceRoute: 'section',
  locale: locale.value,
  messageIntent: 'ask_program'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <section id="speaking-club" class="speaking-club" aria-labelledby="home-speaking-club-title">
    <UiWatermark />
    <div class="speaking-club__container">
      <div class="speaking-club__lockup">
        <h2 id="home-speaking-club-title" class="speaking-club__title">
          <span class="speaking-club__caps">{{ t('homeSections.speakingClub.capsWord') }}</span>
          <span class="speaking-club__script">{{ t('homeSections.speakingClub.scriptWord') }}</span>
        </h2>
        <img
          class="speaking-club__sticker"
          src="/images/home/sticker-cat.png"
          width="488"
          height="640"
          alt=""
          aria-hidden="true"
        >
      </div>
      <p class="speaking-club__line">{{ t('homeSections.speakingClub.line') }}</p>
      <UiButtonLink
        class="speaking-club__cta"
        :href="telegramTarget"
        external
        variant="primary"
        @click="trackTelegramClick"
      >
        {{ t('homeSections.speakingClub.telegramCta') }}
      </UiButtonLink>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.speaking-club {
  @apply relative bg-page py-section text-text;
}

.speaking-club__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col items-center gap-component-gap px-page-gutter text-center;
}

.speaking-club__lockup {
  @apply flex flex-wrap items-center justify-center gap-x-6 gap-y-2;
}

.speaking-club__title {
  @apply flex flex-wrap items-baseline justify-center gap-x-4;
}

/* Poster-scale wordmark, echoing the SPEAKING club post typography. */
.speaking-club__caps {
  @apply font-display font-bold uppercase tracking-display text-accent-burgundy;
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  line-height: 1;
}

.speaking-club__script {
  @apply font-script text-accent-burgundy;
  font-size: clamp(2.25rem, 7vw, 5rem);
  line-height: 1;
}

.speaking-club__sticker {
  @apply h-auto w-24 -rotate-3 sm:w-32;
}

.speaking-club__line {
  @apply max-w-2xl text-body text-text-muted;
}
</style>
