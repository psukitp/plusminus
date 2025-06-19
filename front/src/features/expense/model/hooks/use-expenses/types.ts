import {
  ExpensesByCategoryRecord,
  ExpensesRecord,
  EditedExpense,
  ExpensesLastWeek,
} from '@entities/expense'
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
    getExpenses: (startDate: string, endDate: string) => void
    getExpensesByCategories: (dates: StringDates) => void
    getExpensesLastWeek: (date: string) => void
    deleteExpense: (id: Key) => void
    editExpense: (expense: EditedExpense) => void
  }
}
