import { useEffect, useMemo, useState } from "react"
import { ColumnsType } from "antd/es/table"
import { IncomesRecord } from "../../components/incomes/incomes-page/types"
import { incomesQueries } from "../../api/queries/incomes-queries"


export const useIncomes = (): [IncomesRecord[], ColumnsType<IncomesRecord>] => {
    const [records, setRecords] = useState<IncomesRecord[]>([])

    useEffect(() => {
        //TODO не отправлять айди, будет токен
        incomesQueries.fetchIncomes(1).then(result => setRecords(result))
    }, [])

    const columns = useMemo<ColumnsType<IncomesRecord>>(() => records.length > 0
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
                dataIndex: 'categoryId',
                key: 'categoryId',
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