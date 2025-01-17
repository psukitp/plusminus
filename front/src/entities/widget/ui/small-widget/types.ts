import { Dayjs } from 'dayjs'
import { ReactNode } from 'react'

export interface ISmallWidgetProps {
  title: string
  text: string
  isLoading: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
  additionalText?: string
  diff?: number
  dates?: [start: Dayjs, end: Dayjs]
  className?: string
  icon?: ReactNode
}
