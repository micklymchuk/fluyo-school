<script setup lang="ts">
type HeaderLinkDisplay = 'desktop' | 'mobile' | 'menu'

const props = withDefaults(defineProps<{
  to: string
  label: string
  display?: HeaderLinkDisplay
}>(), {
  display: 'desktop'
})

const localizedTo = useLocalizedTo()
const { isActiveDestination } = useNavigationActive()
</script>

<template>
  <NuxtLink
    class="header-link"
    :class="[
      `header-link--${display}`,
      { 'header-link--active': isActiveDestination(props.to) }
    ]"
    :to="localizedTo(props.to)"
    :aria-current="isActiveDestination(props.to) ? 'page' : undefined"
  >
    {{ label }}
  </NuxtLink>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Every nav destination is a pill button — no underline rule anywhere. */
.header-link {
  @apply inline-flex min-h-8 items-center rounded-pill text-small font-medium text-text-muted no-underline transition-colors duration-short ease-standard;
}

.header-link--desktop {
  @apply min-h-9 px-4;
}

.header-link--mobile {
  @apply min-h-11 justify-center px-4 text-center text-body;
}

/* Row inside a dropdown panel: full-width target. */
.header-link--menu {
  @apply min-h-11 w-full justify-start px-4 text-small;
}

.header-link:hover,
.header-link--active {
  @apply text-accent-burgundy;
}

/* The chip tone follows the surface underneath: the header and the mobile panel
   sit on the cream page, the dropdown panel on a white one. */
.header-link--desktop:hover,
.header-link--desktop.header-link--active,
.header-link--mobile:hover,
.header-link--mobile.header-link--active {
  @apply bg-surface;
}

.header-link--menu:hover,
.header-link--menu.header-link--active {
  @apply bg-surface-muted;
}
</style>
