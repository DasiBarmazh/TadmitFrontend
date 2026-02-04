import { Link } from 'react-router-dom'
import { TEXTS } from '../../constants/texts'
import styles from './sidebar.module.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-hidden={!isOpen}
      />
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label={TEXTS.menuNav}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={TEXTS.closeMenu}
        >
          ×
        </button>
        <nav className={styles.nav}>
          <Link to="/" onClick={onClose} className={styles.link}>
            {TEXTS.navHome}
          </Link>
          <Link to="/contact" onClick={onClose} className={styles.link}>
            {TEXTS.navContact}
          </Link>
        </nav>
      </aside>
    </>
  )
}
