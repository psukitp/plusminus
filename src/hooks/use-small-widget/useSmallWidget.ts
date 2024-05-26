import { useEffect, useState } from "react"
import { expensesQueries } from "../../api/queries/expenses-queries"

export const useSmallWidget = () => {
    const [totalExpenses, setTotalExpenses] = useState<number | null>(null)

    useEffect(() => {
        expensesQueries.fetchExpensesSum().then(result => setTotalExpenses(result))
    }, [])

    return [totalExpenses]
}