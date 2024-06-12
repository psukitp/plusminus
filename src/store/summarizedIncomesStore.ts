import { create } from "zustand"
import { ISummarizedIncomesData } from "./types"
import { incomesQueries } from "@api/queries/incomes-queries"

export const useSummarizedIncomesData = create<ISummarizedIncomesData>(set => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async (date) => {
        set({ loading: true })
        const result = await incomesQueries.fetchIncomesByCategory(date)
        set({ data: result, loading: false, isDataFetched: true })
    },
    editIncome: () => { },
    deleteIncome: (income) => {
        set((state) => ({
            data: state.data
                .map(c => c.id === income?.categoryId
                    ? { ...c, amount: c.amount - income.amount }
                    : c)
                .filter(c => c.amount !== 0)
        }))
    }
}))