import { NewCategory } from '../../model/types'
import {
  BaseService,
  openNotificationError,
  ServiceResponse,
} from '@shared/lib'
import { Category } from '../../model/types'
import { AxiosInstance } from 'axios'
import { Key } from 'react'

export class IncomesCategoriesService extends BaseService {
  url: string

  constructor(client: AxiosInstance) {
    super(client)
    this.url = 'CategoryIncomes'
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.client.get<ServiceResponse<Category[]>>(
        `${this.url}`,
      )
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return []
    }
  }

  async postCategory({ name, color }: NewCategory): Promise<Category | null> {
    try {
      const response = await this.client.post<ServiceResponse<Category>>(
        `${this.url}`,
        {
          name,
          color,
        },
      )
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async editCategory(category: Partial<Category>): Promise<Category | null> {
    try {
      const response = await this.client.patch<ServiceResponse<Category>>(
        `${this.url}`,
        {
          ...category,
        },
      )
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }

  async deleteCategory(id: Key): Promise<Key | null> {
    try {
      const response = await this.client.delete<ServiceResponse<Key>>(
        `${this.url}/${id}`,
      )
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
