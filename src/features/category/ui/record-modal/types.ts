import { Key } from "react"
import { Category } from "@entities/category"

export type ModalRecordInfo = {
    id: Key | null
    categoryId: Key | null
    amount: number | null
}

export type NewRecord = {
    categoryId: Key | null
    amount: number | null
}

export interface IRecordModal {
    open: boolean
    title: string
    categories: Category[]
    categoriesLoading: boolean
    recordInfo: ModalRecordInfo
    mode: "create" | "edit"

    onCancel: () => void
    onCreate: (data: NewRecord) => void
    onEdit: (data: NewRecord & { id: Key | null }) => void
    onChangeRecordInfo: (value: React.SetStateAction<ModalRecordInfo>) => void
}
