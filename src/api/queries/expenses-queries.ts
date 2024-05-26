import { Key } from "react"
import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { getAxiosInstance } from "../axios-client"
import { ExpensesService } from "../services/expenses-service"

const client = getAxiosInstance()
const expensesService = new ExpensesService(client)

const fetchExpenses = async (date: string): Promise<ExpensesRecord[]> => {
    const result = await expensesService.getExpenses(date)
    return result
}

const fetchExpensesByCategory = async (date: string): Promise<ExpensesByCategoryRecord[]> => {
    const result = await expensesService.getExpensesByCategories(date)
    return result
}

const createNewExpense = async ({ date, categoryId, amount }: { date: string, categoryId: Key, amount: number }): Promise<ExpensesRecord[]> => {
    const result = await expensesService.postNewExpense({ date, amount, categoryId })
    return result
}

const fetchExpensesSum = async (): Promise<number | null> => {
    const result = await expensesService.fetchExpensesSum()
    return result
}

export const expensesQueries = {
    fetchExpenses,
    fetchExpensesByCategory,
    createNewExpense,
    fetchExpensesSum
}