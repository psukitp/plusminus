import { ReactNode } from 'react'

export interface IModalProps {
  open: boolean

  title?: string
  className?: string
  children?: ReactNode
  width?: number

  onClose: () => void
}
