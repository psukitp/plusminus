import { ColumnType } from "antd/es/table"
import { CSSProperties, Key } from "react"

export type Record = {
    key: Key
    date: Date | string
    category: string
    amount: number
}

export interface ITableProps {
    rowKey: string
    records: any[]
    columns: ColumnType<any>[]
    style?: CSSProperties
    className?: string
    loading?: boolean

    // onRow?: GetComponentProps
}

export type RecordSum = {
    key: Key
    category: string
    amount: number
}