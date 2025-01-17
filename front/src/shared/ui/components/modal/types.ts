import { ReactNode } from 'react'

export interface IModalProps {
  open: boolean

  closable?: boolean
  title?: string
  className?: string
  children?: ReactNode
  width?: number

  onClose: () => void
}
