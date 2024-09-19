import { Key } from "react"
import { getAxiosInstance } from "@shared/lib"
import { ExpensesService } from "../services"
import { ExpensesRecord, ExpensesByCategoryRecord, ExpensesLastMonthes, ExpensesThisMonth } from "@entities/expense/model"

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

const fetchExpensesSum = async (): Promise<Omit<ExpensesThisMonth, "loading">> => {
    const result = await expensesService.fetchExpensesSum()
    return result
}

const fetchExpensesByCategoryMonth = async (): Promise<ExpensesByCategoryRecord[]> => {
    const result = await expensesService.getExpensesByCategoriesMonth()
    return result
}

const fetchExpensesByLastMonthes = async (): Promise<ExpensesLastMonthes> => {
    const result = await expensesService.getExpensesLastMonthes()
    return result
}

const deleteExpense = async (id: Key): Promise<Key | null> => {
    const result = await expensesService.deleteExpense(id)
    return result
}

const editExpense = async (expense: { id: Key | null, categoryId: Key | null, amount: number | null }): Promise<ExpensesRecord | null> => {
    const result = await expensesService.editExpense(expense)
    return result
}

export const expensesQueries = {
    fetchExpenses,
    fetchExpensesByCategory,
    createNewExpense,
    fetchExpensesSum,
    fetchExpensesByCategoryMonth,
    fetchExpensesByLastMonthes,
    deleteExpense,
    editExpense
}