import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { IncomesRecord } from "../../components/incomes/incomes-page/types";
import { ServiceResponse } from "../../common/types";

export class IncomesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Incomes/incomes/'
    }

    async getIncomes(id: number): Promise<IncomesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesRecord[]>>(`${this.url}${id}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}