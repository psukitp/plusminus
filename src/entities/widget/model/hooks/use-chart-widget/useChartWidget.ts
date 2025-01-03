import { useEffect, useMemo, useState } from 'react'
import { ExpensesLastMonthes, expensesQueries } from '@entities/expense'
import { generateExpByCategories } from './generateExpByCategories'
import { generateLastMonthes as generateThisYear } from './generateLastMonthes'
import { incomesQueries } from '@entities/income/api'
import { IncomesLastMonthes } from '@entities/income/model'
import { ExpensesByCategoryRecord } from '@entities/expense'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import { Dates, StringDates } from '@shared/lib'
import { UseChartWidgetResult } from './types'

const format = 'YYYY-MM-DD'

export const useChartWidget = (dates: Dates): UseChartWidgetResult => {
  const [expByCategoryLoading, setExpByCategoryLoading] =
    useState<boolean>(false)
  const [expThisYearLoading, setExpThisYearLoading] = useState<boolean>(false)
  const [incThisYearLoading, setIncThisYearLoading] = useState<boolean>(false)
  const [expByCategory, setExpByCategory] = useState<
    ExpensesByCategoryRecord[]
  >([])

  const [expThisYear, setExpThisYear] = useState<ExpensesLastMonthes>({
    monthes: [],
    values: [],
  })
  const [incThisYear, setIncThisYear] = useState<IncomesLastMonthes>({
    monthes: [],
    values: [],
  })

  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo(() => getCurrencySymbol(currency), [currency])

  const stringDates = useMemo<StringDates>(() => {
    return [dates[0].format(format), dates[1].format(format)]
  }, [dates])

  useEffect(() => {
    setExpByCategoryLoading(true)
    expensesQueries
      .fetchExpensesByCategory(stringDates)
      .then((result) => setExpByCategory(result))
      .finally(() => setExpByCategoryLoading(false))
  }, [stringDates])

  useEffect(() => {
    setExpThisYearLoading(true)
    setIncThisYearLoading(true)
    expensesQueries
      .fetchExpensesByLastMonthes()
      .then((result) => setExpThisYear(result))
      .finally(() => setExpThisYearLoading(false))
    incomesQueries
      .fetchIncomesLastMonthes()
      .then((result) => setIncThisYear(result))
      .finally(() => setIncThisYearLoading(false))
  }, [])

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
