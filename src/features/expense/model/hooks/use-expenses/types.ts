import { ExpensesByCategoryRecord, ExpensesRecord } from '@entities/expense'
import { ExpensesLastWeek } from '@entities/expense/model/types'
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
    getExpensesByCategories: (date: string) => void
    deleteExpense: (
      expenseInfo: Pick<ExpensesRecord, 'id' | 'amount' | 'categoryId'>,
    ) => void
    editExpense: (expense: {
      amount: number | null
      categoryId: Key | null
      id: Key | null
    }) => void
  }
}
