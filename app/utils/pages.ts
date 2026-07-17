// Single source of truth for which route pages exist and which are publicly
// available. Consumed at build time by nuxt.config.ts (redirect route rules +
// runtimeConfig.public.pages) and at render time by useNavigationLinks().
// See story DD-001.6.1.

// The known route universe — must match app/pages/*.vue. Add a path here when a
// new page ships.
export const ALL_PAGES = ['/', '/programs', '/teachers', '/pricing'] as const

export type KnownPage = (typeof ALL_PAGES)[number]

// Parse the NUXT_PUBLIC_AVAILABLE_PAGES allowlist into a validated list of
// available page paths. Unset/empty ⇒ every known page is available (dev
// default). Home ('/') is always force-included so it can never be gated by a
// typo, and unknown paths are dropped by intersecting with ALL_PAGES.
export function parseAvailablePages(raw?: string): string[] {
  if (!raw || raw.trim() === '') {
    return [...ALL_PAGES]
  }

  const requested = raw
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)

  const allowed = new Set<string>(['/', ...requested])

  return ALL_PAGES.filter((page) => allowed.has(page))
}

// The complement of the allowlist: every known page that is NOT available,
// excluding home (home is never gated). These get an edge redirect to '/'.
export function getGatedPages(available: string[]): string[] {
  return ALL_PAGES.filter((page) => page !== '/' && !available.includes(page))
}
