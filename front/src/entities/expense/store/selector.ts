import { Key } from 'react'
import { ExpenseSelector, ExpenseStore } from './types'

export const select: ExpenseSelector = {
  expenseById: (id: Key | null) => (state: ExpenseStore) =>
    state.expenses.find((exp) => exp.id === id) ?? null,
}
