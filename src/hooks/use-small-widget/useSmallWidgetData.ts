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
    number
]

export const useSmallWidgetData = (): UseSmallWidgetDataResult => {
    const [expensesThisMonth, setExpensesThisMonth] = useState<ExpensesThisMonth>({
        expensesDiff: 0,
        expensesTotal: 0
    })
    const [incomesThisMonth, setIncomesThisMonth] = useState<IncomesThisMonth>({
        incomesDiff: 0,
        incomesTotal: 0
    })
    const [diffTotal, setDiffTotal] = useState<number>(0)

    useEffect(() => {
        expensesQueries.fetchExpensesSum().then(result => setExpensesThisMonth({ ...result }))
        incomesQueries.fecthIncomesSum().then(result => setIncomesThisMonth({ ...result }))
        incomesQueries.getTotalDiff().then(result => setDiffTotal(result))
    }, [])

    const remainingSum = useMemo<RemainingThisMonth>(() => ({
        remainingTotal: incomesThisMonth.incomesTotal - expensesThisMonth.expensesTotal,
        remainingDiff: (incomesThisMonth.incomesTotal - incomesThisMonth.incomesDiff) - (expensesThisMonth.expensesTotal - expensesThisMonth.expensesDiff)
    }), [expensesThisMonth, incomesThisMonth])

    return [expensesThisMonth, incomesThisMonth, remainingSum, diffTotal]
}