import type { LocationQueryRaw } from 'vue-router'
import { computed, watch } from 'vue'
import { useI18n, useRoute, useRouter } from '#imports'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '~/data/content'

const normalizeLocaleValue = (value: unknown): string | undefined => {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : undefined
  }

  return typeof value === 'string' ? value : undefined
}

export const isSupportedLocale = (value: unknown): value is Locale => {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale)
}

export const resolveLocale = (value: unknown): Locale => {
  const candidate = normalizeLocaleValue(value)

  return isSupportedLocale(candidate) ? candidate : DEFAULT_LOCALE
}

export const getLocaleQueryValue = (locale: Locale): Locale | undefined => {
  return locale === DEFAULT_LOCALE ? undefined : locale
}

export const useLocale = () => {
  const route = useRoute()
  const router = useRouter()
  const { locale: i18nLocale, setLocale: setI18nLocale } = useI18n()
  const routeLocale = computed(() => resolveLocale(route.query.lang))
  const locale = computed<Locale>(() => resolveLocale(i18nLocale.value))
  const localeQueryValue = computed(() => getLocaleQueryValue(locale.value))

  const syncI18nLocale = async (nextLocale: Locale) => {
    if (locale.value !== nextLocale) {
      await setI18nLocale(nextLocale)
    }
  }

  watch(
    routeLocale,
    (nextLocale) => {
      void syncI18nLocale(nextLocale).catch((error: unknown) => {
        console.error('Failed to sync locale from route query', error)
      })
    },
    { immediate: true }
  )

  const setLocale = async (nextLocale: Locale) => {
    await syncI18nLocale(nextLocale)

    const query = { ...route.query } as LocationQueryRaw
    const nextQueryValue = getLocaleQueryValue(nextLocale)

    if (nextQueryValue) {
      query.lang = nextQueryValue
    } else {
      delete query.lang
    }

    await router.replace({
      path: route.path,
      query,
      hash: route.hash
    })
  }

  return {
    locale,
    localeQueryValue,
    defaultLocale: DEFAULT_LOCALE,
    i18nLocale,
    supportedLocales: SUPPORTED_LOCALES,
    resolveLocale,
    setLocale
  }
}
