import { Category } from "../../common/types";
import { getAxiosInstance } from "../axios-client";
import { IncomesCategoriesService } from "../services/incomes-categories-service";

const client = getAxiosInstance()
const incomesCategoriesService = new IncomesCategoriesService(client)

const fetchIncomesCategories = async (): Promise<Category[]> => {
    const result = await incomesCategoriesService.getCategories()
    return result
}

export const incomesCategoriesQueries = {
    fetchIncomesCategories
}