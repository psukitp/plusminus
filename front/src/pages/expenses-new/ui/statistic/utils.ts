import { Dates } from '@shared/lib'
import { DatePeriod, DatePeriods } from '../types'
import dayjs from 'dayjs'

export const getDates = (period: DatePeriod): Dates => {
  const endDate = dayjs()
  switch (period) {
    case DatePeriods.Week:
      return [endDate.add(-1, 'week'), endDate]
    case DatePeriods.Month:
      return [endDate.add(-1, 'month'), endDate]
    case DatePeriods.Year:
      return [endDate.add(-1, 'year'), endDate]
  }
}
