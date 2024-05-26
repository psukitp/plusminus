import { Key } from "react"
import { IncomesByCategoryRecord, IncomesRecord } from "../../components/incomes/incomes-page/types"
import { getAxiosInstance } from "../axios-client"
import { IncomesService } from "../services/incomes-service"

const client = getAxiosInstance()
const incomesService = new IncomesService(client)

const fetchIncomes = async (date: string): Promise<IncomesRecord[]> => {
    const result = await incomesService.getIncomes(date)
    return result
}

const fetchIncomesByCategory = async (date: string): Promise<IncomesByCategoryRecord[]> => {
    const result = incomesService.getIncomesByCategories(date)
    return result
}

const createNewIncomes = async ({ date, categoryId, amount }: { date: string, categoryId: Key, amount: number }): Promise<IncomesRecord[]> => {
    const result = incomesService.postNewIncomes({ date, categoryId, amount })
    return result
}

export const incomesQueries = {
    fetchIncomes,
    fetchIncomesByCategory,
    createNewIncomes
}