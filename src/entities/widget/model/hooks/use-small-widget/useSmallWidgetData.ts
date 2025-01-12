import { useMemo } from 'react'
import { incomesQueries } from '@entities/income/api'
import { expensesQueries } from '@entities/expense'
import { Dates, StringDates } from '@shared/lib'
import { useQuery } from '@tanstack/react-query'
import { UseSmallWidgetDataResult } from './types'

const format = 'YYYY-MM-DD'

export const useSmallWidgetData = (dates: Dates): UseSmallWidgetDataResult => {
  const stringDates = useMemo<StringDates>(() => {
    return [dates[0].format(format), dates[1].format(format)]
  }, [dates])

  const { data: expensesData, isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', stringDates],
    queryFn: () => expensesQueries.fetchExpensesSum(stringDates),
    initialData: { expensesDiff: 0, expensesTotal: 0 },
  })

  const { data: incomesData, isLoading: incomesLoading } = useQuery({
    queryKey: ['incomes', stringDates],
    queryFn: () => incomesQueries.fecthIncomesSum(stringDates),
    initialData: { incomesTotal: 0, incomesDiff: 0 },
  })

  const { data: totalDiffData, isLoading: totalDiffLoading } = useQuery({
    queryKey: ['totalDiff'],
    queryFn: () => incomesQueries.getTotalDiff(),
    initialData: 0,
  })

  const remainingSum = useMemo<number>(
    () => incomesData.incomesTotal - expensesData.expensesTotal,
    [incomesData, expensesData],
  )

  return [
    { ...expensesData, loading: expensesLoading },
    { ...incomesData, loading: incomesLoading },
    remainingSum,
    { diffTotal: totalDiffData, loading: totalDiffLoading },
  ]
}
