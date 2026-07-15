<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
  interactive?: boolean
  selected?: boolean
  hidden?: boolean
}>(), {
  as: 'article',
  hidden: false,
  interactive: false,
  selected: false
})
</script>

<template>
  <component
    :is="props.as"
    v-if="!hidden"
    class="card-surface"
    :class="{
      'card-surface--interactive': interactive,
      'card-surface--selected': selected
    }"
    :aria-selected="selected ? 'true' : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.card-surface {
  @apply rounded-card border border-border-hairline bg-surface p-card-padding text-text;
}

.card-surface--interactive {
  @apply transition-colors duration-short ease-standard;
}

.card-surface--interactive:hover {
  @apply border-accent-subdued bg-surface-muted;
}

.card-surface--selected {
  @apply border-accent-burgundy bg-surface-muted;
}
</style>
