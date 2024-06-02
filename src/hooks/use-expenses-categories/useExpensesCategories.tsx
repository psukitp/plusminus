import React, { Key, useEffect, useState } from "react"
import { expensesCategoriesQueries } from "@api/queries/expenses-categories-queries"
import { Category } from "@common/types"
import { ColumnsType } from "antd/es/table"

type useExpensesCategoriesResult = [
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

export const useExpensesCategories = (): useExpensesCategoriesResult => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState({ categories: false })

    useEffect(() => {
        setLoading(prev => ({ ...prev, categories: true }))
        expensesCategoriesQueries.fetchExpensesCategories()
            .then(result => setCategories(result))
            .finally(() => setLoading(prev => ({ ...prev, categories: false })))
    }, [])

    const createNewCategory = (newCategory: Pick<Category, "color" | "name">) => {
        expensesCategoriesQueries.createNewCategory(newCategory).then(result => {
            if (result != null) {
                setCategories(prev => [...prev, result])
            }
        })
    }

    const editCategory = (category: Partial<Category>) => {
        expensesCategoriesQueries.editCategory(category).then(result => {
            if (result != null) {
                setCategories(prev => prev.map(c => c.id === result.id ? { ...result } : c))
            }
        })
    }

    const deleteCategory = (id: Key) => {
        expensesCategoriesQueries.deleteCategory(id).then(result => {
            if (result != null) {
                setCategories(prev => prev.filter(c => c.id !== result))
            }
        })
    }

    return [categories, columns, loading.categories, { createNewCategory, editCategory, deleteCategory }]
}