import { ExpensesByCategoryRecord, ExpensesRecord } from '@entities/expense'
import { ExpensesLastWeek } from '@entities/expense/model/types'
import { StringDates } from '@shared/lib'
import { Key } from 'react'

export type UseExpensesResult = {
  expenses: [ExpensesRecord[], boolean]
  expensesByCategory: [ExpensesByCategoryRecord[], boolean]
  expensesLastWeek: [ExpensesLastWeek | null]
  actions: {
    createNewExpense: ({
      amount,
      categoryId,
      date,
    }: {
      amount: number
      categoryId: Key
      date: string
    }) => void
    getExpenses: (date: string) => void
    getExpensesByCategories: (dates: StringDates) => void
    getExpensesLastWeek: (date: string) => void
    deleteExpense: (id: Key) => void
    editExpense: (expense: {
      amount: number | null
      categoryId: Key | null
      id: Key | null
    }) => void
  }
}
