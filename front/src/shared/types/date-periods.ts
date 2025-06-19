export const DatePeriods = {
  Week: 'week',
  Month: 'month',
  Year: 'year',
} as const

export type DatePeriod = (typeof DatePeriods)[keyof typeof DatePeriods]
