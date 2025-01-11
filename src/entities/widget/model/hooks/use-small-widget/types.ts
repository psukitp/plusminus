import { ExpensesThisMonth } from '@entities/expense'
import { IncomesThisMonth } from '@entities/income'

export type RemainingThisMonth = {
  remainingTotal: number
  remainingDiff: number
}

export type DiffTotal = {
  diffTotal: number
  loading: boolean
}

export type UseSmallWidgetDataResult = [
  ExpensesThisMonth,
  IncomesThisMonth,
  RemainingThisMonth,
  DiffTotal,
]
