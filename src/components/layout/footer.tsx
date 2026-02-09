import { TEXTS } from '../../constants/texts'
import styles from './footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bar}>
        <span className={styles.tagline}>{TEXTS.footerTagline}</span>
        <span className={styles.left}>{TEXTS.footerDesignBy}</span>
      </div>
    </footer>
  )
}
