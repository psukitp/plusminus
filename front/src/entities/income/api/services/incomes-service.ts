import { AxiosInstance } from 'axios'
import { BaseService, StringDates } from '@shared/lib'
import { ServiceResponse } from '@shared/lib'
import { Key } from 'react'
import { openNotificationError } from '@shared/lib'
import {
  IncomesByCategoryRecord,
  IncomesLastMonthes,
  IncomesRecord,
  IncomesThisMonth,
  IncomesByPeriod,
} from '@entities/income/model'
import { NewIncome } from '../../model'

export class IncomesService extends BaseService {
  url: string

  constructor(client: AxiosInstance) {
    super(client)
    this.url = 'Incomes'
  }

  async getIncomes(
    startDate: string,
    endDate: string,
  ): Promise<IncomesRecord[]> {
    try {
      const response = await this.client.get<ServiceResponse<IncomesRecord[]>>(
        `${this.url}`,
        {
          params: { startDate, endDate },
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

  async getIncomesByCategories(
    date: string,
  ): Promise<IncomesByCategoryRecord[]> {
    try {
      const response = await this.client.get<
        ServiceResponse<IncomesByCategoryRecord[]>
      >(`${this.url}/ByCategory`, {
        params: { date },
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

  async postNewIncomes({
    date,
    categoryId,
    amount,
  }: {
    date: string
    categoryId: Key
    amount: number
  }): Promise<IncomesRecord | null> {
    try {
      const response = await this.client.post<ServiceResponse<IncomesRecord>>(
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

  async fetchIncomesSum(
    dates: StringDates,
  ): Promise<Omit<IncomesThisMonth, 'loading'>> {
    try {
      const response = await this.client.get<
        ServiceResponse<Omit<IncomesThisMonth, 'loading'>>
      >(`${this.url}/Sum`, {
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
      return {
        incomesTotal: 0,
        incomesDiff: 0,
      }
    }
  }

  async getIncomesLastMonthes(): Promise<IncomesLastMonthes> {
    try {
      const response = await this.client.get<
        ServiceResponse<IncomesLastMonthes>
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

  async deleteIncome(id: Key): Promise<Key | null> {
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

  async editIncome(income: Partial<NewIncome>): Promise<IncomesRecord | null> {
    try {
      const response = await this.client.patch<ServiceResponse<IncomesRecord>>(
        `${this.url}`,
        {
          ...income,
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

  async getTotalDiff(): Promise<number> {
    try {
      const response = await this.client.get<ServiceResponse<number>>(
        `${this.url}/TotalDiff`,
      )
      const {
        data: { data, message, success },
      } = response
      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.log(e)
      return 0
    }
  }

  async getIncomesByPeriod(
    startDate: string,
    endDate: string,
  ): Promise<IncomesByPeriod | null> {
    try {
      const response = await this.client.get(`${this.url}/Period`, {
        params: {
          from: startDate,
          to: endDate,
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
