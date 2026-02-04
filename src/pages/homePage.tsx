import { Hero } from '../components/home/hero'
import { CtaSection } from '../components/home/ctaSection'
import { WhatIDoSection } from '../components/home/whatIDoSection/whatIDoSection'
import { ClientsSection } from '../components/home/clientsSection/clientsSection'
import { ContactPreview } from '../components/home/contactPreview'
import styles from './homePage.module.css'

export function HomePage() {
  return (
    <div className={styles.root}>
      <Hero />
      <CtaSection />
      <WhatIDoSection />
      <ClientsSection />
      <ContactPreview />
    </div>
  )
}
