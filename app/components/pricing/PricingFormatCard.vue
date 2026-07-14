<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'

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
  <article
    class="format-block"
    :data-pricing-format="id"
    :aria-labelledby="`format-${id}-title`"
  >
    <header class="format-block__header">
      <h3 :id="`format-${id}-title`" class="format-block__title">{{ title }}</h3>
      <span v-if="recommended" class="format-block__recommended">{{ recommendedLabel }}</span>
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
  </article>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.format-block {
  @apply flex flex-col gap-control-compact border border-border-hairline bg-surface p-card-padding;
}

.format-block__header {
  @apply flex flex-wrap items-baseline justify-between gap-control-compact;
}

.format-block__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.format-block__recommended {
  @apply rounded-default bg-accent-subdued px-2 py-1 text-small font-bold uppercase text-text;
}

.format-block__prices {
  @apply grid gap-control-compact;
}

.format-price {
  @apply flex flex-col gap-1 border-t border-border-hairline pt-control-compact;
}

.format-price__label,
.format-price__caption {
  @apply text-small text-text-muted;
}

.format-price__value {
  @apply text-body font-semibold text-text;
}

.format-block__signal {
  @apply border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}

.format-block__signal-label {
  @apply mb-1 block text-eyebrow font-bold uppercase text-text;
}

.format-block__actions {
  @apply mt-auto flex flex-wrap gap-control-compact;
}
</style>
