import { Dayjs } from 'dayjs'

export interface GridElement {
  startrow: number
  startcol: number
  endrow: number
  endcol: number
}

export interface IReviewPageProps {
  dates: [start: Dayjs, end: Dayjs]
  className?: string
}
