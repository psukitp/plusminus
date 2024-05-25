import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ServiceResponse } from "../../common/types";
import { Key } from "react";

export class ExpensesCategoriesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'CategoryExpanses'
    }

    async getCategories(): Promise<{ id: Key, name: string, color: string }[]> {
        try {
            const response = await this.client.get<ServiceResponse<{ id: Key, name: string, color: string }[]>>(`${this.url}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }
}