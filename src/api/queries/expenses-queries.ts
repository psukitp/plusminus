import { ExpensesRecord } from "../../components/expenses/expenses-page/types"
import { getAxiosInstance } from "../axios-client"
import { ExpensesService } from "../services/expenses-service"

const client = getAxiosInstance()
const expensesService = new ExpensesService(client)

const fetchExpenses = async (userId: number): Promise<ExpensesRecord[]> => {
    const result = await expensesService.getExpenses(userId)
    return result
}

export const expensesQueries = {
    fetchExpenses
}