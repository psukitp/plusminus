import { useEffect, useMemo, useState } from "react"
import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { expensesQueries } from "../../api/queries/expenses-queries"
import { ColumnsType } from "antd/es/table"


export const useExpenses = ():
    [
        [ExpensesRecord[], ColumnsType<ExpensesRecord>],
        [Omit<ExpensesByCategoryRecord, 'color'>[], ColumnsType<Omit<ExpensesByCategoryRecord, 'color'>>]
    ] => {
    const [records, setRecords] = useState<ExpensesRecord[]>([])
    const [summarizedRecords, setSummarizedRecords] = useState<Omit<ExpensesByCategoryRecord, 'color'>[]>([])

    useEffect(() => {
        //TODO не отправлять айди, будет токен
        expensesQueries.fetchExpenses(1).then(result => setRecords(result))

        expensesQueries.fetchExpensesByCategory(1)
            .then(result => setSummarizedRecords(result.map(e => ({
                categoryName: e.categoryName,
                amount: e.amount
            }))))
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

    const summarizedColumns = useMemo<ColumnsType<Omit<ExpensesByCategoryRecord, 'color'>>>(() => summarizedRecords.length > 0
        ? [
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
        : [], [summarizedRecords])

    return [[records, columns], [summarizedRecords, summarizedColumns]]
}