import { useEffect, useState } from "react"
import { expensesCategoriesQueries } from "@api/queries/expenses-categories-queries"
import { Category } from "@common/types"

type useExpensesCategoriesResult = [
    Category[],
    boolean
]

export const useExpensesCategories = (): useExpensesCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState({ categories: false })

    useEffect(() => {
        setLoading(prev => ({ ...prev, categories: true }))
        expensesCategoriesQueries.fetchExpensesCategories()
            .then(result => setCategories(result))
            .finally(() => setLoading(prev => ({ ...prev, categories: false })))
    }, [])

    return [categories, loading.categories]
}