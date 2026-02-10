import { TEXTS } from '../../constants/texts'
import styles from './hero.module.css'
import heroImage from '../../../imgs/1.png'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageLayer}>
        <img src={heroImage} alt="" className={styles.image} />
      </div>
      <div className={styles.overlay}>
        <p className={styles.headline} style={{ whiteSpace: 'pre-line' }}>
          {TEXTS.heroHeadline}</p>
        <div className={styles.sublineRow}>
          <span className={styles.decorativeLine} aria-hidden />
          <span className={styles.subline}>{TEXTS.heroSubline}</span>
        </div>
      </div>
    </section>
  )
}
