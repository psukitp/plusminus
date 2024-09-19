import { ExpensesByCategoryRecord, ExpensesRecord } from "@entities/expense"
import { ColumnsType } from "antd/es/table"
import { Key } from "react"

export type UseExpensesResult = [
    [ExpensesRecord[], ColumnsType<ExpensesRecord>, boolean],
    [ExpensesByCategoryRecord[], ColumnsType<ExpensesByCategoryRecord>, boolean],
    {
        createNewExpense: ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => void,
        getExpenses: (date: string) => void,
        getExpensesByCategories: (date: string) => void
        deleteExpense: (expenseInfo: Pick<ExpensesRecord, "id" | "amount" | "categoryId">) => void
        editExpense: (expense: { amount: number | null, categoryId: Key | null, id: Key | null }) => void
    }
]
