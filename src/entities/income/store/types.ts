import { IncomesByCategoryRecord, IncomesRecord } from "../model"

export interface ISummarizedIncomesData {
    data: IncomesByCategoryRecord[]
    isDataFetched: boolean
    loading: boolean
    fetchData: (date: string) => void
    editIncome: (prevExpense: IncomesRecord, newExpense: IncomesRecord) => void
    deleteIncome: (expense: Pick<IncomesRecord, "id" | "amount" | "categoryId">) => void
}
