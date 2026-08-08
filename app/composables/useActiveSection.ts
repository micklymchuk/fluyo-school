import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useState } from '#imports'

// Shared, SSR-safe id of the home-page section currently in view (e.g. "home",
// "speaking-club"). Empty on the server and until the client spy resolves one —
// so the initial client render matches the server (no hydration mismatch), then
// the observer fills it in after mount. Every HeaderLink reads this.
export const useActiveSection = () => useState<string>('active-section', () => '')

// Client-only scrollspy. Watches the given section ids with a SINGLE
// IntersectionObserver and writes the top-most one crossing a thin trigger band
// (upper third of the viewport) into the shared state. No scroll listeners and
// no per-frame layout reads — the observer runs off the main thread. Call once
// from a persistent component (AppHeader).
export const useSectionSpy = (sectionIds: readonly string[]) => {
  const active = useActiveSection()
  const route = useRoute()

  let observer: IntersectionObserver | undefined
  // Ids currently intersecting the band; we pick the first in document order.
  const visible = new Set<string>()

  function connect() {
    disconnect()

    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (targets.length === 0) {
      active.value = ''
      return
    }

    // Seed before the observer's first async callback so something is
    // highlighted immediately (deep-link hash wins, else the first section).
    const hashId = route.hash ? route.hash.slice(1) : ''
    active.value = sectionIds.includes(hashId) ? hashId : targets[0]!.id

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)
          } else {
            visible.delete(entry.target.id)
          }
        }

        const current = sectionIds.find((id) => visible.has(id))
        if (current) {
          active.value = current
        }
      },
      // Band between 30% and 40% down the viewport: a section becomes active as
      // its content crosses that line. threshold 0 → fire on any overlap.
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    targets.forEach((el) => observer!.observe(el))
  }

  function disconnect() {
    observer?.disconnect()
    observer = undefined
    visible.clear()
  }

  onMounted(() => {
    connect()
    // Sections live on the home page; re-attach after client-side navigation
    // once the new page has rendered.
    watch(() => route.path, () => nextTick(connect))
  })

  onBeforeUnmount(disconnect)
}
