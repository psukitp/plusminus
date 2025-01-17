import { Dayjs } from 'dayjs'

export interface IHeaderComponentProps {
  showDates: boolean
  className?: string
  onChangeDates: (value: [start: Dayjs, end: Dayjs]) => void
}
