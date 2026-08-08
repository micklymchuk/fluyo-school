import { useRuntimeConfig } from '#imports'
import {
  anchorNavigationLinks,
  pageNavigationLinks,
  type PrimaryNavigationLink
} from '~/components/navigation/navigationLinks'

// Home destinations in either mode — a lone "Home" item never justifies showing
// the nav (the logo already links home), so it is excluded from showNav.
const HOME_DESTINATIONS = new Set<string>(['/', '/#home'])

// Resolves the primary navigation from the build-time NUXT_PUBLIC_AVAILABLE_PAGES
// allowlist (baked into runtimeConfig.public.pages). The site runs in ONE of two
// modes and never mixes route links with anchor links:
//   - anchor mode: the allowlist names any "/#section" anchor → show the
//     available home-section anchor links (single-page site).
//   - page mode:   otherwise → show the available standalone route-page links.
//
// The allowlist is a build-time constant inlined into both server and client
// bundles, so the returned values are stable and hydration-safe (plain, not
// reactive). See story DD-001.6.1.
export const useNavigationLinks = () => {
  const { public: publicConfig } = useRuntimeConfig()
  const pages = (publicConfig.pages ?? ['/']) as string[]

  // Anchor mode wins whenever the allowlist enables any anchor entry.
  const anchorMode = pages.some((entry) => entry.includes('#'))
  const source: readonly PrimaryNavigationLink[] = anchorMode
    ? anchorNavigationLinks
    : pageNavigationLinks

  // Within the chosen mode, show only the entries the allowlist enables.
  const links = source.filter((link) => pages.includes(link.to))
  // True when there is a real (non-home) destination to navigate to. When false
  // the header collapses to just the logo + inline actions (no nav menu, D4).
  const showNav = links.some((link) => !HOME_DESTINATIONS.has(link.to))

  return { links, showNav }
}
