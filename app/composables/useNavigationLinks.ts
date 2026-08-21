import { useRuntimeConfig } from '#imports'
import {
  anchorNavigationLinks,
  isNavigationGroup,
  pageNavigationLinks,
  type PrimaryNavigationEntry,
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
  const source: readonly PrimaryNavigationEntry[] = anchorMode
    ? anchorNavigationLinks
    : pageNavigationLinks

  // Within the chosen mode, show only the entries the allowlist enables. A group
  // keeps its available children; gated down to one child it collapses to a
  // plain item (a one-entry dropdown is noise), and to none it disappears.
  const entries = source.reduce<PrimaryNavigationEntry[]>((resolved, entry) => {
    if (!isNavigationGroup(entry)) {
      if (pages.includes(entry.to)) {
        resolved.push(entry)
      }

      return resolved
    }

    const items = entry.items.filter((item) => pages.includes(item.to))

    if (items.length > 1) {
      resolved.push({ labelKey: entry.labelKey, items })
    } else if (items[0]) {
      resolved.push(items[0])
    }

    return resolved
  }, [])

  // Every destination the nav can reach, groups flattened — what the footer
  // renders inline and what the header scrollspy watches.
  const links = entries.flatMap<PrimaryNavigationLink>((entry) => {
    return isNavigationGroup(entry) ? [...entry.items] : [entry]
  })

  // True when there is a real (non-home) destination to navigate to. When false
  // the header collapses to just the logo + inline actions (no nav menu, D4).
  const showNav = links.some((link) => !HOME_DESTINATIONS.has(link.to))

  return { entries, links, showNav }
}
