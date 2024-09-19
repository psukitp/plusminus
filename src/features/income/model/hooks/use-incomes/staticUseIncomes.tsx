import { IncomesByCategoryRecord, IncomesRecord } from "@entities/income"
import { ColumnsType } from "antd/es/table"

export const columns: ColumnsType<IncomesRecord> = [
    {
        title: 'Категория',
        dataIndex: 'categoryName',
        key: 'categoryName',
        render: (_: any, record) => <span
            style={{
                borderBottom: `1px ${record.categoryColor} solid`
            }}>
            {record.categoryName}
        </span>
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