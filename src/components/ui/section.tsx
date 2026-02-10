import type { ReactNode } from 'react'
import styles from './section.module.css'

type SectionVariant = 'page' | 'cta' | 'invert'

interface SectionProps {
  className?: string
  variant?: SectionVariant
  children: ReactNode
}

export function Section({ className, variant = 'page', children }: SectionProps) {
  const variantClass =
    variant === 'cta'
      ? styles.cta
      : variant === 'invert'
        ? styles.invert
        : styles.page

  return (
    <section
      className={[styles.section, variantClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </section>
  )
}

