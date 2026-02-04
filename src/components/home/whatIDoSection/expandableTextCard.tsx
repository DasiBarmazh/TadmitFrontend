import styles from './expandableTextCard.module.css'

export interface WhatIDoItem {
  id: string
  title: string
  fullText?: string
}

interface ExpandableTextCardProps {
  item: WhatIDoItem
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

export function ExpandableTextCard({
  item,
  isActive,
  onHover,
  onLeave,
}: ExpandableTextCardProps) {
  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <p className={styles.title}>{item.title}</p>
      {item.fullText && (
        <div
          className={styles.expandWrapper}
          style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
        >
          <p className={styles.fullText}>{item.fullText}</p>
        </div>
      )}
    </div>
  )
}
