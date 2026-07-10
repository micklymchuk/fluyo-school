<script setup lang="ts">
import { ref, watch } from 'vue'

type LocaleCode = 'uk' | 'en'

const props = withDefaults(defineProps<{
  modelValue?: LocaleCode
}>(), {
  modelValue: 'uk'
})

const emit = defineEmits<{
  'update:modelValue': [value: LocaleCode]
  change: [value: LocaleCode]
}>()

const localeLabels = {
  uk: 'UK',
  en: 'EN'
} as const

const nextLocaleLabels = {
  uk: 'English',
  en: 'Ukrainian'
} as const

function normalizeLocale(value: unknown): LocaleCode {
  return value === 'en' ? 'en' : 'uk'
}

const currentLocale = ref<LocaleCode>(normalizeLocale(props.modelValue))

watch(() => props.modelValue, (value) => {
  currentLocale.value = normalizeLocale(value)
})

function toggleLocale() {
  const nextLocale = currentLocale.value === 'uk' ? 'en' : 'uk'

  currentLocale.value = nextLocale
  emit('update:modelValue', nextLocale)
  emit('change', nextLocale)
}
</script>

<template>
  <button
    class="language-control"
    type="button"
    :aria-label="`Switch language to ${nextLocaleLabels[currentLocale]}`"
    @click="toggleLocale"
  >
    <Transition name="language-switch" mode="out-in">
      <span :key="currentLocale" class="language-control__label">
        {{ localeLabels[currentLocale] }}
      </span>
    </Transition>
  </button>
</template>

<style scoped>
@reference "~/assets/css/tailwind.css";

.language-control {
  @apply inline-flex min-h-11 appearance-none items-center justify-center border-0 bg-transparent px-2 text-small font-medium text-text-muted transition-colors duration-short ease-standard;
}

.language-control:hover {
  @apply text-accent-burgundy;
}

.language-control__label {
  @apply inline-block min-w-6 text-center;
}

.language-switch-enter-active,
.language-switch-leave-active {
  @apply transition-all duration-short ease-standard;
}

.language-switch-enter-from {
  @apply translate-y-1 opacity-0;
}

.language-switch-leave-to {
  @apply -translate-y-1 opacity-0;
}
</style>
