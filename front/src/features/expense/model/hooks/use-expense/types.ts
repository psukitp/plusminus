import { EditedExpense, ExpensesRecord, NewExpense } from '@entities/expense'
import { Key } from 'react'

export type UseExpenseResult = {
  expenses: ExpensesRecord[]
  expensesLoading: boolean
  deleteExpense: (id: Key) => void
  addExpense: (expense: NewExpense) => void
  editExpense: (expense: EditedExpense) => void
}
