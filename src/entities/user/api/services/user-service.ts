import { AuthResponseData, RegisterFormData } from "../../model/types";
import { BaseService, openNotificationError, ServiceResponse } from "@shared/lib";
import { AxiosInstance } from "axios";

export class UserService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Users'
    }

    async auth(login: string, password: string): Promise<AuthResponseData | null> {
        try {
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}/auth`, {
                login,
                password
            }, {
                withCredentials: true
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async register(registerData: RegisterFormData): Promise<AuthResponseData | null> {
        try {
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}/register`, {
                ...registerData
            })
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async checkAuth(): Promise<AuthResponseData | null> {
        try {
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}/check`)
            const { data: { data, message, success } } = response
            if (!success) openNotificationError(message)
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}