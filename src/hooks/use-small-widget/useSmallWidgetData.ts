import { useEffect, useMemo, useState } from "react"
import { expensesQueries } from "@api/queries/expenses-queries"
import { incomesQueries } from "@api/queries/incomes-queries"
import { ExpensesThisMonth } from "@components/expenses/expenses-page/types"
import { IncomesThisMonth } from "@components/incomes/incomes-page/types"

type RemainingThisMonth = {
    remainingTotal: number
    remainingDiff: number
}

type UseSmallWidgetDataResult = [
    ExpensesThisMonth,
    IncomesThisMonth,
    RemainingThisMonth,
]

export const useSmallWidgetData = (): UseSmallWidgetDataResult => {
    const [expensesTotal, setExpensesTotal] = useState<number>(0)
    const [incomesTotal, setIncomesTotal] = useState<number>(0)
    const [expensesDiff, setExpensesDiff] = useState<number>(0)
    const [incomesDiff, setIncomessDiff] = useState<number>(0)

    useEffect(() => {
        expensesQueries.fetchExpensesSum().then(result => {
            setExpensesDiff(result.expensesDiff)
            setExpensesTotal(result.expensesTotal)
        })
        incomesQueries.fecthIncomesSum().then(result => {
            setIncomesTotal(result.incomesTotal)
            setIncomessDiff(result.incomesDiff)
        })
    }, [])

    const remainingSum = useMemo<RemainingThisMonth>(() => ({
        remainingTotal: incomesTotal - expensesTotal,
        remainingDiff: (incomesTotal - incomesDiff) - (expensesTotal - expensesDiff)
    }), [incomesTotal, expensesTotal, incomesDiff, expensesDiff])

    return [{ expensesTotal, expensesDiff }, { incomesTotal, incomesDiff }, remainingSum]
}