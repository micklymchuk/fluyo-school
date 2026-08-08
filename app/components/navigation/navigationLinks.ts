import type { KnownAnchor, KnownPage } from '~/utils/pages'

export type PageNavigationLink = {
  labelKey: string
  to: KnownPage
}

export type AnchorNavigationLink = {
  labelKey: string
  to: KnownAnchor
}

export type PrimaryNavigationLink = PageNavigationLink | AnchorNavigationLink

export type ContactAction = {
  label: string
  href: string
}

export type LabeledAction = {
  label: string
}

// Two separate navigation modes, gated by NUXT_PUBLIC_AVAILABLE_PAGES. The nav
// renders ONE of these lists, never a mix (see useNavigationLinks): route-page
// links when standalone pages are published, or in-page anchor links while the
// whole site lives on the home page.

// Standalone route pages (each `to` is a real route in app/pages/*.vue).
export const pageNavigationLinks = [
  { labelKey: 'navigation.links.home', to: '/' },
  { labelKey: 'navigation.links.programs', to: '/programs' },
  { labelKey: 'navigation.links.teachers', to: '/teachers' },
  { labelKey: 'navigation.links.pricing', to: '/pricing' }
] as const satisfies readonly PageNavigationLink[]

// Home-page section anchors (each `to` targets a section id in app/pages/index.vue).
export const anchorNavigationLinks = [
  { labelKey: 'navigation.links.home', to: '/#home' },
  { labelKey: 'navigation.links.programs', to: '/#learning-paths' },
  { labelKey: 'navigation.links.speakingClub', to: '/#speaking-club' },
  { labelKey: 'navigation.links.pricing', to: '/#trial-pricing-summary' },
  { labelKey: 'navigation.links.reviews', to: '/#student-reviews' }
] as const satisfies readonly AnchorNavigationLink[]

export const instagramAction = {
  label: 'Instagram',
  href: 'https://www.instagram.com/fluyo.school/'
} as const satisfies ContactAction

export const telegramAction = {
  label: 'Telegram'
} as const satisfies LabeledAction
