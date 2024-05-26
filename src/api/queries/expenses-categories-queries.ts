import { getAxiosInstance } from "../axios-client"
import { ExpensesCategoriesService } from "../services/expenses-categories-service"
import { Category } from "../../common/types"

const client = getAxiosInstance()
const expensesCategoriesService = new ExpensesCategoriesService(client)

const fetchExpensesCategories = async (): Promise<Category[]> => {
    const result = await expensesCategoriesService.getCategories()
    return result
}

export const expensesCategoriesQueries = {
    fetchExpensesCategories
}