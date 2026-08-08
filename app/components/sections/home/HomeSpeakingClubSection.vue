<script setup lang="ts">
import HomeSpeakingClubBody from '~/components/sections/home/HomeSpeakingClubBody.vue'
import UiSticker from '~/components/ui/UiSticker.vue'
import UiWatermark from '~/components/ui/UiWatermark.vue'

const { t } = useI18n()
</script>

<template>
  <section id="speaking-club" class="speaking-club" aria-labelledby="home-speaking-club-title">
    <UiWatermark />
    <div class="speaking-club__container">
      <h2 id="home-speaking-club-title" class="speaking-club__title">
        <span class="speaking-club__caps">{{ t('homeSections.speakingClub.capsWord') }}</span>
        <span class="speaking-club__script">{{ t('homeSections.speakingClub.scriptWord') }}</span>
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
  @apply font-script text-accent-burgundy;
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
</style>
