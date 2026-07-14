import { onBeforeUnmount, onMounted } from 'vue'

export const useSurfaceViewObserver = (
  attributeName: string,
  onSurfaceVisible: (value: string) => void
) => {
  const trackedValues = new Set<string>()
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const surfaceElements = Array.from(document.querySelectorAll<HTMLElement>(`[${attributeName}]`))

    if (!surfaceElements.length) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }

        const rootHeight = entry.rootBounds?.height ?? 0
        const visibleEnough = entry.intersectionRatio >= 0.25
          || (rootHeight > 0 && entry.intersectionRect.height >= rootHeight * 0.5)

        if (!visibleEnough) {
          continue
        }

        const element = entry.target as HTMLElement
        const value = element.getAttribute(attributeName)

        if (!value || trackedValues.has(value)) {
          continue
        }

        trackedValues.add(value)
        onSurfaceVisible(value)
      }
    }, { rootMargin: '0px 0px -35% 0px', threshold: [0.05, 0.1, 0.15, 0.2, 0.25] })

    for (const element of surfaceElements) {
      observer.observe(element)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
