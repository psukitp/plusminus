import { create } from 'zustand'
import { IncomeStore } from './types'

export const useIncomeStore = create<IncomeStore>((set, get) => ({
  incomes: [],
  isCreating: false,
  setIsCreating: (isCreating) => set({ isCreating }),
  setIncomes: (incomes) => set({ incomes }),
  addIncome: (newIncomes) => {
    const { incomes } = get()
    set({
      incomes: [...incomes, newIncomes],
    })
  },
  deleteIncome: (id) => {
    const { incomes } = get()

    set({
      incomes: incomes.filter((inc) => inc.id !== id),
    })
  },
  editIncome: (income) => {
    const { incomes } = get()

    set({
      incomes: incomes.map((inc) =>
        inc.id === income.id ? { ...income } : inc,
      ),
    })
  },
}))
