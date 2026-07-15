import type { PageContent, PagePath } from './types'

export const sitePages = [
  {
    routeId: 'home',
    path: '/',
    messageKey: 'home'
  },
  {
    routeId: 'programs',
    path: '/programs',
    messageKey: 'programs'
  },
  {
    routeId: 'teachers',
    path: '/teachers',
    messageKey: 'teachers'
  },
  {
    routeId: 'pricing',
    path: '/pricing',
    messageKey: 'pricing'
  }
] as const satisfies readonly PageContent[]

export const findPageContentByPath = (path: string): PageContent | undefined => {
  return sitePages.find((page) => page.path === path)
}

export const getPageContentByPath = (path: PagePath): PageContent => {
  const page = findPageContentByPath(path)

  if (!page) {
    throw new Error(`Missing page content for path: ${path}`)
  }

  return page
}
