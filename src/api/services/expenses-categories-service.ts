import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { Category, ServiceResponse } from "@common/types";
import { Key } from "react";

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

    async postCategory({ name, color }: Pick<Category, "color" | "name">): Promise<Category | null> {
        try {
            const response = await this.client.post<ServiceResponse<Category>>(`${this.url}/category/expenses/add`, {
                name,
                color
            })
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async editCategory(category: Partial<Category>): Promise<Category | null> {
        try {
            const response = await this.client.patch<ServiceResponse<Category>>(`${this.url}/category/expenses/update`, {
                ...category
            })
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async deleteCategory(id: Key): Promise<Key | null> {
        try {
            const response = await this.client.delete<ServiceResponse<Key>>(`${this.url}/category/expenses/${id}`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}