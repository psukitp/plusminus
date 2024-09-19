import { ExpensesByCategoryRecord, ExpensesRecord } from "../model"

export interface ISummarizedExpensesData {
    data: ExpensesByCategoryRecord[]
    isDataFetched: boolean
    loading: boolean
    fetchData: (date: string) => void
    editExpense: (prevExpense: ExpensesRecord, newExpense: ExpensesRecord) => void
    deleteExpense: (expense: Pick<ExpensesRecord, "id" | "amount" | "categoryId">) => void
}
