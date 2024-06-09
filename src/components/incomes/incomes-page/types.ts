import { Category } from "@common/types"
import { NewRecord } from "@components/common/modal"
import { ModalRecordInfo } from "@components/common/modal/RecordModal"
import { ColumnsType } from "antd/es/table"
import { Key } from "react"

export type IncomesRecord = {
    id: Key
    date: Date | string
    categoryId: number
    categoryName: string
    categoryColor: string
    amount: number
}

export type IncomesByCategoryRecord = {
    id: Key
    categoryName: string
    amount: number
    color: string
}

export type IncomesLastMonthes = {
    monthes: string[]
    values: number[]
}

export type IncomesThisMonth = {
    incomesTotal: number
    incomesDiff: number
}

export interface IIncomesPageProps {
    currentDate: string
    columns: ColumnsType<IncomesRecord>
    records: IncomesRecord[]
    modalInfo: ModalRecordInfo
    recordsLoading: boolean
    summarizedRecords: IncomesByCategoryRecord[]
    summarizedColumns: ColumnsType<IncomesByCategoryRecord>
    categories: Category[]
    mode: "create" | "edit"
    categoriesLoading: boolean
    summarizedRecordsLoading: boolean
    viewModal: boolean

    setModalInfo: React.Dispatch<React.SetStateAction<ModalRecordInfo>>
    queriesOnCreate: (data: NewRecord) => Promise<void>
    editIncome: (income: {
        amount: number | null;
        categoryId: React.Key | null;
        id: React.Key | null;
    }) => void
    getIncomes: (date: string) => void
    getIncomesByCategories: (date: string) => void
    setCurrentDate: React.Dispatch<React.SetStateAction<string>>
    setMode: React.Dispatch<React.SetStateAction<"create" | "edit">>
    setViewModal: React.Dispatch<React.SetStateAction<boolean>>

}