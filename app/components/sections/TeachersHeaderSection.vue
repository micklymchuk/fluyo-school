<script setup lang="ts">
import UiSection from '~/components/sections/UiSection.vue'

const { t } = useI18n()
</script>

<template>
  <UiSection
    class="teachers-page__header"
    variant="spacious"
    :eyebrow="t('pages.teachers.intro.eyebrow')"
    :title="t('pages.teachers.intro.heading')"
    :description="t('pages.teachers.intro.summary')"
  >
    <p class="trust-note">{{ t('teachersSections.header.trustNote') }}</p>
  </UiSection>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.trust-note {
  @apply max-w-2xl border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}
</style>
