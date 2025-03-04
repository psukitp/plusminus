import { StringDates } from '@shared/lib'
import { ExpensesByCategoryRecord, ExpensesRecord } from '../model'
import { Key } from 'react'

export interface ISummarizedExpensesData {
  data: ExpensesByCategoryRecord[]
  isDataFetched: boolean
  loading: boolean
  fetchData: (dates: StringDates) => void
  editExpense: (prevExpense: ExpensesRecord, newExpense: ExpensesRecord) => void
  deleteExpense: (id: Key) => void
}
