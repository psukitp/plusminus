import { Dayjs } from 'dayjs'

export interface ICalendarProps {
  className?: string
  value?: Dayjs | string
  onChange?: (day: Dayjs) => void
}
