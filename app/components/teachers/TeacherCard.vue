<script setup lang="ts">
import UiUnderlineList from '~/components/ui/UiUnderlineList.vue'

defineProps<{
  id: string
  initials: string
  name: string
  role: string
  bio: string
  fitLabel: string
  fitItems: string[]
  credentials: string[]
}>()
</script>

<template>
  <article class="teacher-card" :aria-labelledby="`teacher-${id}-name`">
    <div class="teacher-card__portrait" aria-hidden="true">
      <span class="teacher-card__initials">{{ initials }}</span>
    </div>
    <h3 :id="`teacher-${id}-name`" class="teacher-card__name">{{ name }}</h3>
    <p class="teacher-card__role">{{ role }}</p>
    <p class="teacher-card__bio">{{ bio }}</p>
    <div v-if="fitItems.length" class="teacher-card__fit">
      <span class="teacher-card__fit-label">{{ fitLabel }}</span>
      <UiUnderlineList class="teacher-card__fit-list" :items="fitItems" />
    </div>
    <UiUnderlineList
      v-if="credentials.length"
      class="teacher-card__credentials"
      :items="credentials"
    />
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teacher-card {
  @apply flex flex-col gap-control-compact border-t border-border-hairline pt-control-compact;
}

.teacher-card__portrait {
  @apply flex aspect-square w-portrait items-center justify-center rounded-default bg-surface-muted;
}

.teacher-card__initials {
  @apply font-display text-section-heading font-semibold text-accent-burgundy;
}

.teacher-card__name {
  @apply font-display text-card-title font-semibold text-text;
}

.teacher-card__role {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.teacher-card__bio {
  @apply text-body text-text-muted;
}

.teacher-card__fit {
  @apply flex flex-col gap-micro-gap;
}

.teacher-card__fit-label {
  @apply text-eyebrow font-bold uppercase tracking-display text-text;
}

.teacher-card__fit-list,
.teacher-card__credentials {
  @apply text-small text-text-muted;
}
</style>
