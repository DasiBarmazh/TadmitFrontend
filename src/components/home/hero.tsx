import { TEXTS } from '../../constants/texts'
import styles from './hero.module.css'
import heroImage from '../../../imgs/1.png'

export function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ ['--hero-bg-image' as string]: `url(${heroImage})` }}
    >
      <div className={styles.imageWrapper}>
        <div className={styles.placeholder} />
      </div>
      <div className={styles.overlay}>
        <p className={styles.headline}>{TEXTS.heroHeadline}</p>
        <div className={styles.sublineRow}>
          <span className={styles.decorativeLine} aria-hidden />
          <span className={styles.subline}>{TEXTS.heroSubline}</span>
        </div>
      </div>
    </section>
  )
}
