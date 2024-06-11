import { create } from "zustand"
import { ISummarizedExpensesData } from "./types"
import { expensesQueries } from "@api/queries/expenses-queries"

export const useSummarizedExpensesData = create<ISummarizedExpensesData>(set => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async (date) => {
        set({ loading: true })
        const result = await expensesQueries.fetchExpensesByCategory(date)
        set({ data: result, loading: false, isDataFetched: true })
    },
    editExpense: (prevExpense, newExpense) => { },
    deleteExpense: (expense) => {
        set((state) => ({
            data: state.data
                .map(c => c.id === expense?.categoryId
                    ? { ...c, amount: c.amount - expense.amount }
                    : c)
                .filter(c => c.amount !== 0)
        }))
    }
}))
