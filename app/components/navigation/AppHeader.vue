<script setup lang="ts">
import { Instagram, Telegram } from '@iconoir/vue'
import { computed } from 'vue'
import HeaderLink from '~/components/navigation/HeaderLink.vue'
import HeaderNavGroup from '~/components/navigation/HeaderNavGroup.vue'
import LanguageControl from '~/components/navigation/LanguageControl.vue'
import MobileNav from '~/components/navigation/MobileNav.vue'
import UiIconButton from '~/components/ui/UiIconButton.vue'
import UiLogo from '~/components/ui/UiLogo.vue'
import type { CtaContext } from '~/data/content'
import type { Locale } from '~/data/content'
import { instagramAction, isNavigationGroup, telegramAction } from './navigationLinks'

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
// Filter nav to the available-pages allowlist. showNav is false when home is
// the only available page → the header collapses to logo + inline actions (D4).
const { entries, links, showNav } = useNavigationLinks()

// In anchor mode, scrollspy the sections that have menu items so the active nav
// item tracks the user's scroll position (one IntersectionObserver, shared).
const spySectionIds = links
  .filter((link) => link.to.includes('#'))
  .map((link) => link.to.slice(link.to.indexOf('#') + 1))
useSectionSpy(spySectionIds)
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

      <nav v-if="showNav" class="desktop-nav" :aria-label="t('navigation.primary')">
        <template v-for="entry in entries" :key="entry.labelKey">
          <HeaderNavGroup
            v-if="isNavigationGroup(entry)"
            :label="t(entry.labelKey)"
            :items="entry.items.map((item) => ({ to: item.to, label: t(item.labelKey) }))"
          />
          <HeaderLink
            v-else
            :to="entry.to"
            :label="t(entry.labelKey)"
            display="desktop"
          />
        </template>
      </nav>

      <div
        class="header-actions"
        :class="showNav ? 'header-actions--collapsible' : 'header-actions--inline'"
      >
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
        v-if="showNav"
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
  @apply ml-auto items-center gap-2;
}

/* Default: actions live on desktop only; mobile surfaces them via the hamburger. */
.header-actions--collapsible {
  @apply hidden lg:flex;
}

/* Collapsed header (home-only): no hamburger, so actions show inline on every breakpoint. */
.header-actions--inline {
  @apply flex;
}

.mobile-nav-shell {
  @apply ml-auto lg:hidden;
}
</style>
