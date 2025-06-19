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

export type ExpenseStore = {
  expenses: ExpensesRecord[]
  isCreating: boolean
  setIsCreating: (value: boolean) => void
  setExpenses: (expenses: ExpensesRecord[]) => void
  addExpense: (expense: ExpensesRecord) => void
  deleteExpense: (id: Key) => void
  editExpense: (expense: ExpensesRecord) => void
}

export type ExpenseSelector = {
  expenseById: (
    id: Key | null,
  ) => (state: ExpenseStore) => ExpensesRecord | null
}
