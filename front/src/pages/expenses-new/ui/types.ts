export const DatePeriods = {
  Week: 'week',
  Month: 'month',
  Year: 'year',
} as const

export type DatePeriod = (typeof DatePeriods)[keyof typeof DatePeriods]

export const ChartTypes = {
  Pie: 'pie',
  Bar: 'bar',
}

export type ChartType = (typeof ChartTypes)[keyof typeof ChartTypes]
