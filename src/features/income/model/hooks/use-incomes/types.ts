import { IncomesByCategoryRecord, IncomesRecord } from '@entities/income'
import { IncomesByPeriod } from '@entities/income/model/types'
import { Key } from 'react'

export type UseIncomesResult = {
  incomes: [IncomesRecord[], boolean]
  incomesByCategory: [IncomesByCategoryRecord[], boolean]
  incomesLastTwoMonth: [IncomesByPeriod | null]
  actions: {
    createNewIncome: ({
      amount,
      categoryId,
      date,
    }: {
      amount: number
      categoryId: Key
      date: string
    }) => void
    getIncomes: (date: string) => void
    getIncomesByCategories: (date: string) => void
    deleteIncome: (
      incomeInfo: Pick<IncomesRecord, 'id' | 'amount' | 'categoryId'>,
    ) => void
    editIncome: (income: {
      amount: number | null
      categoryId: Key | null
      id: Key | null
    }) => void
    getIncomesLastTwoMonth: (date: string) => void
  }
}
