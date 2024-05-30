import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { Category, ServiceResponse } from "@common/types";

export class ExpensesCategoriesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'CategoryExpanses'
    }

    async getCategories(): Promise<Category[]> {
        try {
            const response = await this.client.get<ServiceResponse<Category[]>>(`${this.url}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}