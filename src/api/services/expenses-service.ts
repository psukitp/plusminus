import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ExpensesByCategoryRecord, ExpensesLastMonthes, ExpensesRecord, ExpensesThisMonth } from "@components/expenses/expenses-page/types";
import { ServiceResponse } from "@common/types";
import { Key } from "react";
import { openNotificationError } from "@common/notification/notification";

export class ExpensesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Expenses'
    }

    async getExpenses(date: string): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesRecord[]>>(`${this.url}?date=${date}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getExpensesByCategories(date: string): Promise<ExpensesByCategoryRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesByCategoryRecord[]>>(`${this.url}/bycategory?date=${date}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getExpensesByCategoriesMonth(): Promise<ExpensesByCategoryRecord[]> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesByCategoryRecord[]>>(`${this.url}/bycategory/month`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async getExpensesLastMonthes(): Promise<ExpensesLastMonthes> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesLastMonthes>>(`${this.url}/dynamicmonth`)
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

    async postNewExpense({ date, categoryId, amount }: { date: string, categoryId: Key, amount: number }): Promise<ExpensesRecord[]> {
        try {
            const response = await this.client.post<ServiceResponse<ExpensesRecord[]>>(`${this.url}/add`, {
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

    async fetchExpensesSum(): Promise<ExpensesThisMonth> {
        try {
            const response = await this.client.get<ServiceResponse<ExpensesThisMonth>>(`${this.url}/sum`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return {
                expensesDiff: 0,
                expensesTotal: 0
            }
        }
    }

    async deleteExpense(id: Key): Promise<Key | null> {
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

    async editExpense(expense: { id: Key | null, categoryId: Key | null, amount: number | null }): Promise<ExpensesRecord | null> {
        try {
            const response = await this.client.patch<ServiceResponse<ExpensesRecord>>(`${this.url}/update`, {
                ...expense
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}