import { create } from 'zustand'
import { ExpenseStore } from './types'

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  isCreating: false,
  setIsCreating: (isEditing) => set({ isCreating: isEditing }),
  setExpenses: (expenses) => set({ expenses }),
  addExpense: (newExpense) => {
    const { expenses } = get()
    set({
      expenses: [...expenses, newExpense],
    })
  },
  deleteExpense: (id) => {
    const { expenses } = get()

    set({
      expenses: expenses.filter((exp) => exp.id !== id),
    })
  },
  editExpense: (expense) => {
    const { expenses } = get()

    set({
      expenses: expenses.map((exp) =>
        exp.id === expense.id ? { ...expense } : exp,
      ),
    })
  },
}))
