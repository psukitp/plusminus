import { Key, useEffect, useState } from "react"
import { expensesCategoriesQueries } from "../../api/queries/expenses-categories-queries"

type useExpensesCategoriesResult = [
    { id: Key, name: string, color: string }[],
    boolean
]

export const useExpensesCategories = (): useExpensesCategoriesResult => {
    const [categories, setCategories] = useState<{ id: Key, name: string, color: string }[]>([])
    const [loading, setLoading] = useState({ categories: false })

    useEffect(() => {
        setLoading(prev => ({ ...prev, categories: true }))
        expensesCategoriesQueries.fetchExpensesCategories()
            .then(result => setCategories(result))
            .finally(() => setLoading(prev => ({ ...prev, categories: false })))
    }, [])

    return [categories, loading.categories]
}