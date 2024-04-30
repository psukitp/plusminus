import { Key } from "react"

export type NewRecord = {
    categoryId: Key | null
    amount: number | null
}

export interface IAddNewModal {
    open: boolean

    onCancel: () => void
    onOk: (data: NewRecord) => void
}
