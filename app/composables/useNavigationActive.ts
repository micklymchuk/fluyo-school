import { useRoute } from '#imports'
import { useActiveSection } from '~/composables/useActiveSection'

// Shared "is this destination the one the visitor is on" test, used by every nav
// surface (flat items, dropdown triggers, dropdown items) so they highlight in
// step. Anchor destinations follow the scrollspy; route destinations the path.
export const useNavigationActive = () => {
  const route = useRoute()
  const activeSection = useActiveSection()

  function isActiveDestination(to: string) {
    const hashIndex = to.indexOf('#')

    // Anchor link (e.g. "/#speaking-club"): active follows the scrollspy — the
    // section currently in view — rather than a static route hash.
    if (hashIndex !== -1) {
      return activeSection.value === to.slice(hashIndex + 1)
    }

    if (to === '/') {
      return route.path === '/'
    }

    return route.path === to || route.path.startsWith(`${to}/`)
  }

  return { isActiveDestination }
}
