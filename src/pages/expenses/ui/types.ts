import { Category } from "@shared/lib"
import { NewRecord } from "@shared/ui/record-modal/types"
import { ModalRecordInfo } from "@shared/ui/record-modal/RecordModal"
import { ColumnsType } from "antd/es/table"
import { Key } from "react"

export type ExpensesRecord = {
    id: Key
    date: Date | string
    categoryId: Key
    categoryName: string
    categoryColor: string
    amount: number
}

export type ExpensesByCategoryRecord = {
    id: Key
    categoryName: string
    amount: number
    color: string
}

export type ExpensesLastMonthes = {
    monthes: string[]
    values: number[]
}

export type ExpensesThisMonth = {
    expensesTotal: number
    expensesDiff: number
}

export interface IExpensesPage {
    currentDate: string
    columns: ColumnsType<ExpensesRecord>
    records: ExpensesRecord[]
    modalInfo: ModalRecordInfo
    recordsLoading: boolean
    summarizedRecords: ExpensesByCategoryRecord[]
    summarizedColumns: ColumnsType<ExpensesByCategoryRecord>
    categories: Category[]
    mode: "create" | "edit"
    categoriesLoading: boolean
    summarizedRecordsLoading: boolean
    viewModal: boolean
    summaryExpenses: number

    setModalInfo: React.Dispatch<React.SetStateAction<ModalRecordInfo>>
    queriesOnCreate: (data: NewRecord) => Promise<void>
    editExpense: (expense: {
        amount: number | null;
        categoryId: React.Key | null;
        id: React.Key | null;
    }) => void
    getExpenses: (date: string) => void
    getExpensesByCategories: (date: string) => void
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit">>
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>

}