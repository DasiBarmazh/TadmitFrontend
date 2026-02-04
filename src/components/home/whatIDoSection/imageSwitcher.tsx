import { TEXTS } from '../../../constants/texts'
import styles from './imageSwitcher.module.css'

export interface ImageSwitcherItem {
  id: string
  src: string
  alt: string
}

interface ImageSwitcherProps {
  activeId: string
  items: ImageSwitcherItem[]
}

export function ImageSwitcher({ activeId, items }: ImageSwitcherProps) {
  const active = items.find((item) => item.id === activeId) ?? items[0]

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
