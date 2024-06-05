import { Key, useEffect, useState } from "react"
import { ExpensesByCategoryRecord, ExpensesRecord } from "@components/expenses/expenses-page/types"
import { expensesQueries } from "@api/queries/expenses-queries"
import { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { useSummarizedExpensesData } from "@store/store"

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
    {
        title: 'Действия',
        dataIndex: 'actions',
        key: 'actions',
    }
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
        deleteExpense: (expenseInfo: Pick<ExpensesRecord, "id" | "amount" | "categoryId">) => void
        editExpense: (expense: { amount: number | null, categoryId: Key | null, id: Key | null }) => void
    }
]

export const useExpenses = (): UseExpensesResult => {
    const [loading, setLoading] = useState({ records: false, summarizedRecords: false })
    const [records, setRecords] = useState<ExpensesRecord[]>([])

    const {
        data: sumRecords,
        editAmount,
        fetchData,
        deleteExpense: deleteExpenseState,
        isDataFetched,
        loading: sumLoading
    } = useSummarizedExpensesData()

    useEffect(() => {
        if (!isDataFetched)
            fetchData(dayjs().format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        setLoading({ records: true, summarizedRecords: true })
        expensesQueries.fetchExpenses(dayjs().format('YYYY-MM-DD'))
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .finally(() => setLoading((prev) => ({ ...prev, records: false })))
    }, [])

    const createNewExpense = async ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => {
        await expensesQueries.createNewExpense({ amount, categoryId, date })
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
    }

    const getExpenses = async (date: string) => {
        setLoading((prev) => ({ ...prev, records: true }))
        await expensesQueries.fetchExpenses(date)
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .finally(() => setLoading((prev) => ({ ...prev, records: false })))
    }

    const deleteExpense = async (expenseInfo: Pick<ExpensesRecord, "id" | "amount" | "categoryId">) => {
        await expensesQueries.deleteExpense(expenseInfo.id)
            .then(result => {
                deleteExpenseState(expenseInfo)
                setRecords(prev => prev.filter(e => e.id != result))
            })
    }

    const editExpense = async (expense: { id: Key | null, categoryId: Key | null, amount: number | null }) => {
        await expensesQueries.editExpense(expense)
            .then(result => {
                setRecords(prev => prev.map(e => e.id === result?.id
                    ? { ...result }
                    : e))

                return result
            }).then(result => {
                if (result?.date)
                    fetchData(result?.date.toString())
            })
    }

    return [
        [records, columns, loading.records],
        [sumRecords, summarizedColumns, sumLoading],
        { createNewExpense, getExpenses, getExpensesByCategories: fetchData, deleteExpense, editExpense }
    ]
}