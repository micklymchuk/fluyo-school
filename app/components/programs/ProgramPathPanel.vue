<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'
import UiCard from '~/components/ui/UiCard.vue'
import UiEyebrowPill from '~/components/ui/UiEyebrowPill.vue'
import UiWatermarkField from '~/components/ui/UiWatermarkField.vue'

interface ProgramPathPanelSignal {
  id: string
  label: string
  text: string
}

defineProps<{
  id: string
  anchorId: string
  eyebrow: string
  title: string
  summary: string
  signals: ProgramPathPanelSignal[]
  pricingCtaLabel: string
  pricingCtaTo: string
  telegramCtaLabel: string
  telegramCtaHref: string
}>()

const emit = defineEmits<{
  'pricing-click': []
  'telegram-click': []
}>()
</script>

<template>
  <section
    :id="anchorId"
    class="program-panel"
    :data-program-path="id"
    :aria-labelledby="`program-${id}-title`"
  >
    <UiWatermarkField :seed="`program-path-${id}`" :count="2" />
    <UiCard as="div" class="program-panel__inner">
      <div class="program-panel__copy">
        <UiEyebrowPill class="program-panel__eyebrow" :label="eyebrow" />
        <h2 :id="`program-${id}-title`" class="program-panel__title">
          {{ title }}
        </h2>
        <p class="program-panel__summary">{{ summary }}</p>
      </div>

      <div class="program-panel__signals">
        <article v-for="signal in signals" :key="signal.id" class="program-signal">
          <span class="program-signal__label">{{ signal.label }}</span>
          <p>{{ signal.text }}</p>
        </article>
      </div>

      <div class="program-panel__actions">
        <UiButtonLink
          :to="pricingCtaTo"
          variant="primary"
          @click="emit('pricing-click')"
        >
          {{ pricingCtaLabel }}
        </UiButtonLink>
        <UiButtonLink
          :href="telegramCtaHref"
          external
          variant="secondary"
          @click="emit('telegram-click')"
        >
          {{ telegramCtaLabel }}
        </UiButtonLink>
      </div>
    </UiCard>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.program-panel {
  @apply relative scroll-mt-36 bg-page px-page-gutter py-section-compact text-text;
}

.program-panel__inner {
  @apply relative mx-auto grid w-full max-w-6xl gap-component-gap lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start;
}

.program-panel__copy {
  @apply flex flex-col gap-control-compact;
}

.program-panel__eyebrow {
  @apply self-start;
}

.program-panel__title {
  @apply font-display text-section-heading font-bold uppercase leading-tight tracking-display text-text;
}

.program-panel__summary {
  @apply text-body text-text-muted;
}

.program-panel__signals {
  @apply grid gap-control-compact;
}

/* The brand underline-list gesture, applied locally: signals are label+text pairs,
   not the plain strings UiUnderlineList carries. */
.program-signal {
  @apply relative pb-2 text-body text-text-muted;
}

.program-signal::after {
  content: '';

  @apply absolute bottom-0 left-0 h-0.5 w-10 bg-accent-burgundy;
}

.program-signal__label {
  @apply mb-micro-gap block text-eyebrow font-bold uppercase tracking-display text-text;
}

.program-panel__actions {
  @apply flex flex-wrap gap-control-compact lg:col-span-2;
}
</style>
