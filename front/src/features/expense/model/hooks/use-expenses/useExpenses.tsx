import { Key, useEffect, useState } from 'react'
import { ExpensesRecord } from '@entities/expense'
import { expensesQueries } from '@entities/expense'
import dayjs from 'dayjs'
import { useSummarizedExpensesData } from '@entities/expense'
import { UseExpensesResult } from './types'
import { ExpensesLastWeek } from '@entities/expense/model/types'
import { useQueryClient } from '@tanstack/react-query'

export const useExpenses = (
  startDate: string,
  endDate: string,
): UseExpensesResult => {
  const [loading, setLoading] = useState({
    records: false,
  })
  const [records, setRecords] = useState<ExpensesRecord[]>([])
  const [expensesLastWeek, setExpensesLastWeek] =
    useState<ExpensesLastWeek | null>(null)

  const queryClient = useQueryClient()

  const {
    data: sumRecords,
    fetchData,
    deleteExpense: deleteExpenseState,
    isDataFetched,
    loading: sumLoading,
  } = useSummarizedExpensesData()

  useEffect(() => {
    if (!isDataFetched)
      fetchData([
        dayjs().format('YYYY-MM-DD'),
        dayjs().add(1, 'week').format('YYYY-MM-DD'),
      ])
  }, [])

  useEffect(() => {
    setLoading({ records: true })
    getExpensesLastWeek(dayjs().format('YYYY-MM-DD'))
  }, [])

  useEffect(() => void getExpenses(startDate, endDate), [startDate, endDate])

  const createNewExpense = async ({
    amount,
    categoryId,
    date,
  }: {
    amount: number
    categoryId: Key
    date: string
  }) => {
    await expensesQueries
      .createNewExpense({ amount, categoryId, date })
      .then(
        (result) =>
          result &&
          setRecords((prev) => [
            ...prev,
            { ...result, date: dayjs(result.date).format('YYYY-MM-DD') },
          ]),
      )
      .then(() =>
        queryClient.invalidateQueries({
          queryKey: ['expenses_by_category'],
          exact: false,
        }),
      )
  }

  const getExpensesLastWeek = async (date: string) => {
    await expensesQueries
      .fetchExpensesLastWeek(date)
      .then((result) => setExpensesLastWeek(result))
  }

  const getExpenses = async (startDate: string, endDate: string) => {
    setLoading((prev) => ({ ...prev, records: true }))
    await expensesQueries
      .fetchExpenses(startDate, endDate)
      .then((result) =>
        setRecords(
          result.map((e) => ({
            ...e,
            date: dayjs(e.date).format('YYYY-MM-DD'),
          })),
        ),
      )
      .finally(() => setLoading((prev) => ({ ...prev, records: false })))
  }

  const deleteExpense = async (id: Key) => {
    await expensesQueries.deleteExpense(id).then((result) => {
      deleteExpenseState(id)
      setRecords((prev) => prev.filter((e) => e.id != result))
    })
  }

  const editExpense = async (expense: {
    id: Key | null
    categoryId: Key | null
    amount: number | null
  }) => {
    await expensesQueries
      .editExpense(expense)
      .then((result) => {
        setRecords((prev) =>
          prev.map((e) => (e.id === result?.id ? { ...result } : e)),
        )

        return result
      })
      .then((result) => {
        if (result?.date)
          queryClient.invalidateQueries({
            queryKey: ['expenses_by_category'],
            exact: false,
          })
      })
  }

  return {
    expenses: [records, loading.records],
    expensesByCategory: [sumRecords, sumLoading],
    expensesLastWeek: [expensesLastWeek],
    actions: {
      createNewExpense,
      getExpenses,
      getExpensesByCategories: fetchData,
      deleteExpense,
      editExpense,
      getExpensesLastWeek,
    },
  }
}
