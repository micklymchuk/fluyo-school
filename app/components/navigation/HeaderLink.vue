<script setup lang="ts">
type HeaderLinkDisplay = 'desktop' | 'mobile'

const props = withDefaults(defineProps<{
  to: string
  label: string
  display?: HeaderLinkDisplay
}>(), {
  display: 'desktop'
})

const route = useRoute()
const localizedTo = useLocalizedTo()

function isActiveRoute(to: string) {
  if (to === '/') {
    return route.path === '/'
  }

  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <NuxtLink
    class="header-link"
    :class="[
      `header-link--${display}`,
      { 'header-link--active': isActiveRoute(props.to) }
    ]"
    :to="localizedTo(props.to)"
    :aria-current="isActiveRoute(props.to) ? 'page' : undefined"
  >
    {{ label }}
  </NuxtLink>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.header-link {
  @apply inline-flex min-h-8 items-center border-b border-transparent text-small font-medium text-text-muted no-underline transition-colors duration-short ease-standard;
}

.header-link--desktop {
  @apply px-3;
}

.header-link--mobile {
  @apply min-h-11 justify-center px-3 text-center text-body;
}

.header-link:hover,
.header-link--active {
  @apply border-accent-burgundy text-accent-burgundy;
}
</style>
