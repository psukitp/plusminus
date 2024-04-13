import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { getAxiosInstance } from "../axios-client"
import { ExpensesService } from "../services/expenses-service"

const client = getAxiosInstance()
const expensesService = new ExpensesService(client)

const fetchExpenses = async (): Promise<ExpensesRecord[]> => {
    const result = await expensesService.getExpenses()
    return result
}

const fetchExpensesByCategory = async (): Promise<ExpensesByCategoryRecord[]> => {
    const result = await expensesService.getExpensesByCategories()
    return result
}

export const expensesQueries = {
    fetchExpenses,
    fetchExpensesByCategory
}