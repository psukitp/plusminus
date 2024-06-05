import { Key, useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table"
import { IncomesByCategoryRecord, IncomesRecord } from "@components/incomes/incomes-page/types"
import { incomesQueries } from "@api/queries/incomes-queries"
import dayjs from "dayjs"

const columns: ColumnsType<IncomesRecord> = [
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

const summarizedColumns: ColumnsType<IncomesByCategoryRecord> = [
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

type UseIncomesResult = [
    [IncomesRecord[], ColumnsType<IncomesRecord>],
    [IncomesByCategoryRecord[], ColumnsType<IncomesByCategoryRecord>],
    {
        createNewIncomes: ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => void,
        getIncomes: (date: string) => void
        getIncomesByCategories: (date: string) => void
        deleteIncome: (incomeInfo: { amount: number, id: Key, categoryId: Key }) => void
        editIncome: (income: { amount: number | null, categoryId: Key | null, id: Key | null }) => void
    }
]


export const useIncomes = (): UseIncomesResult => {
    const [records, setRecords] = useState<IncomesRecord[]>([])
    const [summarizedRecords, setSummarizedRecords] = useState<IncomesByCategoryRecord[]>([])

    useEffect(() => {
        incomesQueries.fetchIncomes(dayjs().format('YYYY-MM-DD')).then(result => setRecords(result))

        incomesQueries.fetchIncomesByCategory(dayjs().format('YYYY-MM-DD')).then(result => setSummarizedRecords(result.map(e => ({
            id: e.id,
            categoryName: e.categoryName,
            amount: e.amount,
            color: e.color
        }))))
    }, [])

    const createNewIncomes = async ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => {
        await incomesQueries.createNewIncomes({ amount, categoryId, date })
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
    }

    const getIncomes = async (date: string) => {
        await incomesQueries.fetchIncomes(date)
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
    }

    const getIncomesByCategories = async (date: string) => {
        await incomesQueries.fetchIncomesByCategory(date)
            .then(result => setSummarizedRecords
                (result.map(e => ({
                    id: e.id,
                    categoryName: e.categoryName,
                    amount: e.amount,
                    color: e.color
                })))
            )
    }

    const deleteIncome = async (incomeInfo: { amount: number, id: Key, categoryId: Key }) => {
        await incomesQueries.deleteIncome(incomeInfo.id)
            .then(result => {
                setSummarizedRecords(prev => prev.map(c => c.id === incomeInfo?.categoryId ? { ...c, amount: c.amount - incomeInfo.amount } : c))
                setRecords(prev => prev.filter(e => e.id != result))
            })
    }

    const editIncome = async (income: { id: Key | null, categoryId: Key | null, amount: number | null }) => {
        await incomesQueries.editIncome(income)
            .then(result => {
                setRecords(prev => prev.map(e => e.id === result?.id
                    ? { ...result }
                    : e))

                return result
            }).then(result => {
                if (result?.date)
                    getIncomesByCategories(result?.date.toString())
            })
    }


    return [[records, columns],
    [summarizedRecords, summarizedColumns],
    {
        createNewIncomes,
        getIncomes,
        getIncomesByCategories,
        deleteIncome,
        editIncome
    }]
}