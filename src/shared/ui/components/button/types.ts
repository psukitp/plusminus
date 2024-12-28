import { ReactElement, ReactNode } from 'react'

export type ButtonProps = {
  text?: string
  icon?: ReactElement
  type: 'primary' | 'secondary' | 'ghost'
  className?: string
  additionClass?: string
  textAlign?: 'center' | 'start' | 'end'
  children: ReactNode

  onClick: () => void
}
