import { useEffect, useMemo, useState } from 'react'
import { incomesQueries, IncomesThisMonth } from '@entities/income'
import { expensesQueries, ExpensesThisMonth } from '@entities/expense'
import { Dates, StringDates } from '@shared/lib'

type RemainingThisMonth = {
  remainingTotal: number
  remainingDiff: number
}

type DiffTotal = {
  diffTotal: number
  loading: boolean
}

type UseSmallWidgetDataResult = [
  ExpensesThisMonth,
  IncomesThisMonth,
  RemainingThisMonth,
  DiffTotal,
]

const format = 'YYYY-MM-DD'

export const useSmallWidgetData = (dates: Dates): UseSmallWidgetDataResult => {
  const [expensesByPeriod, setExpensesByPeriod] = useState<ExpensesThisMonth>({
    loading: false,
    expensesDiff: 0,
    expensesTotal: 0,
  })

  const [incomesByPeriod, setIncomesByPeriod] = useState<IncomesThisMonth>({
    loading: false,
    incomesTotal: 0,
  })

  const [diffTotal, setDiffTotal] = useState<DiffTotal>({
    diffTotal: 0,
    loading: false,
  })

  const stringDates = useMemo<StringDates>(() => {
    return [dates[0].format(format), dates[1].format(format)]
  }, [dates])

  useEffect(() => {
    setExpensesByPeriod((prev) => ({ ...prev, loading: true }))
    setIncomesByPeriod((prev) => ({ ...prev, loading: true }))
    expensesQueries
      .fetchExpensesSum(stringDates)
      .then((result) => setExpensesByPeriod({ loading: false, ...result }))
    incomesQueries
      .fecthIncomesSum(stringDates)
      .then((result) => setIncomesByPeriod({ loading: false, ...result }))
  }, [stringDates])

  useEffect(() => {
    setDiffTotal((prev) => ({ ...prev, loading: true }))
    incomesQueries
      .getTotalDiff()
      .then((result) => setDiffTotal({ loading: false, diffTotal: result }))
  }, [])

  const remainingSum = useMemo<RemainingThisMonth>(
    () => ({
      remainingTotal:
        incomesByPeriod.incomesTotal - expensesByPeriod.expensesTotal,
      remainingDiff:
        incomesByPeriod.incomesTotal - expensesByPeriod.expensesTotal,
    }),
    [expensesByPeriod, incomesByPeriod],
  )

  return [expensesByPeriod, incomesByPeriod, remainingSum, diffTotal]
}
