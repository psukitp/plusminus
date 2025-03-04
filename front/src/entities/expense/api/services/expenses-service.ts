import { AxiosInstance } from 'axios'
import { BaseService, StringDates } from '@shared/lib'
import { ServiceResponse } from '@shared/lib'
import { Key } from 'react'
import { openNotificationError } from '@shared/lib'
import {
  ExpensesByCategoryRecord,
  ExpensesLastMonthes,
  ExpensesRecord,
  ExpensesThisMonth,
} from '@entities/expense/model'
import { ExpensesLastWeek } from '@entities/expense/model/types'

export class ExpensesService extends BaseService {
  url: string

  constructor(client: AxiosInstance) {
    super(client)
    this.url = 'Expenses'
  }

  async getExpenses(date: string): Promise<ExpensesRecord[]> {
    try {
      const response = await this.client.get<ServiceResponse<ExpensesRecord[]>>(
        `${this.url}`,
        {
          params: {
            date,
          },
        },
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

  async getExpensesByCategoriesPeriod(
    dates: StringDates,
  ): Promise<ExpensesByCategoryRecord[]> {
    try {
      const response = await this.client.get<
        ServiceResponse<ExpensesByCategoryRecord[]>
      >(`${this.url}/ByCategory`, {
        params: {
          from: dates[0],
          to: dates[1],
        },
      })
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

  async getExpensesLastMonthes(): Promise<ExpensesLastMonthes> {
    try {
      const response = await this.client.get<
        ServiceResponse<ExpensesLastMonthes>
      >(`${this.url}/Year`)
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return {
        monthes: [],
        values: [],
      }
    }
  }

  async postNewExpense({
    date,
    categoryId,
    amount,
  }: {
    date: string
    categoryId: Key
    amount: number
  }): Promise<ExpensesRecord | null> {
    try {
      const response = await this.client.post<ServiceResponse<ExpensesRecord>>(
        `${this.url}`,
        {
          date,
          categoryId,
          amount,
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

  async fetchExpensesSum(
    dates: StringDates,
  ): Promise<Omit<ExpensesThisMonth, 'loading'>> {
    try {
      const response = await this.client.get<
        ServiceResponse<Omit<ExpensesThisMonth, 'loading'>>
      >(`${this.url}/Sum`, { params: { from: dates[0], to: dates[1] } })

      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return {
        expensesDiff: 0,
        expensesTotal: 0,
      }
    }
  }

  async deleteExpense(id: Key): Promise<Key | null> {
    try {
      const response = await this.client.delete<ServiceResponse<Key>>(
        `${this.url}`,
        { params: { id } },
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

  async editExpense(expense: {
    id: Key | null
    categoryId: Key | null
    amount: number | null
  }): Promise<ExpensesRecord | null> {
    try {
      const response = await this.client.patch<ServiceResponse<ExpensesRecord>>(
        `${this.url}`,
        {
          ...expense,
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

  async getExpensesLastWeek(date: string): Promise<ExpensesLastWeek | null> {
    try {
      const response = await this.client.get(`${this.url}/Week`, {
        params: {
          date,
        },
      })
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
