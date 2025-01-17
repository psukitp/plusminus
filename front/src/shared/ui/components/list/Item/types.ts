import { ReactNode } from 'react'

export interface IItemProps {
  title: string
  suffix?: ReactNode
  color?: string
  className?: string
  value?: string | number | null

  onEdit?: () => void
  onDelete?: () => void
}
