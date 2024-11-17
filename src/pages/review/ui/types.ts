import { Dayjs } from 'dayjs'

export interface GridElement {
  startRow: number
  startCol: number
  endRow: number
  endCol: number
}

export interface IReviewPageProps {
  dates: [start: Dayjs, end: Dayjs]
  className?: string
}
