import { TEXTS } from '../constants/texts'
import { ContactForm } from '../components/contact/contactForm'
import styles from './contactPage.module.css'

export function ContactPage() {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{TEXTS.contactUsTitle}</h1>
        <p className={styles.subtitle}>{TEXTS.contactPageTitle}</p>
        <ContactForm dark />
      </div>
    </div>
  )
}
