import { IncomesByCategoryRecord, IncomesRecord } from "@components/incomes/incomes-page/types"
import { ColumnsType } from "antd/es/table"
import { Key } from "react"

export type UseIncomesResult = [
    [IncomesRecord[], ColumnsType<IncomesRecord>, boolean],
    [IncomesByCategoryRecord[], ColumnsType<IncomesByCategoryRecord>, boolean],
    {
        createNewIncomes: ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => void,
        getIncomes: (date: string) => void
        getIncomesByCategories: (date: string) => void
        deleteIncome: (incomeInfo: Pick<IncomesRecord, "id" | "amount" | "categoryId">) => void
        editIncome: (income: { amount: number | null, categoryId: Key | null, id: Key | null }) => void
    }
]