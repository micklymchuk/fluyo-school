import { computed } from 'vue'
import { useI18n, useRoute, useSeoMeta } from '#imports'
import { findPageContentByPath, type PageContent, type PagePath } from '~/data/content'
import { useLocale } from '~/composables/useLocale'

const resolvePage = (path: string): PageContent => {
  const page = findPageContentByPath(path)

  if (!page) {
    throw new Error(`Missing page content for path: ${path}`)
  }

  return page
}

export const useSeo = (path?: PagePath) => {
  const route = useRoute()
  const { locale } = useLocale()
  const { t } = useI18n()
  const page = computed(() => resolvePage(path ?? route.path))
  const metadata = computed(() => {
    const routeKey = page.value.messageKey

    return {
      title: t(`pages.${routeKey}.seo.title`),
      description: t(`pages.${routeKey}.seo.description`)
    }
  })

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
