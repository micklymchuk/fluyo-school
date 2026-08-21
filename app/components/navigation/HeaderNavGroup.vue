<script setup lang="ts">
import { NavArrowDown } from '@iconoir/vue'
import { computed } from 'vue'
import HeaderLink from '~/components/navigation/HeaderLink.vue'
import UiDropdownSelect from '~/components/ui/UiDropdownSelect.vue'

type NavGroupItem = {
  to: string
  label: string
}

const props = defineProps<{
  label: string
  items: NavGroupItem[]
}>()

const { isActiveDestination } = useNavigationActive()

const dropdownItems = computed(() => props.items.map((item) => ({
  id: item.to,
  label: item.label
})))

// The trigger and the row highlight together, so the visitor can see which
// section behind the group they are currently in.
const selectedId = computed(() => {
  return props.items.find((item) => isActiveDestination(item.to))?.to
})
</script>

<template>
  <UiDropdownSelect
    class="header-nav-group"
    :items="dropdownItems"
    :label="label"
    :selected-id="selectedId"
  >
    <template #anchor="{ toggle, open, selected }">
      <button
        class="header-nav-trigger"
        :class="{ 'header-nav-trigger--active': selected || open }"
        type="button"
        :aria-expanded="open"
        @click="toggle"
      >
        {{ label }}
        <NavArrowDown
          class="header-nav-trigger__caret"
          :class="{ 'header-nav-trigger__caret--open': open }"
          :width="16"
          :height="16"
          aria-hidden="true"
        />
      </button>
    </template>

    <template #item="{ item, close }">
      <HeaderLink
        :to="item.id"
        :label="item.label"
        display="menu"
        @click="close"
      />
    </template>
  </UiDropdownSelect>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Trigger matches the flat header links, plus a caret for the dropdown. */
.header-nav-trigger {
  @apply inline-flex min-h-9 cursor-pointer appearance-none items-center gap-1 rounded-pill border-0 bg-transparent px-4 text-small font-medium text-text-muted transition-colors duration-short ease-standard;
}

.header-nav-trigger:hover,
.header-nav-trigger--active {
  @apply bg-surface text-accent-burgundy;
}

.header-nav-trigger__caret {
  @apply shrink-0 transition-transform duration-short ease-standard;
}

.header-nav-trigger__caret--open {
  @apply -rotate-180;
}
</style>
