import { TEXTS } from '../../constants/texts'
import { Logo } from './logo'
import styles from './header.module.css'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Logo />
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label={TEXTS.menu}
      >
        <span className={styles.hamburger} aria-hidden="true" />
      </button>
    </header>
  )
}
