import { Dayjs } from 'dayjs'

export interface ICalendarProps {
  className?: string
  value?: Dayjs | string
  range?: boolean
  onChange?: (day: Dayjs) => void
}
