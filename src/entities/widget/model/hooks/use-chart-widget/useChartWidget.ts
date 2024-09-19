import { useEffect, useMemo, useState } from "react"
import { ExpensesLastMonthes, expensesQueries } from "@entities/expense"
import { generateExpByMonth } from "./generateExpByMonth"
import { generateExpLastMonthes } from "./generateExpLasMonthes"
import { incomesQueries } from "@entities/income"
import { IncomesLastMonthes } from "@entities/income"
import { generateIncLastMonthes } from "./generateIncLastMonthes"
import { ExpensesByCategoryRecord } from "@entities/expense"

export const useChartWidget = () => {
    const [expByCategoryMonthLoading, setExpByCategoryMonthLoading] = useState<boolean>(false)
    const [expLastMonthesLoading, setExpLastMonthesLoading] = useState<boolean>(false)
    const [incLastMonthesLoading, setIncLastMonthesLoading] = useState<boolean>(false)

    const [expByCategoryMonth, setExpByCategoryMonth] = useState<ExpensesByCategoryRecord[]>([])
    const [expLastMonthes, setExpLastMonthes] = useState<ExpensesLastMonthes>({
        monthes: [],
        values: []
    })
    const [incLastMonthes, setIncLastMonthes] = useState<IncomesLastMonthes>({
        monthes: [],
        values: []
    })

    useEffect(() => {
        setExpByCategoryMonthLoading(true)
        setExpLastMonthesLoading(true)
        setIncLastMonthesLoading(true)
        expensesQueries.fetchExpensesByCategoryMonth().then(result => setExpByCategoryMonth(result)).finally(() => setExpByCategoryMonthLoading(false))
        expensesQueries.fetchExpensesByLastMonthes().then(result => setExpLastMonthes(result)).finally(() => setExpLastMonthesLoading(false))
        incomesQueries.fetchIncomesLastMonthes().then(result => setIncLastMonthes(result)).finally(() => setIncLastMonthesLoading(false))
    }, [])

    const expByMonthOptions = useMemo(() => expByCategoryMonth
        ? generateExpByMonth(expByCategoryMonth)
        : {}, [expByCategoryMonth])

    const expLastMonthesOptions = useMemo(() => expLastMonthes
        ? generateExpLastMonthes(expLastMonthes)
        : {}, [expLastMonthes])

    const incLastMonthesOptions = useMemo(() => incLastMonthes
        ? generateIncLastMonthes(incLastMonthes)
        : {}, [incLastMonthes])

    return [{ options: expByMonthOptions, loading: expLastMonthesLoading },
    { options: expLastMonthesOptions, loading: incLastMonthesLoading },
    { options: incLastMonthesOptions, loading: expByCategoryMonthLoading }]
}