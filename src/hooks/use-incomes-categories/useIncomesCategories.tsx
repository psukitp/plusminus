import { Key, useEffect, useState } from "react";
import { Category } from "@common/types";
import { incomesCategoriesQueries } from "@api/queries/incomes-categories-queries";
import { ColumnsType } from "antd/es/table";

type UseIncomesCategoriesResult = [
    Category[],
    ColumnsType<Category>,
    boolean,
    {
        createNewCategory: (newCategory: Pick<Category, "color" | "name">) => void
        editCategory: (category: Partial<Category>) => void
        deleteCategory: (id: Key) => void
    }
]

const columns: ColumnsType<Category> = [
    {
        title: 'Категория',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Цвет',
        dataIndex: 'color',
        key: 'color',
        render: (value) => <div style={{
            width: '20px',
            height: '20px',
            backgroundColor: value,
            margin: '0 auto',
            border: '1px solid #a6a6a6',
            borderRadius: '50%'
        }} />
    },
    {
        title: "Действия",
        dataIndex: 'actions',
        key: "actions"
    }
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

    const createNewCategory = (newCategory: Pick<Category, "color" | "name">) => {
        incomesCategoriesQueries.createNewCategory(newCategory).then(result => {
            if (result != null) {
                setCategories(prev => [...prev, result])
            }
        })
    }

    const editCategory = (category: Partial<Category>) => {
        incomesCategoriesQueries.editCategory(category).then(result => {
            if (result != null) {
                setCategories(prev => prev.map(c => c.id === result.id ? { ...result } : c))
            }
        })
    }

    const deleteCategory = (id: Key) => {
        incomesCategoriesQueries.deleteCategory(id).then(result => {
            if (result != null) {
                setCategories(prev => prev.filter(c => c.id !== result))
            }
        })
    }

    return [categories, columns, loading.categories, { createNewCategory, editCategory, deleteCategory }]
}