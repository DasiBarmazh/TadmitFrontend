import { TEXTS } from '../../constants/texts'
import {
  getGoogleMapsUrl,
  getMailtoUrl,
  getWhatsAppUrl,
} from '../../utils/contactLinks'
import { ContactForm } from '../contact/contactForm'
import formStyles from '../contact/contactForm.module.css'
import styles from './contactPreview.module.css'
import doorImage from '../../../imgs/Rectangle 11.png'

export function ContactPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.images}>
            <div className={styles.imagesInner}>
              <div className={styles.blurWrap}>
                <img src={doorImage} alt="" className={styles.blur} />
              </div>
              <img src={doorImage} alt="" className={styles.sharp} />
            </div>
          </div>
        </div>

        {/* LEFT */}
        <div className={styles.left}>
          <h2 className={styles.title}>{TEXTS.contactUsTitle}</h2>

          <div className={styles.bottom}>
            <div className={styles.links}>
              <p className={styles.contactName}>{TEXTS.heroSubline}</p>
              <a href={getGoogleMapsUrl(TEXTS.contactAddress)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {TEXTS.contactAddress}
              </a>
              <a href={getWhatsAppUrl(TEXTS.contactPhone)} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {TEXTS.contactPhone}
              </a>
              <a href={getMailtoUrl(TEXTS.contactEmail)} className={styles.link}>
                {TEXTS.contactEmail}
              </a>
            </div>
            <div className={styles.form}>
              <ContactForm
                dark
                renderField={(_key, input, error) => (
                  <label className={formStyles.label}>
                    {input}
                    {error}
                  </label>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
