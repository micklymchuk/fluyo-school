<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <p class="note-card">
    <span class="note-card__inner">{{ text }}</span>
  </p>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

/* Tilted burgundy note with a cream inner — the brand-voice collage moment. */
.note-card {
  @apply inline-block max-w-64 rotate-3 bg-accent-burgundy p-2 shadow-md;
}

.note-card__inner {
  @apply block bg-surface-muted px-4 py-3 text-center font-display text-small font-bold uppercase tracking-display text-text;
}
</style>
