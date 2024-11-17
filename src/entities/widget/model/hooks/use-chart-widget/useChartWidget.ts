import { useEffect, useMemo, useState } from 'react'
import { ExpensesLastMonthes, expensesQueries } from '@entities/expense'
import { generateExpByCategories } from './generateExpByMonth'
import { generateLastMonthes as generateThisYear } from './generateExpLasMonthes'
import { incomesQueries } from '@entities/income'
import { IncomesLastMonthes } from '@entities/income'
import { ExpensesByCategoryRecord } from '@entities/expense'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'

export const useChartWidget = () => {
  const [expByCategoryLoading, setExpByCategoryLoading] =
    useState<boolean>(false)
  const [expThisYearLoading, setExpThisYearLoading] =
    useState<boolean>(false)
  const [incThisYearLoading, setIncThisYearLoading] =
    useState<boolean>(false)
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

  useEffect(() => {
    setExpByCategoryLoading(true)
    setExpThisYearLoading(true)
    setIncThisYearLoading(true)
    expensesQueries
      .fetchExpensesByCategory()
      .then((result) => setExpByCategory(result))
      .finally(() => setExpByCategoryLoading(false))
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
    () =>
      expByCategory ? generateExpByCategories(expByCategory, symbol) : {},
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
  ]
}
