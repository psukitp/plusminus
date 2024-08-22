import { Category } from "@shared/lib"
import { Key } from "react"

export interface IExpensesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}

export interface IIncomesCategoriesData {
    data: Category[]
    isDataFetched: boolean
    loading: boolean

    fetchData: () => Promise<void>
    setCategories: (data: Category[]) => void
    deleteCategory: (id: Key) => void
    editCategory: (data: Category) => void
    addCategory: (data: Category) => void
}