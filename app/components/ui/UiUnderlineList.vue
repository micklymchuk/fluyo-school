<script setup lang="ts">
withDefaults(defineProps<{
  items: string[]
  inverse?: boolean
}>(), {
  inverse: false
})
</script>

<template>
  <ul
    v-if="items.length"
    class="underline-list"
    :class="{ 'underline-list--inverse': inverse }"
  >
    <li
      v-for="(item, index) in items"
      :key="index"
      class="underline-list__item"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.underline-list {
  @apply m-0 flex list-none flex-col gap-3 p-0 text-body text-text;
}

.underline-list__item {
  @apply relative pb-2;
}

.underline-list__item::after {
  content: '';

  @apply absolute bottom-0 left-0 h-0.5 w-10 bg-accent-burgundy;
}

.underline-list--inverse {
  @apply text-text-inverse;
}

.underline-list--inverse .underline-list__item::after {
  @apply bg-text-inverse;
}
</style>
