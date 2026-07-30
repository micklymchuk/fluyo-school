<script setup lang="ts">
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiNoteCard from '~/components/ui/UiNoteCard.vue'
import UiSticker from '~/components/ui/UiSticker.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()
const telegramContext = computed<CtaContext>(() => ({
  path: 'speaking-club',
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
      <h2 id="home-speaking-club-title" class="speaking-club__title">
        <span class="speaking-club__caps">{{ t('homeSections.speakingClub.capsWord') }}</span>
        <span class="speaking-club__script">{{ t('homeSections.speakingClub.scriptWord') }}</span>
      </h2>

      <div class="speaking-club__collage">
        <UiSticker
          class="speaking-club__sticker"
          src="/images/home/sticker-cat.png"
          :width="488"
          :height="640"
          :rotate="-3"
        />
        <UiNoteCard class="speaking-club__note" :text="t('homeSections.speakingClub.noteText')" />
      </div>

      <p class="speaking-club__line">{{ t('homeSections.speakingClub.line') }}</p>
      <UiButtonLink
        class="speaking-club__cta"
        :href="telegramTarget"
        external
        variant="secondary"
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

/* Tight vertical stack: headline → sticker/note collage → line → button read as one unit. */
.speaking-club__container {
  @apply relative mx-auto flex w-full max-w-6xl flex-col items-center gap-component-gap px-page-gutter text-center;
}

.speaking-club__title {
  @apply flex flex-wrap items-baseline justify-center gap-x-4;
}

/* Poster-scale wordmark, echoing the SPEAKING club post typography.
   Inline baseline pairing (caps + script on one line) — outside UiLockupHeading's
   stacked-lines contract, so the h2 stays local, backed by the shared poster tokens. */
.speaking-club__caps {
  @apply font-display font-bold uppercase tracking-display text-accent-burgundy;
  @apply text-poster-caps sm:text-poster-caps-sm lg:text-poster-caps-lg;
}

.speaking-club__script {
  @apply font-script text-accent-burgundy;
  @apply text-poster-script sm:text-poster-script-sm lg:text-poster-script-lg;
}

/* Collage anchored to the lockup: the cat tucks up under the headline baseline
   and the note leans against it instead of floating in the stack. */
.speaking-club__collage {
  @apply -mt-2 flex flex-wrap items-center justify-center gap-x-component-gap gap-y-control-compact;
}

.speaking-club__sticker {
  @apply w-48 sm:w-64;
}

.speaking-club__note {
  @apply -ml-6 sm:-ml-10;
}

.speaking-club__line {
  @apply max-w-2xl text-body text-text-muted;
}
</style>
