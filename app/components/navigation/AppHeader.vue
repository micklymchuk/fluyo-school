<script setup lang="ts">
import { Instagram, Telegram } from '@iconoir/vue'
import { computed } from 'vue'
import HeaderLink from '~/components/navigation/HeaderLink.vue'
import LanguageControl from '~/components/navigation/LanguageControl.vue'
import MobileNav from '~/components/navigation/MobileNav.vue'
import UiIconButton from '~/components/ui/UiIconButton.vue'
import UiLogo from '~/components/ui/UiLogo.vue'
import type { CtaContext } from '~/data/content'
import type { Locale } from '~/data/content'
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
const { locale, setLocale } = useLocale()
const telegramContext = computed<CtaContext>(() => ({
  ...(props.telegramContext ?? {}),
  sourceRoute: 'header',
  locale: locale.value
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)

function handleLocaleChange(nextLocale: Locale) {
  void setLocale(nextLocale)
}
</script>

<template>
  <header class="app-header">
    <a class="skip-link" href="#main-content">{{ t('navigation.skipToContent') }}</a>
    <div class="header-inner">
      <UiLogo class="brand-logo brand-logo--short" to="/" variant="short" size="compact" />
      <UiLogo class="brand-logo brand-logo--full" to="/" variant="full" size="compact" />

      <nav class="desktop-nav" :aria-label="t('navigation.primary')">
        <HeaderLink
          v-for="link in primaryNavigationLinks"
          :key="link.to"
          :to="link.to"
          :label="t(link.labelKey)"
          display="desktop"
        />
      </nav>

      <div class="header-actions">
        <slot name="language-control">
          <LanguageControl :model-value="locale" @change="handleLocaleChange" />
        </slot>
        <UiIconButton
          class="instagram-link"
          :href="instagramTarget"
          :icon="Instagram"
          :label="instagramLabel"
          external
          size="compact"
          variant="ghost"
        />
        <UiIconButton
          class="telegram-cta"
          :href="telegramTarget"
          :icon="Telegram"
          :label="telegramLabel"
          external
          size="compact"
          variant="primary"
          @click="trackTelegramClick"
        />
      </div>

      <MobileNav
        class="mobile-nav-shell"
        :instagram-href="instagramTarget"
        :instagram-label="instagramLabel"
        :telegram-context="telegramContext"
        :telegram-label="telegramLabel"
      >
        <template #language-control>
          <slot name="language-control">
            <LanguageControl :model-value="locale" @change="handleLocaleChange" />
          </slot>
        </template>
      </MobileNav>
    </div>
  </header>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.app-header {
  @apply sticky top-0 z-header bg-page text-text;
}

.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:left-page-gutter focus:top-page-gutter focus:z-overlay focus:rounded-control focus:bg-surface focus:px-4 focus:py-3 focus:text-text;
}

.header-inner {
  @apply mx-auto flex min-h-16 w-full max-w-6xl items-center gap-component-gap px-page-gutter;
}

.brand-logo--short {
  @apply inline-flex sm:hidden;
}

.brand-logo--full {
  @apply hidden sm:inline-flex;
}

.desktop-nav {
  @apply ml-auto hidden items-center gap-4 lg:flex;
}

.header-actions {
  @apply ml-auto hidden items-center gap-2 lg:flex;
}

.mobile-nav-shell {
  @apply ml-auto lg:hidden;
}
</style>
