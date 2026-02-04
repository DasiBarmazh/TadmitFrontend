import { useState } from 'react'
import {
  TEXTS,
  WHAT_I_DO_IMAGES,
  WHAT_I_DO_ITEMS,
} from '../../../constants/texts'
import { ExpandableTextCard } from './expandableTextCard'
import { ImageSwitcher } from './imageSwitcher'
import styles from './whatIDoSection.module.css'

export function WhatIDoSection() {
  const [activeId, setActiveId] = useState<string>(WHAT_I_DO_ITEMS[0].id)

  return (
    <section className={styles.section}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>{TEXTS.whatIDoTitle}</h2>
      </div>
      <div className={styles.center}>
        <ImageSwitcher activeId={activeId} items={WHAT_I_DO_IMAGES} />
      </div>
      <div className={styles.cards}>
        {WHAT_I_DO_ITEMS.map((item) => (
          <ExpandableTextCard
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onHover={() => setActiveId(item.id)}
            onLeave={() => {}}
          />
        ))}
      </div>
    </section>
  )
}
