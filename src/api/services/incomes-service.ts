import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { IncomesByCategoryRecord, IncomesRecord } from "../../components/incomes/incomes-page/types";
import { ServiceResponse } from "../../common/types";
import { Key } from "react";

export class IncomesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Incomes/incomes'
    }

    async getIncomes(date: string): Promise<IncomesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesRecord[]>>(`${this.url}?date=${date}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getIncomesByCategories(date: string): Promise<IncomesByCategoryRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesByCategoryRecord[]>>(`${this.url}/bycategory?date=${date}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async postNewIncomes({ date, categoryId, amount }: { date: string, categoryId: Key, amount: number }): Promise<IncomesRecord[]> {
        try {
            const response = await this.client.post<ServiceResponse<IncomesRecord[]>>(`${this.url}/add`, {
                date,
                categoryId,
                amount
            })
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async fetchIncomesSum(): Promise<number | null> {
        try {
            const response = await this.client.get<ServiceResponse<number>>(`${this.url}/sum`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}