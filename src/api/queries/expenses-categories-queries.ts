import { Key } from "react"
import { getAxiosInstance } from "../axios-client"
import { ExpensesCategoriesService } from "../services/expenses-categories-service"

const client = getAxiosInstance()
const expensesCategoriesService = new ExpensesCategoriesService(client)

const fetchExpensesCategories = async (): Promise<{ id: Key, name: string, color: string }[]> => {
    const result = await expensesCategoriesService.getCategories()
    return result
}

export const expensesCategoriesQueries = {
    fetchExpensesCategories
}