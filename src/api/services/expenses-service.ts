import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types";
import { ServiceResponse } from "../../common/types";

export class ExpensesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Expenses/expanses'
    }

    async getExpenses(): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesRecord[]>>(`${this.url}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getExpensesByCategories(): Promise<ExpensesByCategoryRecord[]>{
        try {
            const response = await this.client.get<ServiceResponse<ExpensesByCategoryRecord[]>>(`${this.url}/bycategory`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}