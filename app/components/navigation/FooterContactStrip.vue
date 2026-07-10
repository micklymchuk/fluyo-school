<script setup lang="ts">
import { Instagram, Telegram } from '@iconoir/vue'
import { computed } from 'vue'
import UiIconButton from '~/components/ui/UiIconButton.vue'
import UiLogo from '~/components/ui/UiLogo.vue'
import { instagramAction, primaryNavigationLinks, telegramAction } from './navigationLinks'

const props = withDefaults(defineProps<{
  instagramHref?: string
  instagramLabel?: string
  telegramHref?: string
  telegramLabel?: string
}>(), {
  instagramHref: instagramAction.href,
  instagramLabel: instagramAction.label,
  telegramHref: telegramAction.href,
  telegramLabel: telegramAction.label
})

const instagramTarget = computed(() => props.instagramHref)
const instagramLabel = computed(() => props.instagramLabel)
const telegramTarget = computed(() => props.telegramHref)
const telegramLabel = computed(() => props.telegramLabel)
</script>

<template>
  <footer class="footer-contact-strip">
    <div class="footer-inner">
      <UiLogo class="footer-brand" to="/" variant="full" size="large" />

      <nav class="footer-links" aria-label="Footer navigation">
        <NuxtLink
          v-for="link in primaryNavigationLinks"
          :key="link.to"
          class="footer-link"
          :to="link.to"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="footer-actions">
        <UiIconButton
          :href="instagramTarget"
          :icon="Instagram"
          :label="instagramLabel"
          external
          size="compact"
          variant="ghost"
        />
        <UiIconButton
          :href="telegramTarget"
          :icon="Telegram"
          :label="telegramLabel"
          external
          size="compact"
          variant="primary"
        />
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.footer-contact-strip {
  @apply border-t border-border-hairline bg-surface text-text;
}

.footer-inner {
  @apply mx-auto flex w-full max-w-6xl flex-col gap-component-gap px-page-gutter py-section-compact md:flex-row md:items-center;
}

.footer-links {
  @apply flex flex-wrap gap-x-component-gap gap-y-control-compact md:ml-auto;
}

.footer-link {
  @apply inline-flex min-h-11 items-center text-small font-medium text-text-muted no-underline transition-colors duration-short ease-standard;
}

.footer-link:hover {
  @apply text-accent-burgundy;
}

.footer-actions {
  @apply flex flex-wrap gap-control-compact;
}
</style>
