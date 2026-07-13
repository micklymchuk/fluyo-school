<script setup lang="ts">
import { Instagram, Telegram } from '@iconoir/vue'
import { computed, nextTick, ref, watch } from 'vue'
import HeaderLink from '~/components/navigation/HeaderLink.vue'
import LanguageControl from '~/components/navigation/LanguageControl.vue'
import UiIconButton from '~/components/ui/UiIconButton.vue'
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

const route = useRoute()
const isOpen = ref(false)
const panel = ref<HTMLElement | null>(null)

const instagramTarget = computed(() => props.instagramHref)
const instagramLabel = computed(() => props.instagramLabel)
const { locale } = useLocale()
const telegramContext = computed<CtaContext>(() => ({
  ...(props.telegramContext ?? {}),
  sourceRoute: 'header',
  locale: locale.value
}))
const { url: telegramTarget, trackTelegramClick } = useTelegramCta(telegramContext)

watch(() => route.fullPath, () => {
  isOpen.value = false
})

watch(isOpen, async (open) => {
  if (!open) {
    return
  }

  await nextTick()
  panel.value?.focus()
})

function toggleNav() {
  isOpen.value = !isOpen.value
}

function closeNav() {
  isOpen.value = false
}

function handlePanelTab(event: KeyboardEvent) {
  const panelElement = panel.value

  if (!panelElement) {
    return
  }

  const focusableElements = Array.from(panelElement.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')

  if (focusableElements.length === 0) {
    event.preventDefault()
    panelElement.focus()
    return
  }

  const firstElement = focusableElements[0]!
  const lastElement = focusableElements[focusableElements.length - 1]!

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
    return
  }

  if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

</script>

<template>
  <div class="mobile-nav">
    <button
      class="mobile-nav-trigger"
      :class="{ 'mobile-nav-trigger--open': isOpen }"
      type="button"
      aria-controls="mobile-nav-panel"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Close menu' : 'Open menu'"
      @click="toggleNav"
    >
      <span class="visually-hidden">{{ isOpen ? 'Close menu' : 'Open menu' }}</span>
      <span class="mobile-nav-icon" aria-hidden="true">
        <span />
        <span />
      </span>
    </button>

    <Transition name="mobile-nav-panel">
      <div
        v-if="isOpen"
        id="mobile-nav-panel"
        ref="panel"
        class="mobile-panel"
        tabindex="-1"
        @keydown.esc="closeNav"
        @keydown.tab="handlePanelTab"
      >
        <nav class="mobile-link-list" aria-label="Primary mobile navigation">
          <HeaderLink
            v-for="link in primaryNavigationLinks"
            :key="link.to"
            :to="link.to"
            :label="link.label"
            display="mobile"
            @click="closeNav"
          />
        </nav>

        <div class="mobile-actions">
          <slot name="language-control">
            <LanguageControl />
          </slot>
          <div class="mobile-social-actions">
            <UiIconButton
              :href="instagramTarget"
              :icon="Instagram"
              :label="instagramLabel"
              external
              variant="ghost"
            />
            <UiIconButton
              class="mobile-telegram"
              :href="telegramTarget"
              :icon="Telegram"
              :label="telegramLabel"
              external
              variant="primary"
              @click="trackTelegramClick"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.mobile-nav {
  @apply relative lg:hidden;
}

.mobile-nav-trigger {
  @apply flex min-h-11 min-w-11 appearance-none items-center justify-center rounded-control border-0 bg-transparent text-text transition-colors duration-short ease-standard;
}

.mobile-nav-trigger:hover {
  @apply text-accent-burgundy;
}

.mobile-nav-icon {
  @apply relative size-5;
}

.mobile-nav-icon span {
  @apply absolute left-0 top-1/2 block h-px w-full bg-current transition-transform duration-medium ease-standard;
}

.mobile-nav-icon span:first-child {
  @apply -translate-y-1;
}

.mobile-nav-icon span:last-child {
  @apply translate-y-1;
}

.mobile-nav-trigger--open .mobile-nav-icon span:first-child {
  @apply translate-y-0 rotate-45;
}

.mobile-nav-trigger--open .mobile-nav-icon span:last-child {
  @apply translate-y-0 -rotate-45;
}

.mobile-panel {
  @apply fixed inset-x-0 bottom-0 top-16 z-mobile-menu flex w-full flex-col overflow-y-auto bg-surface px-page-gutter pb-page-gutter text-text;
}

.mobile-link-list {
  @apply flex flex-1 flex-col items-center justify-center gap-control-compact text-center;
}

.mobile-actions {
  @apply flex flex-col items-center gap-control-compact pb-section-compact;
}

.mobile-social-actions {
  @apply flex items-center justify-center gap-control-compact;
}

.mobile-telegram {
  @apply shrink-0;
}

.mobile-nav-panel-enter-active,
.mobile-nav-panel-leave-active {
  @apply transition-opacity duration-short ease-standard;
}

.mobile-nav-panel-enter-from,
.mobile-nav-panel-leave-to {
  @apply opacity-0;
}
</style>
