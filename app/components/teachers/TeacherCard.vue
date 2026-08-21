<script setup lang="ts">
import UiCard from '~/components/ui/UiCard.vue'

defineProps<{
  avatar: string
  avatarAlt: string
  name: string
  role: string
  description: string
}>()
</script>

<template>
  <UiCard class="teacher-card">
    <!-- Cut-out portrait sits in a blush disc, bottom-aligned so the outline stands on the base. -->
    <div class="teacher-card__avatar">
      <img
        class="teacher-card__img"
        :src="avatar"
        :alt="avatarAlt"
        loading="lazy"
        decoding="async"
      >
    </div>

    <div class="teacher-card__body">
      <h3 class="teacher-card__name">{{ name }}</h3>
      <!-- The role line carries the founder wording, so no separate badge sits beside the name. -->
      <p class="teacher-card__role">{{ role }}</p>
      <p class="teacher-card__description">{{ description }}</p>
    </div>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teacher-card {
  @apply flex flex-col items-center gap-control-compact text-center;
}

.teacher-card__avatar {
  @apply flex aspect-square w-32 items-end justify-center overflow-hidden rounded-full bg-accent-subdued sm:w-36;
}

.teacher-card__img {
  @apply block h-full w-full object-contain object-bottom;
}

.teacher-card__body {
  @apply flex grow flex-col gap-2;
}

.teacher-card__name {
  @apply font-display text-card-title font-bold uppercase leading-compact tracking-display text-accent-burgundy;
}

.teacher-card__role {
  @apply text-eyebrow font-bold uppercase tracking-display text-text-muted;
}

.teacher-card__description {
  @apply text-body text-text-muted;
}
</style>
