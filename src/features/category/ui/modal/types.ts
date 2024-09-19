import { Category } from "@entities/category"
import { NewCategory } from "@entities/category"
import { Key } from "react"

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