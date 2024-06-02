import { Key } from "react"
import { getAxiosInstance } from "../axios-client"
import { ExpensesCategoriesService } from "../services/expenses-categories-service"
import { Category } from "@common/types"

const client = getAxiosInstance()
const expensesCategoriesService = new ExpensesCategoriesService(client)

const fetchExpensesCategories = async (): Promise<Category[]> => {
    const result = await expensesCategoriesService.getCategories()
    return result
}

const createNewCategory = async (newCategory: Pick<Category, "color" | "name">): Promise<Category | null> => {
    const result = await expensesCategoriesService.postCategory(newCategory)
    return result
}

const editCategory = async (category: Partial<Category>): Promise<Category | null> => {
    const result = await expensesCategoriesService.editCategory(category)
    return result
}

const deleteCategory = async (id: Key): Promise<Key | null> => {
    const result = await expensesCategoriesService.deleteCategory(id)
    return result
}

export const expensesCategoriesQueries = {
    fetchExpensesCategories,
    createNewCategory,
    editCategory,
    deleteCategory
}