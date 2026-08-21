<script setup lang="ts">
import { ChatBubble, Telegram } from '@iconoir/vue'
import { computed } from 'vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()

const telegramContext = computed<CtaContext>(() => ({
  path: 'speaking-club',
  format: 'speaking-club',
  sourceRoute: 'section',
  locale: locale.value,
  messageIntent: 'book_speaking_club'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <div class="club-body">
    <!-- Framed callout: speech bubble + poster-voice promise, echoing the SPEAKING club post. -->
    <div class="club-body__frame">
      <ChatBubble class="club-body__glyph" :width="44" :height="44" aria-hidden="true" />
      <p class="club-body__eyebrow">{{ t('homeSections.speakingClub.bodyEyebrow') }}</p>
    </div>

    <i18n-t
      keypath="homeSections.speakingClub.bodyText"
      tag="p"
      class="club-body__text"
      scope="global"
    >
      <template #brand>
        <strong class="club-body__brand">{{ t('homeSections.speakingClub.bodyBrand') }}</strong>
      </template>
    </i18n-t>

    <UiButtonLink
      class="club-body__cta"
      :href="telegramTarget"
      external
      variant="secondary"
      @click="trackTelegramClick"
    >
      <span class="club-body__cta-inner">
        <Telegram class="club-body__cta-icon" :width="18" :height="18" aria-hidden="true" />
        {{ t('homeSections.speakingClub.telegramCta') }}
      </span>
    </UiButtonLink>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Right-hand column of the Speaking club lockup: the club promise, spoken plainly. */
.club-body {
  @apply flex w-full max-w-xl flex-col items-center gap-8 text-center;
}

.club-body__frame {
  @apply flex flex-col items-center max-w-xs gap-4 border-4 border-accent-burgundy p-4 text-accent-burgundy sm:px-4;
}

.club-body__glyph {
  @apply text-accent-burgundy;
}

/* Poster headline inside the frame — the emphatic beat of the callout. */
.club-body__eyebrow {
  @apply text-balance font-display text-card-title font-bold leading-tight tracking-display text-accent-burgundy;
}

.club-body__text {
  @apply text-body text-text-muted;
}

.club-body__brand {
  @apply font-semibold text-accent-burgundy;
}

/* Keep the Telegram glyph and label locked on one baseline. */
.club-body__cta-inner {
  @apply flex items-center gap-2;
}

.club-body__cta-icon {
  @apply shrink-0;
}
</style>
