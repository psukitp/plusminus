import { ExpensesThisMonth } from '@entities/expense'
import { IncomesThisMonth } from '@entities/income'

export type DiffTotal = {
  diffTotal: number
  loading: boolean
}

export type UseSmallWidgetDataResult = [
  ExpensesThisMonth,
  IncomesThisMonth,
  number,
  DiffTotal,
]
