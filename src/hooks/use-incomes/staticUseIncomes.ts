import { IncomesByCategoryRecord, IncomesRecord } from "@components/incomes/incomes-page/types"
import { ColumnsType } from "antd/es/table"

export const columns: ColumnsType<IncomesRecord> = [
    {
        title: 'Категория',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
    }
]

export const summarizedColumns: ColumnsType<IncomesByCategoryRecord> = [
    {
        title: 'Категория',
        dataIndex: 'categoryName',
        key: 'categoryName',
    },
    {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
    },
]