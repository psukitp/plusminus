import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { Category, ServiceResponse } from "@common/types";
import { Key } from "react";
import { openNotificationError } from "@common/notification/notification";
import { NewCategory } from "@components/categories/categories-modal/CategoryModal";

export class IncomesCategoriesService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = "CategoryIncomes"
    }

    async getCategories(): Promise<Category[]> {
        try {
            const response = await this.client.get<ServiceResponse<Category[]>>(`${this.url}`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async postCategory({ name, color }: NewCategory): Promise<Category | null> {
        try {
            const response = await this.client.post<ServiceResponse<Category>>(`${this.url}/add`, {
                name,
                color
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async editCategory(category: Partial<Category>): Promise<Category | null> {
        try {
            const response = await this.client.patch<ServiceResponse<Category>>(`${this.url}/update`, {
                ...category
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async deleteCategory(id: Key): Promise<Key | null> {
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
}