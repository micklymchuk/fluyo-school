import type { PageContent, PagePath } from './types'

export const sitePages = [
  {
    routeId: 'home',
    path: '/',
    sectionOrder: ['hero', 'learning-paths', 'teachers-proof', 'pricing-summary', 'faq', 'final-cta'],
    messageKey: 'home'
  },
  {
    routeId: 'programs',
    path: '/programs',
    sectionOrder: ['programs-header', 'exam-preparation', 'kids-parents', 'adults-speaking', 'path-price-hints', 'learning-paths-cta'],
    messageKey: 'programs'
  },
  {
    routeId: 'teachers',
    path: '/teachers',
    sectionOrder: ['teacher-intro', 'teacher-cards', 'proof-gallery', 'testimonials', 'teachers-cta'],
    messageKey: 'teachers'
  },
  {
    routeId: 'pricing',
    path: '/pricing',
    sectionOrder: ['trial-intro', 'price-list', 'price-notes', 'pricing-faq', 'pricing-cta'],
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
