<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'

withDefaults(defineProps<{
  id: string
  label: string
  value: string
  includedLabel: string
  caption: string
  ctaLabel: string
  ctaHref: string
  highlighted?: boolean
}>(), {
  highlighted: false
})

const emit = defineEmits<{
  'cta-click': []
}>()
</script>

<template>
  <UiCard
    class="start-offer"
    :data-pricing-start-offer="id"
    :selected="highlighted"
    :aria-labelledby="`start-offer-${id}-title`"
  >
    <h3 :id="`start-offer-${id}-title`" class="start-offer__label">{{ label }}</h3>
    <strong class="start-offer__value">{{ value }}</strong>
    <p class="start-offer__included">
      <span class="start-offer__included-label">{{ includedLabel }}</span>
      {{ caption }}
    </p>

    <div class="start-offer__actions">
      <UiButtonLink
        :href="ctaHref"
        external
        :variant="highlighted ? 'primary' : 'secondary'"
        @click="emit('cta-click')"
      >
        {{ ctaLabel }}
      </UiButtonLink>
    </div>
  </UiCard>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.start-offer {
  @apply flex flex-col gap-control-compact;
}

.start-offer__label {
  @apply text-eyebrow font-bold uppercase tracking-display text-accent-burgundy;
}

.start-offer__value {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.start-offer__included {
  @apply grow text-body text-text-muted;
}

.start-offer__included-label {
  @apply mr-micro-gap font-bold uppercase text-eyebrow text-text;
}

.start-offer__actions {
  @apply mt-auto flex flex-wrap gap-control-compact;
}
</style>
