import { useEffect, useMemo, useState } from "react"
import { expensesQueries } from "@features/expense/model"
import { incomesQueries } from "@features/income/model"
import { ExpensesThisMonth } from "@pages/expenses/ui/types"
import { IncomesThisMonth } from "@pages/incomes/ui/types"

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