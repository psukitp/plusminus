import { AxiosInstance } from "axios";
import { BaseService } from "./base-service";
import { ServiceResponse } from "@common/types";
import { AuthResponseData } from "@components/auth/types";
import { RegisterFormData } from "@components/register/types";
import { openNotificationError } from "@common/notification/notification";

export class UserService extends BaseService {

    url: string

    constructor(client: AxiosInstance) {
        super(client)
        this.url = 'Users/users/'
    }

    async auth(login: string, password: string): Promise<AuthResponseData | null> {
        try {
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}auth`, {
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
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}register`, {
                ...registerData
            })
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async checkAuth(): Promise<AuthResponseData | null> {
        try {
            const response = await this.client.post<ServiceResponse<AuthResponseData>>(`${this.url}check`)
            const { data: { data } } = response
            return data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}