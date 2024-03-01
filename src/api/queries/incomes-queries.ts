import { IncomesRecord } from "../../components/incomes/incomes-page/types"
import { getAxiosInstance } from "../axios-client"
import { IncomesService } from "../services/incomes-service"

const client = getAxiosInstance()
const incomesService = new IncomesService(client)

const fetchIncomes = async (userId: number): Promise<IncomesRecord[]> => {
    const result = await incomesService.getIncomes(userId)
    return result
}

export const incomesQueries = {
    fetchIncomes
}