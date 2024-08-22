import { IncomesByCategoryRecord, IncomesRecord } from "@pages/incomes/ui/types"

export interface ISummarizedIncomesData {
    data: IncomesByCategoryRecord[]
    isDataFetched: boolean
    loading: boolean
    fetchData: (date: string) => void
    editIncome: (prevExpense: IncomesRecord, newExpense: IncomesRecord) => void
    deleteIncome: (expense: Pick<IncomesRecord, "id" | "amount" | "categoryId">) => void
}
