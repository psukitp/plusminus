import { Category } from "@shared/lib"
import { Key } from "react"

export type NewCategory = Partial<Pick<Category, "color" | "name">>

export type CategoryRecord = {
    id: number
    date: Date | string
    categoryName: string
    amount: number
}

export type ModalInfo = {
    id: Key
    title: string
    color: string
    name: string
}

export interface IAddNewCategoryModalProps {
    open: boolean
    modalInfo: ModalInfo
    mode: "create" | "edit"
    onCancel: () => void
    onCreate: (newRecord: NewCategory) => void
    onEdit: (record: Partial<Category>) => void
}