<script setup lang="ts">
import { computed, useSlots } from 'vue'

type LockupLevel = 'h1' | 'h2' | 'h3'
type LockupAlign = 'start' | 'center'

const props = withDefaults(defineProps<{
  level?: LockupLevel
  script?: string
  caps?: string
  accent?: boolean
  align?: LockupAlign
  inverse?: boolean
}>(), {
  accent: false,
  align: 'start',
  caps: undefined,
  inverse: false,
  level: 'h2',
  script: undefined
})

const slots = useSlots()
const hasScript = computed(() => Boolean(props.script || slots.script))
const hasCaps = computed(() => Boolean(props.caps || slots.caps))
const hasContent = computed(() => hasScript.value || hasCaps.value)

if (import.meta.dev && props.script && /[Ѐ-ӿ]/.test(props.script)) {
  console.warn('[UiLockupHeading] script content must be Latin — Pinyon Script has no Cyrillic glyphs')
}
</script>

<template>
  <component
    :is="level"
    v-if="hasContent"
    class="lockup"
    :class="[
      `lockup--${align}`,
      { 'lockup--inverse': inverse }
    ]"
  >
    <!-- Script lines set Latin content only: Pinyon has no Cyrillic glyphs. -->
    <span v-if="!accent && hasScript" class="lockup-script">
      <slot name="script">{{ script }}</slot>
    </span>
    <span v-if="hasCaps || (accent && hasScript)" class="lockup-caps">
      <slot name="caps">{{ caps }}</slot>
      <span v-if="accent && hasScript" class="lockup-script lockup-script--accent">
        <slot name="script">{{ script }}</slot>
      </span>
    </span>
  </component>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.lockup {
  @apply flex flex-col items-start gap-micro-gap text-text;
}

.lockup--center {
  @apply items-center text-center;
}

.lockup-script {
  @apply font-script text-lockup-script font-normal text-accent-burgundy;
}

.lockup-caps {
  @apply font-display text-lockup-caps font-bold uppercase tracking-display;
}

.lockup-script--accent {
  @apply normal-case tracking-normal;
}

.lockup--inverse .lockup-script,
.lockup--inverse .lockup-caps {
  @apply text-text-inverse;
}
</style>
