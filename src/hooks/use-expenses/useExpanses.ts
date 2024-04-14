import { Key, useEffect, useState } from "react"
import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { expensesQueries } from "../../api/queries/expenses-queries"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"

const columns: ColumnsType<ExpensesRecord> = [
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

const summarizedColumns: ColumnsType<Omit<ExpensesByCategoryRecord, 'color'>> = [
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

export const useExpenses = ():
    [
        [ExpensesRecord[], ColumnsType<ExpensesRecord>],
        [Omit<ExpensesByCategoryRecord, 'color'>[], ColumnsType<Omit<ExpensesByCategoryRecord, 'color'>>],
        { createNewExpense: ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => void }
    ] => {
    const [records, setRecords] = useState<ExpensesRecord[]>([])
    const [summarizedRecords, setSummarizedRecords] = useState<Omit<ExpensesByCategoryRecord, 'color'>[]>([])

    useEffect(() => {
        expensesQueries.fetchExpenses().then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))

        expensesQueries.fetchExpensesByCategory()
            .then(result => setSummarizedRecords
                (result.map(e => ({
                    categoryName: e.categoryName,
                    amount: e.amount
                })))
            )
    }, [])

    const createNewExpense = async ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => {
        await expensesQueries.createNewExpense({ amount, categoryId, date }).then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
    }

    return [[records, columns], [summarizedRecords, summarizedColumns], { createNewExpense }]
}