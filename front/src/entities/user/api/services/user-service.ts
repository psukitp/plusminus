import { AuthResponseData, RegisterFormData } from '../../model/types'
import {
  BaseService,
  openNotificationError,
  ServiceResponse,
} from '@shared/lib'
import { AxiosInstance } from 'axios'

export class UserService extends BaseService {
  url: string

  constructor(client: AxiosInstance) {
    super(client)
    this.url = 'Users'
  }

  async auth(
    login: string,
    password: string,
  ): Promise<AuthResponseData | null> {
    try {
      const response = await this.client.post<
        ServiceResponse<AuthResponseData>
      >(
        `${this.url}/Auth`,
        {
          login,
          password,
        },
        {
          withCredentials: true,
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

  async register(
    registerData: RegisterFormData,
  ): Promise<AuthResponseData | null> {
    try {
      const response = await this.client.post<
        ServiceResponse<AuthResponseData>
      >(`${this.url}/Register`, {
        ...registerData,
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

  async checkAuth(): Promise<AuthResponseData | null> {
    try {
      const response = await this.client.post<
        ServiceResponse<AuthResponseData>
      >(`${this.url}/Check`)
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

  async getResetCode(email: string): Promise<boolean> {
    try {
      const response = await this.client.post<ServiceResponse<unknown>>(
        `${this.url}/GetRestoreCode`,
        { email },
      )
      const {
        data: { message, success },
      } = response
      if (!success) openNotificationError(message)
      return success
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async applyCode(code: string): Promise<boolean> {
    try {
      const response = await this.client.post<ServiceResponse<unknown>>(
        `${this.url}/ApplyCode`,
        { code },
      )
      const {
        data: { message, success },
      } = response
      if (!success) openNotificationError(message)
      return success
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async setPassword(password: string): Promise<AuthResponseData | null> {
    try {
      const response = await this.client.post<
        ServiceResponse<AuthResponseData>
      >(`${this.url}/SetPass`, { password })
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

  async logout(): Promise<void> {
    try {
      await this.client.post(`${this.url}/Logout`)
    } catch (e) {
      console.log(e)
    }
  }
}
