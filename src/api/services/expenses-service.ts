import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ExpensesByCategoryRecord, ExpensesRecord } from "../../components/expenses/expenses-page/types";
import { ServiceResponse } from "../../common/types";
import { Key } from "react";

export class ExpensesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Expenses/expanses'
    }

    async getExpenses(date: string): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesRecord[]>>(`${this.url}?date=${date}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getExpensesByCategories(date: string): Promise<ExpensesByCategoryRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesByCategoryRecord[]>>(`${this.url}/bycategory?date=${date}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async postNewExpense({ date, categoryId, amount }: { date: string, categoryId: Key, amount: number }): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.post<ServiceResponse<ExpensesRecord[]>>(`${this.url}/add`, {
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

    async fetchExpensesSum(): Promise<number> {
        try {
            const response = await this.client.get<ServiceResponse<number>>(`${this.url}/sum`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return -1
        }
    }
}