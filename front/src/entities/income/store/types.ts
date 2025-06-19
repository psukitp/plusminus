import { Key } from 'react'
import { IncomesByCategoryRecord, IncomesRecord } from '../model'

export interface ISummarizedIncomesData {
  data: IncomesByCategoryRecord[]
  isDataFetched: boolean
  loading: boolean
  fetchData: (date: string) => void
  editIncome: (prevExpense: IncomesRecord, newExpense: IncomesRecord) => void
  deleteIncome: (
    expense: Pick<IncomesRecord, 'id' | 'amount' | 'categoryId'>,
  ) => void
}

export type IncomeStore = {
  incomes: IncomesRecord[]
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  setIncomes: (incomes: IncomesRecord[]) => void
  addIncome: (income: IncomesRecord) => void
  deleteIncome: (id: Key) => void
  editIncome: (income: IncomesRecord) => void
}
