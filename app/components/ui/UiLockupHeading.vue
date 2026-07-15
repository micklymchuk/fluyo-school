<script setup lang="ts">
import { computed, useSlots } from 'vue'

type LockupLevel = 'h1' | 'h2' | 'h3'
type LockupAlign = 'start' | 'center'
type LockupSize = 'default' | 'poster' | 'hero'

const props = withDefaults(defineProps<{
  level?: LockupLevel
  script?: string
  caps?: string
  accent?: boolean
  align?: LockupAlign
  inverse?: boolean
  size?: LockupSize
}>(), {
  accent: false,
  align: 'start',
  caps: undefined,
  inverse: false,
  level: 'h2',
  script: undefined,
  size: 'default'
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
      {
        'lockup--inverse': inverse,
        'lockup--poster': size === 'poster',
        'lockup--hero': size === 'hero'
      }
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

/* Size variants change type scale only; slot/emit contract stays identical. */
.lockup--hero .lockup-script {
  @apply text-hero-script sm:text-hero-script-sm lg:text-hero-script-lg;
}

.lockup--hero .lockup-caps {
  @apply max-w-3xl text-hero-caps sm:text-hero-caps-sm lg:text-hero-caps-lg;
}

.lockup--poster .lockup-script {
  @apply text-poster-script sm:text-poster-script-sm lg:text-poster-script-lg;
}

.lockup--poster .lockup-caps {
  @apply text-poster-caps sm:text-poster-caps-sm lg:text-poster-caps-lg;
}

.lockup--inverse .lockup-script,
.lockup--inverse .lockup-caps {
  @apply text-text-inverse;
}
</style>
