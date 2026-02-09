import { useState } from 'react'
import { TEXTS, WHAT_I_DO_ITEMS } from '../../../constants/texts'
import { ExpandableTextCard } from './expandableTextCard'
import styles from './whatIDoSection.module.css'
import sectionImage from '../../../../imgs/Rectangle 20.png'

export function WhatIDoSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section className={styles.section}>
      <div className={styles.center}>
        <div className={styles.visualWrapper}>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>{TEXTS.whatIDoTitle}</h2>
          </div>

          <div className={styles.imageLayer}>
            <img
              src={sectionImage}
              alt=""
              className={styles.image}
            />
          </div>

          <div className={styles.glassLayer}>
            <div className={styles.cards}>
              {WHAT_I_DO_ITEMS.map((item) => (
                <ExpandableTextCard
                  key={item.id}
                  item={item}
                  isActive={hoveredId === item.id}
                  onHover={() => setHoveredId(item.id)}
                  onLeave={() => setHoveredId(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
