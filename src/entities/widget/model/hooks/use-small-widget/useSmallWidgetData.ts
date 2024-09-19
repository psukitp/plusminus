import { useEffect, useMemo, useState } from "react"
import { incomesQueries, IncomesThisMonth } from "@entities/income"
import { expensesQueries, ExpensesThisMonth } from "@entities/expense"

type RemainingThisMonth = {
    remainingTotal: number
    remainingDiff: number
}

type DiffTotal = {
    diffTotal: number
    loading: boolean
}

type UseSmallWidgetDataResult = [
    ExpensesThisMonth,
    IncomesThisMonth,
    RemainingThisMonth,
    DiffTotal
]

export const useSmallWidgetData = (): UseSmallWidgetDataResult => {
    const [expensesThisMonth, setExpensesThisMonth] = useState<ExpensesThisMonth>({
        loading: false,
        expensesDiff: 0,
        expensesTotal: 0
    })
    const [incomesThisMonth, setIncomesThisMonth] = useState<IncomesThisMonth>({
        loading: false,
        incomesDiff: 0,
        incomesTotal: 0
    })
    const [diffTotal, setDiffTotal] = useState<DiffTotal>({
        diffTotal: 0,
        loading: false
    })

    useEffect(() => {
        setExpensesThisMonth(prev => ({ ...prev, loading: true }))
        setIncomesThisMonth(prev => ({ ...prev, loading: true }))
        setDiffTotal(prev => ({ ...prev, loading: true }))
        expensesQueries.fetchExpensesSum().then(result => setExpensesThisMonth({ loading: false, ...result }))
        incomesQueries.fecthIncomesSum().then(result => setIncomesThisMonth({ loading: false, ...result }))
        incomesQueries.getTotalDiff().then(result => setDiffTotal({ loading: false, diffTotal: result }))
    }, [])

    const remainingSum = useMemo<RemainingThisMonth>(() => ({
        remainingTotal: incomesThisMonth.incomesTotal - expensesThisMonth.expensesTotal,
        remainingDiff: (incomesThisMonth.incomesTotal - incomesThisMonth.incomesDiff) - (expensesThisMonth.expensesTotal - expensesThisMonth.expensesDiff)
    }), [expensesThisMonth, incomesThisMonth])

    return [expensesThisMonth, incomesThisMonth, remainingSum, diffTotal]
}