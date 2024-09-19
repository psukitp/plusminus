import { Category } from "@entities/category"
import { ExpensesByCategoryRecord, ExpensesRecord } from "@entities/expense"
import { NewRecord, ModalRecordInfo } from "@features/category"
import { ColumnsType } from "antd/es/table"

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