<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'

interface PricingFormatCardPrice {
  id: string
  label: string
  value: string
  caption: string
}

defineProps<{
  id: string
  title: string
  recommended: boolean
  recommendedLabel: string
  prices: PricingFormatCardPrice[]
  fitLabel: string
  fit: string
  termsLabel: string
  terms: string
  ctaLabel: string
  ctaHref: string
}>()

const emit = defineEmits<{
  'cta-click': []
}>()
</script>

<template>
  <UiCard
    class="format-block"
    :data-pricing-format="id"
    :aria-labelledby="`format-${id}-title`"
  >
    <header class="format-block__header">
      <h3 :id="`format-${id}-title`" class="format-block__title">{{ title }}</h3>
      <UiEyebrowPill v-if="recommended" :label="recommendedLabel" />
    </header>

    <div class="format-block__prices">
      <div v-for="price in prices" :key="price.id" class="format-price">
        <span class="format-price__label">{{ price.label }}</span>
        <strong class="format-price__value">{{ price.value }}</strong>
        <span class="format-price__caption">{{ price.caption }}</span>
      </div>
    </div>

    <p class="format-block__signal">
      <span class="format-block__signal-label">{{ fitLabel }}</span>
      {{ fit }}
    </p>
    <p class="format-block__signal">
      <span class="format-block__signal-label">{{ termsLabel }}</span>
      {{ terms }}
    </p>

    <div class="format-block__actions">
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

.format-block {
  @apply flex flex-col gap-control-compact;
}

.format-block__header {
  @apply flex flex-wrap items-center justify-between gap-control-compact;
}

.format-block__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.format-block__prices {
  @apply grid gap-control-compact;
}

.format-price {
  @apply flex flex-col gap-micro-gap border-t border-border-hairline pt-control-compact;
}

.format-price__label,
.format-price__caption {
  @apply text-small text-text-muted;
}

.format-price__value {
  @apply text-body font-semibold text-text;
}

/* The brand underline-list gesture: signals are label+text pairs, not UiUnderlineList strings. */
.format-block__signal {
  @apply relative pb-2 text-body text-text-muted;
}

.format-block__signal::after {
  content: '';

  @apply absolute bottom-0 left-0 h-0.5 w-10 bg-accent-burgundy;
}

.format-block__signal-label {
  @apply mb-micro-gap block text-eyebrow font-bold uppercase tracking-display text-text;
}

.format-block__actions {
  @apply mt-auto flex flex-wrap gap-control-compact;
}
</style>
