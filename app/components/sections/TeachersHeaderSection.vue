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

/* Brand underline accent (short burgundy rule) instead of the old left border. */
.trust-note {
  @apply relative max-w-2xl pb-2 text-body text-text-muted;
}

.trust-note::after {
  content: '';

  @apply absolute bottom-0 left-0 h-0.5 w-10 bg-accent-burgundy;
}
</style>
