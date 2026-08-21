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

// A menu item that opens a dropdown instead of navigating. Children are ordinary
// destinations, so gating and active state work exactly as for a flat item.
export type NavigationGroup = {
  labelKey: string
  items: readonly PrimaryNavigationLink[]
}

export type PrimaryNavigationEntry = PrimaryNavigationLink | NavigationGroup

export const isNavigationGroup = (entry: PrimaryNavigationEntry): entry is NavigationGroup => {
  return 'items' in entry
}

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
// Related sections are grouped behind one dropdown item; everything else is flat.
export const anchorNavigationLinks = [
  { labelKey: 'navigation.links.home', to: '/#home' },
  {
    labelKey: 'navigation.groups.programs',
    items: [
      { labelKey: 'navigation.links.programs', to: '/#learning-paths' },
      { labelKey: 'navigation.links.speakingClub', to: '/#speaking-club' }
    ]
  },
  {
    labelKey: 'navigation.groups.team',
    items: [
      { labelKey: 'navigation.links.founder', to: '/#founder' },
      { labelKey: 'navigation.links.teachers', to: '/#teachers' }
    ]
  },
  { labelKey: 'navigation.links.pricing', to: '/#trial-pricing-summary' },
  { labelKey: 'navigation.links.reviews', to: '/#student-reviews' },
  { labelKey: 'navigation.links.qa', to: '/#questions' }
] as const satisfies readonly PrimaryNavigationEntry[]

export const instagramAction = {
  label: 'Instagram',
  href: 'https://www.instagram.com/fluyo.school/'
} as const satisfies ContactAction

export const telegramAction = {
  label: 'Telegram'
} as const satisfies LabeledAction
