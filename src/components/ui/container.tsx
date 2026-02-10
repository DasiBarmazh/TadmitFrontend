import type { ComponentPropsWithoutRef, ElementType } from 'react'
import styles from './container.module.css'

type ContainerProps<T extends ElementType> = {
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={[styles.container, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}

