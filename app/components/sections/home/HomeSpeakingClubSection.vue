<script setup lang="ts">
import { Globe, Group, Heart, MultiBubble } from '@iconoir/vue'
import { computed } from 'vue'
import HomeSpeakingClubBody from '~/components/sections/home/HomeSpeakingClubBody.vue'
import UiInfoBoard from '~/components/ui/UiInfoBoard.vue'
import UiReveal from '~/components/ui/UiReveal.vue'
import UiInfoInlineMessage from '~/components/ui/UiInfoInlineMessage.vue'
import UiPencilMark from '~/components/ui/UiPencilMark.vue'
import UiSticker from '~/components/ui/UiSticker.vue'

const { t } = useI18n()

const boardIcons = [Group, MultiBubble, Globe, Heart]
const boardItems = computed(() => boardIcons.map((icon, itemIndex) => ({
  id: `speaking-club-fact-${itemIndex}`,
  icon,
  title: t(`homeSections.speakingClub.boardItems[${itemIndex}].title`),
  description: t(`homeSections.speakingClub.boardItems[${itemIndex}].description`)
})))
</script>

<template>
  <section id="speaking-club" class="speaking-club" aria-labelledby="home-speaking-club-title">
    <div class="speaking-club__container">
      <h2 id="home-speaking-club-title" class="speaking-club__title">
        <span class="speaking-club__caps">{{ t('homeSections.speakingClub.capsWord') }}</span>
        <span class="speaking-club__script">
          {{ t('homeSections.speakingClub.scriptWord') }}
          <UiPencilMark class="speaking-club__circle" mark="circle" :delay="220" />
        </span>
      </h2>

      <!-- Poster layout: cat cutout on the left, the club promise body on the right. -->
      <div class="speaking-club__layout">
        <UiSticker
          class="speaking-club__sticker"
          src="/images/home/sticker-cat.png"
          :width="488"
          :height="440"
        />
        <HomeSpeakingClubBody class="speaking-club__body" />
      </div>

      <!-- Board reveals as one unit: its dividers are positional (nth-child), so the
           items must stay direct children of the list. -->
      <UiReveal class="speaking-club__board">
        <UiInfoBoard :items="boardItems" />
      </UiReveal>

      <UiInfoInlineMessage class="speaking-club__note">
        <i18n-t keypath="homeSections.speakingClub.noteText" tag="span" scope="global">
          <template #brand>
            <strong class="speaking-club__note-brand">{{ t('homeSections.speakingClub.noteBrand') }}</strong>
          </template>
        </i18n-t>
      </UiInfoInlineMessage>
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
  @apply relative font-script text-accent-burgundy;
  @apply text-poster-script sm:text-poster-script-sm lg:text-poster-script-lg;
}

/* Stacked on mobile, cat-beside-body from lg where the poster proportions hold. */
.speaking-club__layout {
  @apply lg:mt-16 flex w-full flex-col items-center justify-center gap-component-gap sm:flex-row lg:items-center lg:gap-0;
}

.speaking-club__sticker {
  @apply w-56 shrink-0 sm:w-72 lg:w-96;
}

.speaking-club__body {
  @apply lg:flex-1;
}

.speaking-club__board {
  @apply mt-8 w-full;
}

/* Board layout is the section's call: a 2x2 quadrant until the row fits four across.
   Rules are drawn per position so the pair divider and the row divider stay correct.
   Row breathing room comes from padding, not gap, so the vertical rule crosses unbroken. */
.speaking-club__board :deep(.info-board__list) {
  @apply grid-cols-2 gap-0 lg:grid-cols-4;
}

.speaking-club__board :deep(.info-board__item) {
  @apply px-3 lg:px-5;
}

.speaking-club__board :deep(.info-board__item:nth-child(-n + 2)) {
  @apply pb-8 lg:pb-0;
}

.speaking-club__board :deep(.info-board__item:nth-child(2n)) {
  @apply border-l border-border-hairline;
}

.speaking-club__board :deep(.info-board__item:nth-child(2)) {
  @apply border-t-0 pt-0;
}

.speaking-club__board :deep(.info-board__item:nth-child(n + 3)) {
  @apply border-t border-border-hairline pt-8 lg:border-t-0 lg:pt-0;
}

/* Loops the script word a touch wide of the glyphs, the way you'd ring it by hand.
   Width is stated outright rather than left to a left/right pair: an <svg> is a
   replaced element, and Safari sizes one with no width/height attributes from the
   default 300x150 object size instead of the offsets, which left the ring adrift
   of the word. The height still comes from the mark's own viewBox ratio. */
.speaking-club__circle {
  top: -0.2em;
  left: -0.46em;
  width: calc(100% + 0.92em);
}

.speaking-club__note-brand {
  @apply font-bold text-accent-burgundy;
}
</style>
