import { Key, useEffect, useMemo, useState } from "react"
import { ColumnsType } from "antd/es/table"
import { IncomesByCategoryRecord, IncomesRecord } from "../../components/incomes/incomes-page/types"
import { incomesQueries } from "../../api/queries/incomes-queries"
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
        getIncomes: (date: string) => void,
        getIncomesByCategories: (date: string) => void
    }
]


export const useIncomes = (): UseIncomesResult => {
    const [records, setRecords] = useState<IncomesRecord[]>([])
    const [summarizedRecords, setSummarizedRecords] = useState<IncomesByCategoryRecord[]>([])

    useEffect(() => {
        incomesQueries.fetchIncomes(dayjs().format('YYYY-MM-DD')).then(result => setRecords(result))

        incomesQueries.fetchIncomesByCategory(dayjs().format('YYYY-MM-DD')).then(result => setSummarizedRecords(result.map(e => ({
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
                    categoryName: e.categoryName,
                    amount: e.amount,
                    color: e.color
                })))
            )
    }


    return [[records, columns],
    [summarizedRecords, summarizedColumns],
    {
        createNewIncomes,
        getIncomes,
        getIncomesByCategories
    }]
}