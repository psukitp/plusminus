import { ColumnType } from "antd/es/table"
import { Key } from "react"

export type Record = {
    key: Key
    date: Date | string
    category: string
    amount: number
}

export interface ITableProps {
    records: any[]
    columns: ColumnType<any>[]
}

export type RecordSum = {
    key: Key
    category: string
    amount: number
}