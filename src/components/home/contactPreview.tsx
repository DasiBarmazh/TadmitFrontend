import { TEXTS } from '../../constants/texts'
import {
  getGoogleMapsUrl,
  getMailtoUrl,
  getWhatsAppUrl,
} from '../../utils/contactLinks'
import { ContactForm } from '../contact/contactForm'
import styles from './contactPreview.module.css'

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
          <a
            href={getGoogleMapsUrl(TEXTS.contactAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {TEXTS.contactAddress}
          </a>
          <a
            href={getWhatsAppUrl(TEXTS.contactPhone)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {TEXTS.contactPhone}
          </a>
          <a href={getMailtoUrl(TEXTS.contactEmail)} className={styles.link}>
            {TEXTS.contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
