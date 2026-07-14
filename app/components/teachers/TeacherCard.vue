<script setup lang="ts">
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
    <p v-if="fitItems.length" class="teacher-card__fit">
      <span class="teacher-card__fit-label">{{ fitLabel }}</span>
      <span v-for="(fitItem, fitIndex) in fitItems" :key="fitIndex" class="teacher-card__fit-item">
        {{ fitItem }}
      </span>
    </p>
    <ul v-if="credentials.length" class="teacher-card__credentials">
      <li v-for="(credential, credentialIndex) in credentials" :key="credentialIndex" class="teacher-card__credential">
        {{ credential }}
      </li>
    </ul>
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.teacher-card {
  @apply flex flex-col gap-control-compact border-t border-border-hairline pt-control-compact;
}

.teacher-card__portrait {
  @apply flex aspect-square w-20 items-center justify-center rounded-default bg-surface-muted;
}

.teacher-card__initials {
  @apply font-display text-section-heading font-semibold text-accent-burgundy;
}

.teacher-card__name {
  @apply font-display text-[1.35rem] font-semibold leading-tight text-text;
}

.teacher-card__role {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.teacher-card__bio {
  @apply text-body text-text-muted;
}

.teacher-card__fit {
  @apply flex flex-wrap items-baseline gap-1 text-small text-text-muted;
}

.teacher-card__fit-label {
  @apply font-bold uppercase text-text;
}

.teacher-card__fit-item {
  @apply text-small text-text-muted;
}

.teacher-card__credentials {
  @apply flex flex-wrap gap-1;
}

.teacher-card__credential {
  @apply rounded-default border border-border-hairline bg-surface-muted px-2 py-1 text-small text-text;
}
</style>
