import { useEffect, useMemo, useState } from "react"
import { expensesQueries } from "../../api/queries/expenses-queries"
import { incomesQueries } from "../../api/queries/incomes-queries"

export const useSmallWidget = () => {
    const [totalExpenses, setTotalExpenses] = useState<number | null>(null)
    const [totalIncomes, setTotalIncomes] = useState<number | null>(null)

    useEffect(() => {
        expensesQueries.fetchExpensesSum().then(result => setTotalExpenses(result))
        incomesQueries.fecthIncomesSum().then(result => setTotalIncomes(result))
    }, [])

    const remainingSum = useMemo<number | null>(() => {
        if (totalExpenses !== null && totalIncomes != null)
            return totalIncomes - totalExpenses
        return null
    }, [totalExpenses, totalIncomes])

    return [totalExpenses, totalIncomes, remainingSum]
}