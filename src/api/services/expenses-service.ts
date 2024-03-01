import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ExpensesRecord } from "../../components/expenses/expenses-page/types";
import { ServiceResponse } from "../../common/types";

export class ExpensesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Expenses/expanses/'
    }

    async getExpenses(id: number): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesRecord[]>>(`${this.url}${id}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}