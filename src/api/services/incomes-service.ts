import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { IncomesByCategoryRecord, IncomesLastMonthes, IncomesRecord, IncomesThisMonth } from "@components/incomes/incomes-page/types";
import { ServiceResponse } from "@common/types";
import { Key } from "react";
import { openNotificationError } from "@common/notification/notification";

export class IncomesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Incomes'
    }

    async getIncomes(date: string): Promise<IncomesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesRecord[]>>(`${this.url}?date=${date}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getIncomesByCategories(date: string): Promise<IncomesByCategoryRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesByCategoryRecord[]>>(`${this.url}/bycategory?date=${date}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
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
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async fetchIncomesSum(): Promise<IncomesThisMonth> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesThisMonth>>(`${this.url}/sum`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return {
                incomesDiff: 0,
                incomesTotal: 0
            }
        }
    }

    async getIncomesLastMonthes(): Promise<IncomesLastMonthes> {
        try {
            const response = await this.client.get<ServiceResponse<IncomesLastMonthes>>(`${this.url}/dynamicmonth`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return {
                monthes: [],
                values: []
            }
        }
    }

    async deleteIncome(id: Key): Promise<Key | null> {
        try {
            const response = await this.client.delete<ServiceResponse<Key>>(`${this.url}/${id}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async editIncome(income: { id: Key | null, categoryId: Key | null, amount: number | null }): Promise<IncomesRecord | null> {
        try {
            const response = await this.client.patch<ServiceResponse<IncomesRecord>>(`${this.url}/update`, {
                ...income
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async getTotalDiff(): Promise<number> {
        try {
            const response = await this.client.get<ServiceResponse<number>>(`${this.url}/totalDiff`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return 0
        }
    }
}