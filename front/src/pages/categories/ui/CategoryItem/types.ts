import { ReactNode } from 'react'

export interface ICategoryItemProps {
  label: ReactNode
  className?: string
  color?: string

  onEdit?: () => void
  onDelete?: () => void
}
