import { useEffect, useMemo, useState } from "react"
import { expensesQueries } from "@features/expense/model"
import { generateExpByMonth } from "./generateExpByMonth"
import { generateExpLastMonthes } from "./generateExpLasMonthes"
import { incomesQueries } from "@features/income/model"
import { IncomesLastMonthes } from "@pages/incomes/ui/types"
import { generateIncLastMonthes } from "./generateIncLastMonthes"
import { ExpensesByCategoryRecord, ExpensesLastMonthes } from "@pages/expenses/ui/types"

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

    const expByMonthOptions = useMemo(() => expByCategoryMonth
        ? generateExpByMonth(expByCategoryMonth)
        : {}, [expByCategoryMonth])
        
    const expLastMonthesOptions = useMemo(() => expLastMonthes
        ? generateExpLastMonthes(expLastMonthes)
        : {}, [expLastMonthes])

    const incLastMonthesOptions = useMemo(() => incLastMonthes
        ? generateIncLastMonthes(incLastMonthes)
        : {}, [incLastMonthes])

    return [expByMonthOptions, expLastMonthesOptions, incLastMonthesOptions]
}