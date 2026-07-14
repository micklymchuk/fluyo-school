<script setup lang="ts">
import UiButtonLink from '~/components/ui/UiButtonLink.vue'

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
    <div class="program-panel__inner">
      <div class="program-panel__copy">
        <p class="program-panel__eyebrow">{{ eyebrow }}</p>
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
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.program-panel {
  @apply scroll-mt-36 bg-page px-page-gutter py-section-compact text-text;
}

.program-panel__inner {
  @apply mx-auto grid w-full max-w-6xl gap-component-gap border border-border-hairline bg-surface p-card-padding lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start;
}

.program-panel__copy {
  @apply flex flex-col gap-control-compact;
}

.program-panel__eyebrow {
  @apply text-eyebrow font-bold uppercase text-accent-burgundy;
}

.program-panel__title {
  @apply font-display text-section-heading font-semibold leading-tight text-text;
}

.program-panel__summary {
  @apply text-body text-text-muted;
}

.program-panel__signals {
  @apply grid gap-control-compact;
}

.program-signal {
  @apply border-l-2 border-accent-subdued pl-control-compact text-body text-text-muted;
}

.program-signal__label {
  @apply mb-1 block text-eyebrow font-bold uppercase text-text;
}

.program-panel__actions {
  @apply flex flex-wrap gap-control-compact lg:col-span-2;
}
</style>
