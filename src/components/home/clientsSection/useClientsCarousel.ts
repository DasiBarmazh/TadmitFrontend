import { useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { Client } from './clients.types'

const DEFAULT_REPEAT = 3
const AUTO_SCROLL_END_DEBOUNCE_MS = 140

export interface UseClientsCarouselResult {
  /** Render list (3x repeated) for infinite behavior */
  items: Array<{ virtualIndex: number; baseIndex: number; client: Client }>
  /** Index in the virtual 3x list */
  activeVirtualIndex: number
  /** Convenience: active client from base list */
  activeClient: Client | null

  viewportRef: RefObject<HTMLDivElement | null>
  trackRef: RefObject<HTMLDivElement | null>
  slotRef: RefObject<HTMLDivElement | null>

  snapDisabled: boolean
  onScroll: () => void
  scrollVirtualToSlotCenter: (virtualIndex: number) => void
  setButtonRef: (virtualIndex: number) => (el: HTMLButtonElement | null) => void
}

export function useClientsCarousel(
  clients: Client[],
  options?: { repeat?: number },
): UseClientsCarouselResult {
  const repeat = options?.repeat ?? DEFAULT_REPEAT
  const baseCount = clients.length

  const items = useMemo(() => {
    return Array.from({ length: baseCount * repeat }, (_, virtualIndex) => ({
      virtualIndex,
      baseIndex: virtualIndex % baseCount,
      client: clients[virtualIndex % baseCount],
    }))
  }, [baseCount, repeat, clients])

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const slotRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const oneSetWidthRef = useRef<number>(0)
  const lastScrollLeftRef = useRef<number>(0)
  const isResettingRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  const isAutoScrollingRef = useRef(false)
  const autoScrollEndTimeoutRef = useRef<number | null>(null)
  const [snapDisabled, setSnapDisabled] = useState(false)

  const [activeVirtualIndex, setActiveVirtualIndex] = useState<number>(
    // start at first item in the middle set
    baseCount,
  )

  const activeClient =
    baseCount > 0 ? clients[activeVirtualIndex % baseCount] : null

  function measureOneSetWidth() {
    const track = trackRef.current
    if (!track) return 0
    const total = track.scrollWidth
    const oneSet = total / repeat
    oneSetWidthRef.current = oneSet
    return oneSet
  }

  function updateActiveFromGeometry() {
    const slot = slotRef.current
    if (!slot) return

    const slotRect = slot.getBoundingClientRect()
    const slotCenterX = slotRect.left + slotRect.width / 2

    let bestVirtual = activeVirtualIndex
    let bestDistance = Number.POSITIVE_INFINITY

    for (let i = 0; i < buttonRefs.current.length; i++) {
      const el = buttonRefs.current[i]
      if (!el) continue
      const r = el.getBoundingClientRect()
      const centerX = r.left + r.width / 2
      const d = Math.abs(centerX - slotCenterX)
      if (d < bestDistance) {
        bestDistance = d
        bestVirtual = i
      }
    }

    setActiveVirtualIndex(bestVirtual)
  }

  function scheduleActiveUpdate() {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      updateActiveFromGeometry()
    })
  }

  function scrollVirtualToSlotCenter(virtualIndex: number) {
    const viewport = viewportRef.current
    const slot = slotRef.current
    const el = buttonRefs.current[virtualIndex]
    if (!viewport || !slot || !el) return

    isAutoScrollingRef.current = true
    setSnapDisabled(true)
    if (autoScrollEndTimeoutRef.current != null) {
      window.clearTimeout(autoScrollEndTimeoutRef.current)
      autoScrollEndTimeoutRef.current = null
    }

    const slotRect = slot.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    const slotCenterX = slotRect.left + slotRect.width / 2
    const elCenterX = elRect.left + elRect.width / 2

    let delta = elCenterX - slotCenterX

    // Enforce "move left only": in LTR, increasing scrollLeft moves content left.
    // If delta is negative (would require moving right), jump one full set forward.
    if (delta < 0) {
      const oneSet = oneSetWidthRef.current || measureOneSetWidth()
      delta += oneSet
    }

    viewport.scrollBy({ left: delta, behavior: 'smooth' })
  }

  function onScroll() {
    const viewport = viewportRef.current
    if (!viewport) return

    const current = viewport.scrollLeft

    // Only allow "left-moving" motion (scrollLeft should not decrease).
    if (
      !isAutoScrollingRef.current &&
      !isResettingRef.current &&
      current < lastScrollLeftRef.current
    ) {
      viewport.scrollLeft = lastScrollLeftRef.current
      return
    }

    lastScrollLeftRef.current = viewport.scrollLeft

    // Infinite loop behavior: when we approach the end of the 3x list, jump back by 1 set.
    if (!isAutoScrollingRef.current) {
      const oneSet = oneSetWidthRef.current || measureOneSetWidth()
      if (oneSet > 0 && viewport.scrollLeft >= oneSet * 2) {
        isResettingRef.current = true
        viewport.scrollLeft = viewport.scrollLeft - oneSet
        lastScrollLeftRef.current = viewport.scrollLeft
        isResettingRef.current = false
      }
    }

    scheduleActiveUpdate()

    // Re-enable snapping & normalization after smooth scroll settles.
    if (isAutoScrollingRef.current) {
      if (autoScrollEndTimeoutRef.current != null) {
        window.clearTimeout(autoScrollEndTimeoutRef.current)
      }
      autoScrollEndTimeoutRef.current = window.setTimeout(() => {
        isAutoScrollingRef.current = false
        autoScrollEndTimeoutRef.current = null
        setSnapDisabled(false)

        const v = viewportRef.current
        const oneSet = oneSetWidthRef.current || measureOneSetWidth()
        if (v && oneSet > 0) {
          if (v.scrollLeft >= oneSet * 2) {
            isResettingRef.current = true
            v.scrollLeft = v.scrollLeft - oneSet
            isResettingRef.current = false
          }
          lastScrollLeftRef.current = v.scrollLeft
        }
      }, AUTO_SCROLL_END_DEBOUNCE_MS)
    }
  }

  const setButtonRef = (virtualIndex: number) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[virtualIndex] = el
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    if (baseCount === 0) return

    measureOneSetWidth()

    // Start in the middle set so the carousel can loop both visually and logically.
    viewport.scrollLeft = oneSetWidthRef.current
    lastScrollLeftRef.current = viewport.scrollLeft

    window.requestAnimationFrame(() => {
      scrollVirtualToSlotCenter(baseCount) // first item of the middle set
      scheduleActiveUpdate()
    })

    const ro = new ResizeObserver(() => {
      measureOneSetWidth()
      scheduleActiveUpdate()
    })
    ro.observe(viewport)
    if (trackRef.current) ro.observe(trackRef.current)
    if (slotRef.current) ro.observe(slotRef.current)

    return () => {
      ro.disconnect()
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      if (autoScrollEndTimeoutRef.current != null) {
        window.clearTimeout(autoScrollEndTimeoutRef.current)
        autoScrollEndTimeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCount, repeat])

  return {
    items,
    activeVirtualIndex,
    activeClient,
    viewportRef,
    trackRef,
    slotRef,
    snapDisabled,
    onScroll,
    scrollVirtualToSlotCenter,
    setButtonRef,
  }
}

