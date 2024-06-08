import { Key, useEffect, useState } from "react"
import { IncomesRecord } from "@components/incomes/incomes-page/types"
import { incomesQueries } from "@api/queries/incomes-queries"
import dayjs from "dayjs"
import { useSummarizedIncomesData } from "@store"
import { columns, summarizedColumns } from "./staticUseIncomes"
import { UseIncomesResult } from "./types"

export const useIncomes = (): UseIncomesResult => {
    const [recordsLoading, setRecordsLoading] = useState(false)
    const [records, setRecords] = useState<IncomesRecord[]>([])

    const {
        data: sumRecords,
        fetchData,
        deleteIncome: deleteIncomeState,
        isDataFetched,
        loading: sumLoading
    } = useSummarizedIncomesData()

    useEffect(() => {
        if (!isDataFetched)
            fetchData(dayjs().format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        setRecordsLoading(true)
        incomesQueries.fetchIncomes(dayjs().format('YYYY-MM-DD'))
            .then(result => setRecords(result))
            .finally(() => setRecordsLoading(false))
    }, [])

    const createNewIncomes = async ({ amount, categoryId, date }: { amount: number, categoryId: Key, date: string }) => {
        await incomesQueries.createNewIncomes({ amount, categoryId, date })
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .then(() => fetchData(date))
    }

    const getIncomes = async (date: string) => {
        setRecordsLoading(true)
        await incomesQueries.fetchIncomes(date)
            .then(result => setRecords(result.map(e => ({ ...e, date: dayjs(e.date).format('YYYY-MM-DD') }))))
            .finally(() => setRecordsLoading(false))
    }

    const deleteIncome = async (incomeInfo: Pick<IncomesRecord, "id" | "amount" | "categoryId">) => {
        await incomesQueries.deleteIncome(incomeInfo.id)
            .then(result => {
                deleteIncomeState(incomeInfo)
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
                    fetchData(result?.date.toString())
            })
    }

    return [
        [records, columns, recordsLoading],
        [sumRecords, summarizedColumns, sumLoading],
        {
            createNewIncomes,
            getIncomes,
            getIncomesByCategories: fetchData,
            deleteIncome,
            editIncome
        }
    ]
}