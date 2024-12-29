import { Dayjs } from 'dayjs'

export interface ISmallWidgetProps {
  title: string
  text: string
  isLoading: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
  additionalText?: string
  diff?: number
  dates?: [start: Dayjs, end: Dayjs]
  positive?: boolean
  className?: string
}
