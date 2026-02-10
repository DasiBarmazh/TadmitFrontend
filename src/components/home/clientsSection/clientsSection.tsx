import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './clientsSection.module.css'
import cus1 from '../../../../imgs/cus1.JPG'
import cus2 from '../../../../imgs/cus2.JPG'
import cus3 from '../../../../imgs/cus3.JPG'
import cus4 from '../../../../imgs/cus4.JPG'
import cus5 from '../../../../imgs/cus5.JPG'
import { Container } from '../../ui/container'

interface Client {
  id: string
  name: string
  description: string
  image: string
}

const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'משפחה שמצאה דיוק',
    description: 'תהליך קצר שהפך החלטה להרבה יותר בטוחה וברורה.',
    image: cus1,
  },
  {
    id: '2',
    name: 'זוג בדרך להשקעה',
    description: 'מיקוד מטרות, מספרים, וסינון רעשי רקע לפני חתימה.',
    image: cus2,
  },
  {
    id: '3',
    name: 'רוכש עם תמונה מלאה',
    description: 'בדיקה שיטתית של הסיכונים וההזדמנויות – בלי הנחות.',
    image: cus3,
  },
  {
    id: '4',
    name: 'משקיע שירד לפרטים',
    description: 'הבנת המסגרת, התשואה והתרחישים – לפני שמתקדמים.',
    image: cus4,
  },
  {
    id: '5',
    name: 'לקוחה שהפכה בלבול לתוכנית',
    description: 'סדר, תעדוף וצעדים ברורים להמשך – בקצב שנכון לה.',
    image: cus5,
  },
]

export function ClientsSection() {
  const REPEAT = 3
  const baseCount = CLIENTS.length

  const items = useMemo(() => {
    return Array.from({ length: baseCount * REPEAT }, (_, virtualIndex) => ({
      virtualIndex,
      baseIndex: virtualIndex % baseCount,
      client: CLIENTS[virtualIndex % baseCount],
    }))
  }, [baseCount])

  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const slotRef = useRef<HTMLDivElement | null>(null)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const oneSetWidthRef = useRef<number>(0)
  const lastScrollLeftRef = useRef<number>(0)
  const isResettingRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  const [activeVirtualIndex, setActiveVirtualIndex] = useState<number>(baseCount)
  const activeClient = CLIENTS[activeVirtualIndex % baseCount]

  function measureOneSetWidth() {
    const track = trackRef.current
    if (!track) return 0
    const total = track.scrollWidth
    const oneSet = total / REPEAT
    oneSetWidthRef.current = oneSet
    return oneSet
  }

  function scheduleActiveUpdate() {
    if (rafRef.current != null) return
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      updateActiveFromGeometry()
    })
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

  function scrollVirtualToSlotCenter(virtualIndex: number) {
    const viewport = viewportRef.current
    const slot = slotRef.current
    const el = buttonRefs.current[virtualIndex]
    if (!viewport || !slot || !el) return

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
    if (!isResettingRef.current && current < lastScrollLeftRef.current) {
      viewport.scrollLeft = lastScrollLeftRef.current
      return
    }

    lastScrollLeftRef.current = viewport.scrollLeft

    // Infinite loop behavior: when we approach the end of the 3x list, jump back by 1 set.
    const oneSet = oneSetWidthRef.current || measureOneSetWidth()
    if (oneSet > 0 && viewport.scrollLeft >= oneSet * 2) {
      isResettingRef.current = true
      viewport.scrollLeft = viewport.scrollLeft - oneSet
      lastScrollLeftRef.current = viewport.scrollLeft
      isResettingRef.current = false
    }

    scheduleActiveUpdate()
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    measureOneSetWidth()

    // Start in the middle set so the carousel can loop both visually and logically.
    viewport.scrollLeft = oneSetWidthRef.current
    lastScrollLeftRef.current = viewport.scrollLeft

    // Align the first item in the middle-set to the stage slot.
    // This also ensures we start with a consistent "active" state.
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
    }
  }, [baseCount])

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>לקוחות שלנו</h2>
        </div>

        <div className={styles.layout}>
          <div className={styles.stage}>
            <div>
              <h3 className={styles.stageTitle}>{activeClient.name}</h3>
              <p className={styles.stageDescription}>{activeClient.description}</p>
            </div>
            {/* Defines the active-center position. No duplicate image is rendered here. */}
            <div ref={slotRef} className={styles.stageImageSlot} aria-hidden />
          </div>

          <div
            ref={viewportRef}
            className={styles.carouselViewport}
            onScroll={onScroll}
          >
            <div ref={trackRef} className={styles.track}>
              {items.map(({ virtualIndex, baseIndex, client }) => (
                <button
                  key={`${client.id}-${virtualIndex}`}
                  ref={(el) => {
                    buttonRefs.current[virtualIndex] = el
                  }}
                  type="button"
                  className={[
                    styles.thumb,
                    virtualIndex === activeVirtualIndex ? styles.thumbActive : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => scrollVirtualToSlotCenter(virtualIndex)}
                  aria-label={`בחר לקוח ${baseIndex + 1}`}
                >
                  <span className={styles.thumbFrame} aria-hidden="true">
                    <img
                      src={client.image}
                      alt=""
                      className={styles.thumbImage}
                      loading="lazy"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
