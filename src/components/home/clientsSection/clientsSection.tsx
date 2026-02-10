import styles from './clientsSection.module.css'
import { Container } from '../../ui/container'
import { CLIENTS } from './clients.data'
import type { Client } from './clients.types'
import { useClientsCarousel } from './useClientsCarousel'

export interface ClientsSectionProps {
  clients?: Client[]
}

export function ClientsSection({ clients = CLIENTS }: ClientsSectionProps) {
  const {
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
  } = useClientsCarousel(clients)

  if (!activeClient) return null

  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
       

        <div className={styles.layout}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>לקוחות שלנו</h2>
        </div>
          <div className={styles.stage}>
            <div className={styles.stageContent}>
              <p className={styles.stageTitle}>{activeClient.name}</p>

              <div className={styles.stageBody}>
                <div className={styles.stageMeta}>
                  <p className={styles.stageMetaText}>{activeClient.location}</p>
                  <p className={styles.stageMetaText}>{activeClient.year}</p>
                </div>

                <div className={styles.stageQuoteBlock}>
                  <div className={styles.divider} aria-hidden />
                  <p className={styles.stageQuote}>{activeClient.quote}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active image slot (only the active image lives here) */}
          <div ref={slotRef} className={styles.stageImageSlot} aria-hidden>
            <img
              src={activeClient.image}
              alt={activeClient.name}
              className={styles.stageActiveImage}
              loading="lazy"
            />
          </div>

          <div
            ref={viewportRef}
            className={[
              styles.carouselViewport,
              snapDisabled ? styles.snapDisabled : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onScroll={onScroll}
          >
            <div ref={trackRef} className={styles.track}>
              {items.map(({ virtualIndex, client }) => (
                <button
                  key={`${client.id}-${virtualIndex}`}
                    ref={setButtonRef(virtualIndex)}
                  type="button"
                  className={[
                    styles.thumb,
                    virtualIndex === activeVirtualIndex ? styles.thumbActive : '',
                    virtualIndex === activeVirtualIndex ? styles.thumbGhost : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => scrollVirtualToSlotCenter(virtualIndex)}
                    aria-label={`בחר לקוח ${client.name}`}
                >
                  <img
                    src={client.image}
                      alt={client.name}
                    className={styles.thumbImage}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
