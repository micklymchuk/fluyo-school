import { onBeforeUnmount, onMounted, ref } from 'vue'

// Reveal-on-scroll engine. ONE IntersectionObserver for the whole app, shared by
// every `useReveal()` caller — 50 revealed cards cost one observer, not 50.
// Elements are unobserved the moment they land (unless `once: false`), so the
// callback set shrinks as the visitor scrolls instead of growing.
//
// Trigger band: threshold 0 with a -12% bottom margin, i.e. "any part of the
// element has crossed 88% of the viewport height". Deliberately NOT a ratio
// threshold — a section taller than the viewport can never reach a 0.15 ratio
// and would stay hidden forever.
const REVEAL_ROOT_MARGIN = '0px 0px -12% 0px'

interface RevealTarget {
  setVisible: (visible: boolean) => void
  once: boolean
}

const targets = new WeakMap<Element, RevealTarget>()
let observer: IntersectionObserver | undefined

function sharedObserver() {
  if (observer) {
    return observer
  }

  observer = new IntersectionObserver((records) => {
    for (const record of records) {
      const target = targets.get(record.target)

      if (!target) {
        continue
      }

      if (record.isIntersecting) {
        target.setVisible(true)

        if (target.once) {
          targets.delete(record.target)
          observer?.unobserve(record.target)
        }

        continue
      }

      if (!target.once) {
        target.setVisible(false)
      }
    }
  }, { rootMargin: REVEAL_ROOT_MARGIN, threshold: 0 })

  return observer
}

// Attach `el` to any element and drive its reveal state from `visible`. Both
// stay false/empty on the server and through hydration, so the SSR markup and
// the first client render agree; the observer fills `visible` in after mount.
// No IntersectionObserver (very old browsers) ⇒ reveal immediately rather than
// leaving content stuck at opacity 0.
export const useReveal = (options: { once?: boolean } = {}) => {
  const once = options.once ?? true
  const el = ref<Element | null>(null)
  const visible = ref(false)

  onMounted(() => {
    const element = el.value

    if (!element) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      visible.value = true
      return
    }

    targets.set(element, {
      once,
      setVisible: (value) => {
        visible.value = value
      }
    })

    sharedObserver().observe(element)
  })

  onBeforeUnmount(() => {
    const element = el.value

    if (!element) {
      return
    }

    targets.delete(element)
    observer?.unobserve(element)
  })

  return { el, visible }
}
