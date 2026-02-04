import { useNavigate } from 'react-router-dom'
import { TEXTS } from '../../constants/texts'
import styles from './ctaSection.module.css'

export function CtaSection() {
  const navigate = useNavigate()

  return (
    <section className={styles.cta}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{TEXTS.ctaTitle}</h2>
        <p className={styles.paragraph}>{TEXTS.ctaParagraph1}</p>
        <p className={styles.paragraph}>{TEXTS.ctaParagraph2}</p>
        <p className={styles.paragraph}>{TEXTS.ctaParagraph3}</p>
        <hr className={styles.divider} />
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/contact')}
        >
          {TEXTS.ctaButton}
        </button>
      </div>
    </section>
  )
}
