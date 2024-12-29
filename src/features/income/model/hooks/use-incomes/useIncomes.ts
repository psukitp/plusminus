import { Key, useEffect, useState } from 'react'
import { IncomesRecord } from '@entities/income/model'
import { incomesQueries } from '@entities/income/api'
import dayjs from 'dayjs'
import { useSummarizedIncomesData } from '@entities/income/store'
import { UseIncomesResult } from './types'
import { IncomesByPeriod } from '@entities/income/model'

export const useIncomes = (): UseIncomesResult => {
  const [recordsLoading, setRecordsLoading] = useState(false)
  const [records, setRecords] = useState<IncomesRecord[]>([])
  const [incomesLastTwoMonth, setIncomesLastTwoMonth] =
    useState<IncomesByPeriod | null>(null)

  const {
    data: sumRecords,
    fetchData,
    deleteIncome: deleteIncomeState,
    isDataFetched,
    loading: sumLoading,
  } = useSummarizedIncomesData()

  useEffect(() => {
    if (!isDataFetched) fetchData(dayjs().format('YYYY-MM-DD'))
  }, [])

  useEffect(() => {
    setRecordsLoading(true)
    getIncomes(dayjs().format('YYYY-MM-DD'))
    getIncomesLastTwoMonth(dayjs().format('YYYY-MM-DD'))
  }, [])

  const getIncomesLastTwoMonth = async (date: string) => {
    await incomesQueries
      .getIncomesByPeriod(
        dayjs(date).add(-1, 'month').format('YYYY-MM-DD'),
        date,
      )
      .then((result) => setIncomesLastTwoMonth(result))
  }

  const createNewIncome = async ({
    amount,
    categoryId,
    date,
  }: {
    amount: number
    categoryId: Key
    date: string
  }) => {
    await incomesQueries
      .createNewIncomes({ amount, categoryId, date })
      .then((result) =>
        setRecords(
          result.map((e) => ({
            ...e,
            date: dayjs(e.date).format('YYYY-MM-DD'),
          })),
        ),
      )
      .then(() => fetchData(date))
  }

  const getIncomes = async (date: string) => {
    setRecordsLoading(true)
    await incomesQueries
      .fetchIncomes(date)
      .then((result) =>
        setRecords(
          result.map((e) => ({
            ...e,
            date: dayjs(e.date).format('YYYY-MM-DD'),
          })),
        ),
      )
      .finally(() => setRecordsLoading(false))
  }

  const deleteIncome = async (
    incomeInfo: Pick<IncomesRecord, 'id' | 'amount' | 'categoryId'>,
  ) => {
    await incomesQueries.deleteIncome(incomeInfo.id).then((result) => {
      deleteIncomeState(incomeInfo)
      setRecords((prev) => prev.filter((e) => e.id != result))
    })
  }

  const editIncome = async (income: {
    id: Key | null
    categoryId: Key | null
    amount: number | null
  }) => {
    await incomesQueries
      .editIncome(income)
      .then((result) => {
        setRecords((prev) =>
          prev.map((e) => (e.id === result?.id ? { ...result } : e)),
        )

        return result
      })
      .then((result) => {
        if (result?.date) fetchData(result?.date.toString())
      })
  }

  return {
    incomes: [records, recordsLoading],
    incomesByCategory: [sumRecords, sumLoading],
    incomesLastTwoMonth: [incomesLastTwoMonth],
    actions: {
      createNewIncome,
      getIncomes,
      getIncomesByCategories: fetchData,
      deleteIncome,
      editIncome,
      getIncomesLastTwoMonth,
    },
  }
}
