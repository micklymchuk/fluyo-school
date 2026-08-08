<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'

defineProps<{
  trackId: string
  tierId: string
  lessonLabel: string
  total: string
  totalLabel: string
  perLesson: string
  popular: boolean
  popularLabel: string
  ctaLabel: string
  ctaHref: string
}>()

const emit = defineEmits<{
  'cta-click': []
}>()
</script>

<template>
  <UiCard
    class="package-card"
    :data-pricing-package="tierId"
    :selected="popular"
    :aria-labelledby="`package-${tierId}-title`"
  >
    <header class="package-card__header">
      <h4 :id="`package-${tierId}-title`" class="package-card__lessons">{{ lessonLabel }}</h4>
      <UiEyebrowPill v-if="popular" :label="popularLabel" />
    </header>

    <p class="package-card__total">
      <strong class="package-card__total-value">{{ total }}</strong>
      <span class="package-card__total-label">{{ totalLabel }}</span>
    </p>
    <p class="package-card__per-lesson">{{ perLesson }}</p>

    <div class="package-card__actions">
      <UiButtonLink
        :href="ctaHref"
        external
        variant="secondary"
        @click="emit('cta-click')"
      >
        {{ ctaLabel }}
      </UiButtonLink>
    </div>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.package-card {
  @apply flex flex-col gap-control-compact;
}

.package-card__header {
  @apply flex flex-wrap items-center justify-between gap-control-compact;
}

.package-card__lessons {
  @apply font-display text-card-title font-semibold leading-tight text-text;
}

.package-card__total {
  @apply flex flex-col gap-micro-gap border-t border-border-hairline pt-control-compact;
}

.package-card__total-value {
  @apply font-display text-section-heading font-bold text-accent-burgundy;
}

.package-card__total-label,
.package-card__per-lesson {
  @apply text-small text-text-muted;
}

.package-card__actions {
  @apply mt-auto flex flex-wrap gap-control-compact;
}
</style>
