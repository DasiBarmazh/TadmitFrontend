import { TEXTS } from '../../constants/texts'
import { ContactForm } from '../contact/contactForm'
import styles from './contactPreview.module.css'

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(TEXTS.contactAddress)}`
const WHATSAPP_URL = 'https://wa.me/972559933699'

export function ContactPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.formBlock}>
        <ContactForm dark />
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.imageWrapper}>
          <div className={styles.imagePlaceholder} />
          <div className={styles.imageBlur} />
        </div>
        <div className={styles.links}>
          <p className={styles.contactName}>{TEXTS.logoName}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {TEXTS.contactAddress}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {TEXTS.contactPhone}
          </a>
          <a href={`mailto:${TEXTS.contactEmail}`} className={styles.link}>
            {TEXTS.contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
