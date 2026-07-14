<script setup lang="ts">
import { computed } from 'vue'
import UiSection from '~/components/sections/UiSection.vue'
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import type { CtaContext } from '~/data/content'

const { locale } = useLocale()
const { t } = useI18n()

const telegramContext = computed<CtaContext>(() => ({
  path: 'generic',
  format: 'generic',
  sourceRoute: 'programs',
  locale: locale.value,
  messageIntent: 'ask_program'
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
</script>

<template>
  <UiSection
    class="programs-page__header"
    variant="spacious"
    :eyebrow="t('pages.programs.intro.eyebrow')"
    :title="t('pages.programs.intro.heading')"
    :description="t('pages.programs.intro.summary')"
  >
    <div class="programs-header-actions">
      <UiButtonLink to="/pricing" variant="primary">
        {{ t('programsSections.header.compareCta') }}
      </UiButtonLink>
      <UiButtonLink to="/teachers" variant="secondary">
        {{ t('programsSections.header.teachersCta') }}
      </UiButtonLink>
      <UiButtonLink
        :href="telegramTarget"
        external
        variant="ghost"
        @click="trackTelegramClick"
      >
        {{ t('programsSections.header.telegramCta') }}
      </UiButtonLink>
    </div>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.programs-header-actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
