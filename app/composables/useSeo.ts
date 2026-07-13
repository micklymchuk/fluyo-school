import { computed } from 'vue'
import { useRoute, useSeoMeta } from '#imports'
import type { PagePath } from '~/data/content'
import { getLocalizedPageContent, getPageSeo as readPageSeo } from '~/data/page-content-adapter'
import { useLocale } from '~/composables/useLocale'

export { getPageSeo } from '~/data/page-content-adapter'

export const useSeo = (path?: PagePath) => {
  const route = useRoute()
  const { locale } = useLocale()
  const page = computed(() => getLocalizedPageContent(path ?? route.path, locale.value))
  const metadata = computed(() => readPageSeo(page.value, locale.value))

  useSeoMeta({
    title: () => metadata.value.title,
    description: () => metadata.value.description,
    ogTitle: () => metadata.value.title,
    ogDescription: () => metadata.value.description
  })

  return {
    page,
    metadata,
    locale
  }
}
