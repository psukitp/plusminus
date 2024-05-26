import { Key } from "react"
import { Category } from "../../../common/types"

export type NewRecord = {
    categoryId: Key | null
    amount: number | null
}

export interface IAddNewModal {
    open: boolean
    title: string
    categories: Category[]
    categoriesLoading: boolean

    onCancel: () => void
    onOk: (data: NewRecord) => void
}
