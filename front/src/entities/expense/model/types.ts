import { Key } from 'react'

export type ExpensesRecord = {
  id: Key
  date: Date | string
  categoryId: Key
  categoryName: string
  categoryColor: string
  amount: number
}

export type NewExpense = {
  date: string
  categoryId: Key | null
  amount: number
}

export type EditedExpense = Partial<NewExpense> & { id: Key }

export type ExpensesByCategoryRecord = {
  id: Key
  categoryName: string
  amount: number
  color: string
}

export type ExpensesLastMonthes = {
  monthes: string[]
  values: number[]
}

export type ExpensesThisMonth = {
  loading: boolean
  expensesTotal: number
  expensesDiff: number
}

export type ExpensesLastWeek = {
  days: string[]
  values: number[]
}
