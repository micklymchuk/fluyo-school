<script setup lang="ts">
import { Instagram, Telegram } from '@iconoir/vue'
import { computed } from 'vue'
import UiIconButton from '~/components/ui/UiIconButton.vue'
import UiLogo from '~/components/ui/UiLogo.vue'
import type { CtaContext } from '~/data/content'
import { instagramAction, primaryNavigationLinks, telegramAction } from './navigationLinks'

const props = withDefaults(defineProps<{
  instagramHref?: string
  instagramLabel?: string
  telegramContext?: CtaContext
  telegramLabel?: string
}>(), {
  instagramHref: instagramAction.href,
  instagramLabel: instagramAction.label,
  telegramContext: undefined,
  telegramLabel: telegramAction.label
})

const { t } = useI18n()
const instagramTarget = computed(() => props.instagramHref)
const instagramLabel = computed(() => props.instagramLabel)
const telegramLabel = computed(() => props.telegramLabel)
const { locale } = useLocale()
const telegramContext = computed<CtaContext>(() => ({
  ...(props.telegramContext ?? {}),
  sourceRoute: 'footer',
  locale: locale.value
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)
const localizedTo = useLocalizedTo()
// Footer nav reflects the available-pages allowlist; the whole links block is
// hidden when home is the only available page (logo + actions remain).
const { links, showNav } = useNavigationLinks(primaryNavigationLinks)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer-contact-strip">
    <div class="footer-inner">
      <UiLogo class="footer-brand" to="/" variant="full" size="large" />

      <nav v-if="showNav" class="footer-links" :aria-label="t('navigation.footer')">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          class="footer-link"
          :to="localizedTo(link.to)"
        >
          {{ t(link.labelKey) }}
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
          @click="trackTelegramClick"
        />
      </div>
    </div>

    <p class="footer-rights">{{ t('navigation.rights', { year }) }}</p>
  </footer>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.footer-contact-strip {
  @apply border-t border-border-hairline bg-page text-text;
}

.footer-inner {
  @apply mx-auto flex w-full max-w-6xl flex-col gap-component-gap px-page-gutter pt-section-compact pb-component-gap md:flex-row md:items-center;
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

/* ml-auto keeps the actions hard right — beside the nav links when they show,
   directly across from the logo when the nav is collapsed (home-only). */
.footer-actions {
  @apply flex flex-wrap gap-control-compact md:ml-auto;
}

.footer-rights {
  @apply mx-auto w-full max-w-6xl px-page-gutter pb-section-compact text-small text-text-muted;
}
</style>
