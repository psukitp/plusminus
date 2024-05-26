import { useEffect, useState } from "react";
import { Category } from "../../common/types";
import { incomesCategoriesQueries } from "../../api/queries/incomes-categories-queries";

type UseIncomesCategoriesResult = [
    Category[],
    boolean
]

export const useIncomesCategories = (): UseIncomesCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState({ categories: false })

    useEffect(() => {
        setLoading(prev => ({ ...prev, categories: true }))
        incomesCategoriesQueries.fetchIncomesCategories()
            .then(result => setCategories(result))
            .finally(() => setLoading(prev => ({ ...prev, categories: false })))
    }, [])

    return [categories, loading.categories]
}