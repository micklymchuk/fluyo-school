import { useRuntimeConfig } from '#imports'
import { primaryNavigationLinks, type PrimaryNavigationLink } from '~/components/navigation/navigationLinks'

// Filters the canonical navigation links down to the pages that are publicly
// available (the build-time NUXT_PUBLIC_AVAILABLE_PAGES allowlist, baked into
// runtimeConfig.public.pages). Callers pass the canonical list so it stays the
// single source of truth at each call site. See story DD-001.6.1.
//
// The allowlist is a build-time constant inlined into both server and client
// bundles, so the returned values are stable and hydration-safe (plain, not
// reactive).
export const useNavigationLinks = (
  source: readonly PrimaryNavigationLink[] = primaryNavigationLinks
) => {
  const { public: publicConfig } = useRuntimeConfig()
  const pages = (publicConfig.pages ?? ['/']) as string[]

  const links = source.filter((link) => pages.includes(link.to))
  // True only when at least one non-home page is available. When false the
  // header collapses to just the logo + inline actions (no nav menu, D4).
  const showNav = links.some((link) => link.to !== '/')

  return { links, showNav }
}
