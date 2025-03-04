import { create } from 'zustand'
import { ISummarizedExpensesData } from './types'
import { expensesQueries } from '../api/queries'

export const useSummarizedExpensesData = create<ISummarizedExpensesData>(
  (set) => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async (dates) => {
      set({ loading: true })
      const result = await expensesQueries.fetchExpensesByCategory(dates)
      set({
        data: result.sort((a, b) => b.amount - a.amount),
        loading: false,
        isDataFetched: true,
      })
    },
    editExpense: () => {},
    deleteExpense: (id) => {
      set((state) => ({
        data: state.data
          .map((c) => (c.id === id ? { ...c, amount: c.amount } : c))
          .filter((c) => c.amount !== 0),
      }))
    },
  }),
)
