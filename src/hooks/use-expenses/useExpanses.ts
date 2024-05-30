import { Key, useEffect, useState } from "react"
import { ExpensesByCategoryRecord, ExpensesRecord } from "@components/expenses/expenses-page/types"
import { expensesQueries } from "@api/queries/expenses-queries"
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

const summarizedColumns: ColumnsType<ExpensesByCategoryRecord> = [
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

type UseExpensesResult = [
    [ExpensesRecord[], ColumnsType<ExpensesRecord>, boolean],
    [ExpensesByCategoryRecord[], ColumnsType<ExpensesByCategoryRecord>, boolean],
    {
        createNewExpense: ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => void,
        getExpenses: (date: string) => void,
        getExpensesByCategories: (date: string) => void
    }
]

export const useExpenses = (): UseExpensesResult => {
    const [loading, setLoading] = useState({ records: false, summarizedRecords: false })
    const [records, setRecords] = useState<ExpensesRecord[]>([])
    const [summarizedRecords, setSummarizedRecords] = useState<ExpensesByCategoryRecord[]>([])

    useEffect(() => {
        setLoading({ records: true, summarizedRecords: true })
        expensesQueries.fetchExpenses(dayjs().format('YYYY-MM-DD'))
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .finally(() => setLoading((prev) => ({ ...prev, records: false })))

        expensesQueries.fetchExpensesByCategory(dayjs().format('YYYY-MM-DD'))
            .then(result => setSummarizedRecords
                (result.map(e => ({
                    categoryName: e.categoryName,
                    amount: e.amount,
                    color: e.color
                })))
            )
            .finally(() => setLoading((prev) => ({ ...prev, summarizedRecords: false })))
    }, [])

    const createNewExpense = async ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => {
        await expensesQueries.createNewExpense({ amount, categoryId, date }).then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
    }

    const getExpenses = async (date: string) => {
        setLoading((prev) => ({ ...prev, records: true }))
        await expensesQueries.fetchExpenses(date)
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .finally(() => setLoading((prev) => ({ ...prev, records: false })))
    }

    const getExpensesByCategories = async (date: string) => {
        setLoading((prev) => ({ ...prev, records: true }))
        await expensesQueries.fetchExpensesByCategory(date)
            .then(result => setSummarizedRecords
                (result.map(e => ({
                    categoryName: e.categoryName,
                    amount: e.amount,
                    color: e.color
                })))
            )
            .finally(() => setLoading((prev) => ({ ...prev, records: false })))
    }

    return [
        [records, columns, loading.records],
        [summarizedRecords, summarizedColumns, loading.summarizedRecords],
        { createNewExpense, getExpenses, getExpensesByCategories }
    ]
}