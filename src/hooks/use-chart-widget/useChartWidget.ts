import { useEffect, useMemo, useState } from "react"
import { expensesQueries } from "@api/queries/expenses-queries"
import { ExpensesByCategoryRecord, ExpensesLastMonthes } from "@components/expenses/expenses-page/types"
import { generateExpByMonth } from "./generateExpByMonth"
import { generateExpLastMonthes } from "./generateExpLasMonthes"
import { incomesQueries } from "@api/queries/incomes-queries"
import { IncomesLastMonthes } from "@components/incomes/incomes-page/types"
import { generateIncLastMonthes } from "./generateIncLastMonthes"

export const useChartWidget = () => {
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
        expensesQueries.fetchExpensesByCategoryMonth().then(result => setExpByCategoryMonth(result))
        expensesQueries.fetchExpensesByLastMonthes().then(result => setExpLastMonthes(result))
        incomesQueries.fetchIncomesLastMonthes().then(result => setIncLastMonthes(result))
    }, [])

    const expByMonthOptions = useMemo(() => generateExpByMonth(expByCategoryMonth), [expByCategoryMonth])
    const expLastMonthesOptions = useMemo(() => generateExpLastMonthes(expLastMonthes), [expLastMonthes])
    const incLastMonthesOptions = useMemo(() => generateIncLastMonthes(incLastMonthes), [incLastMonthes])

    return [expByMonthOptions, expLastMonthesOptions, incLastMonthesOptions]
}