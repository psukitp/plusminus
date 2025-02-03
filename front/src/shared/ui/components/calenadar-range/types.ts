import { Dayjs } from 'dayjs'

export interface ICalendarProps {
  className?: string
  value?: [Dayjs, Dayjs]
  onChange?: (day: [Dayjs, Dayjs]) => void
}
