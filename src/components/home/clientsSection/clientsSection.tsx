import { useState } from 'react'
import { CLIENTS_DATA, TEXTS } from '../../../constants/texts'
import { ClientsCarousel, type ClientItem } from './clientsCarousel'
import styles from './clientsSection.module.css'

const CLIENTS: ClientItem[] = [...CLIENTS_DATA]

export function ClientsSection() {
  const [activeId, setActiveId] = useState<string>(CLIENTS[0].id)
  const active = CLIENTS.find((c) => c.id === activeId) ?? CLIENTS[0]

  return (
    <section className={styles.section}>
      <div className={styles.leftColumn}>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>{TEXTS.clientsTitle}</h2>
        </div>
        <ClientsCarousel
          items={CLIENTS}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
      <div className={styles.panel}>
        <p className={styles.panelName}>{active?.name}</p>
        {(active?.location ?? active?.year) && (
          <p className={styles.panelMeta}>
            {[active?.location, active?.year].filter(Boolean).join(' · ')}
          </p>
        )}
        <hr className={styles.panelDivider} />
        <p className={styles.panelText}>{active?.text}</p>
        <div className={styles.panelImage}>
          {active?.mainImage ? (
            <img src={active.mainImage} alt="" />
          ) : (
            <span>תמונה</span>
          )}
        </div>
      </div>
    </section>
  )
}
