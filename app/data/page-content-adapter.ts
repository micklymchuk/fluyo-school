import { getRouteMessage } from '../i18n/messages'
import {
  DEFAULT_LOCALE,
  findPageContentByPath,
  type Locale,
  type LocalizedSeoMetadata,
  type PageContent,
  type PageIntro,
  type PagePath
} from './content'

export type LocalizedPageContent = PageContent & {
  seo: LocalizedSeoMetadata
  intro: PageIntro
}

const resolvePage = (path: string): PageContent => {
  const page = findPageContentByPath(path)

  if (!page) {
    throw new Error(`Missing page content for path: ${path}`)
  }

  return page
}

export const getLocalizedPageContent = (
  pathOrPage: PagePath | string | PageContent,
  locale: Locale = DEFAULT_LOCALE
): LocalizedPageContent => {
  const page = typeof pathOrPage === 'string' ? resolvePage(pathOrPage) : pathOrPage
  const messages = getRouteMessage(locale, page.messageKey)

  return {
    ...page,
    seo: messages.seo,
    intro: messages.intro
  }
}

export const getPageSeo = (
  pathOrPage: PagePath | string | PageContent,
  locale: Locale = DEFAULT_LOCALE
): LocalizedSeoMetadata => {
  return getLocalizedPageContent(pathOrPage, locale).seo
}
