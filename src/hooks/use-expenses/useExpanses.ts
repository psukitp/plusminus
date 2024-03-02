import { useEffect, useMemo, useState } from "react"
import { ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { expensesQueries } from "../../api/queries/expenses-queries"
import { ColumnsType } from "antd/es/table"


export const useExpenses = (): [ExpensesRecord[], ColumnsType<ExpensesRecord>] => {
    const [records, setRecords] = useState<ExpensesRecord[]>([])

    useEffect(() => {
        //TODO не отправлять айди, будет токен
        expensesQueries.fetchExpenses(1).then(result => setRecords(result))
    }, [])

    const columns = useMemo<ColumnsType<ExpensesRecord>>(() => records.length > 0
        ? [
            {
                title: 'Дата',
                dataIndex: 'date',
                key: 'date',
                onCell: (_, index) => ({
                    rowSpan: index === 0 || (index && records[index].date !== records[index - 1].date)
                        ? records.filter(item => item.date === records[index].date).length
                        : 0,
                }),
            },
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
        : [], [records])

    return [records, columns]
}