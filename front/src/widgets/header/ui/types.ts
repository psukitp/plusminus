import { Dayjs } from 'dayjs'

export interface IHeaderComponentProps {
  showDates: boolean
  className?: string
  dates: [Dayjs, Dayjs]
  onChangeDates: (value: [start: Dayjs, end: Dayjs]) => void
}
