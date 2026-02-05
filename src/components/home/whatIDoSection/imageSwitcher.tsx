import { TEXTS } from '../../../constants/texts'
import styles from './imageSwitcher.module.css'

export interface ImageSwitcherItem {
  id: string
  src: string
  alt: string
}

interface ImageSwitcherProps {
  activeId: string | null
  items: ImageSwitcherItem[]
}

export function ImageSwitcher({ activeId, items }: ImageSwitcherProps) {
  const active = activeId
    ? items.find((item) => item.id === activeId) ?? null
    : null

  if (!active || !active.src) {
    return (
      <div className={styles.placeholder}>
        <span>{active?.alt ?? TEXTS.imageAltFallback}</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <img
        key={active.id}
        src={active.src}
        alt={active.alt}
        className={styles.image}
      />
    </div>
  )
}
