// Single source of truth for which route pages exist and which are publicly
// available. Consumed at build time by nuxt.config.ts (redirect route rules +
// runtimeConfig.public.pages) and at render time by useNavigationLinks().
// See story DD-001.6.1.

// The known route universe — must match app/pages/*.vue. Add a path here when a
// new page ships. Listing one enables the standalone route; omitting it triggers
// an edge redirect to '/'.
export const ALL_PAGES = ['/', '/programs', '/teachers', '/pricing'] as const

// The known anchor destinations the primary nav can surface — one per home-page
// section (see app/components/sections/home/*). Listing one in the allowlist
// shows its menu item; omitting it hides it. Anchors are never routes, so they
// never trigger a redirect. Keep these in sync with anchorNavigationLinks.
export const ALL_ANCHORS = [
  '/#home',
  '/#learning-paths',
  '/#speaking-club',
  '/#teachers',
  '/#founder',
  '/#trial-pricing-summary',
  '/#student-reviews',
  '/#questions'
] as const

export type KnownPage = (typeof ALL_PAGES)[number]
export type KnownAnchor = (typeof ALL_ANCHORS)[number]

// Parse the NUXT_PUBLIC_AVAILABLE_PAGES allowlist into a validated list of
// available entries — route pages AND/OR nav anchors. Unset/empty ⇒ everything
// available (dev default). Home ('/') is always force-included so it can never
// be gated by a typo. Unknown entries are dropped (intersected with the known
// universe). Order is stable: pages first, then anchors.
export function parseAvailablePages(raw?: string): string[] {
  if (!raw || raw.trim() === '') {
    return [...ALL_PAGES, ...ALL_ANCHORS]
  }

  const requested = raw
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)

  const allowed = new Set<string>(['/', ...requested])

  return [
    ...ALL_PAGES.filter((page) => allowed.has(page)),
    ...ALL_ANCHORS.filter((anchor) => allowed.has(anchor))
  ]
}

// The complement of the allowlist: every known ROUTE page that is NOT available,
// excluding home (home is never gated). These get an edge redirect to '/'.
// Anchors are ignored here — there is no route to redirect.
export function getGatedPages(available: string[]): string[] {
  return ALL_PAGES.filter((page) => page !== '/' && !available.includes(page))
}
