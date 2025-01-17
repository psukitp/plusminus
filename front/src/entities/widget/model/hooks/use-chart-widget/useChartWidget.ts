import { useMemo } from 'react'
import { expensesQueries } from '@entities/expense'
import { generateExpByCategories } from './generateExpByCategories'
import { generateLastMonthes as generateThisYear } from './generateLastMonthes'
import { incomesQueries } from '@entities/income/api'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import { Dates, StringDates } from '@shared/lib'
import { UseChartWidgetResult } from './types'
import { useQuery } from '@tanstack/react-query'

const format = 'YYYY-MM-DD'

export const useChartWidget = (dates: Dates): UseChartWidgetResult => {
  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo(() => getCurrencySymbol(currency), [currency])

  const stringDates = useMemo<StringDates>(() => {
    return [dates[0].format(format), dates[1].format(format)]
  }, [dates])

  const { data: expByCategory, isLoading: expByCategoryLoading } = useQuery({
    queryKey: ['expenses_by_category', stringDates],
    queryFn: () => expensesQueries.fetchExpensesByCategory(stringDates),
    initialData: [],
  })

  const { data: expThisYear, isLoading: expThisYearLoading } = useQuery({
    queryKey: ['expenses_last_monthes'],
    queryFn: () => expensesQueries.fetchExpensesByLastMonthes(),
    initialData: { monthes: [], values: [] },
  })

  const { data: incThisYear, isLoading: incThisYearLoading } = useQuery({
    queryKey: ['incomes_last_monthes'],
    queryFn: () => incomesQueries.fetchIncomesLastMonthes(),
    initialData: { monthes: [], values: [] },
  })

  const expByCategiriesOptions = useMemo(
    () => (expByCategory ? generateExpByCategories(expByCategory, symbol) : {}),
    [expByCategory],
  )

  const thisYearOptions = useMemo(
    () =>
      incThisYear && expThisYear
        ? generateThisYear(expThisYear, incThisYear)
        : {},
    [expThisYear, incThisYear],
  )

  return [
    { options: expByCategiriesOptions, loading: expByCategoryLoading },
    {
      options: thisYearOptions,
      loading: expThisYearLoading || incThisYearLoading,
    },
    expByCategory,
  ]
}
