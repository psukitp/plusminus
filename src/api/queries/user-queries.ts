import { AuthResponseData } from "@components/auth/types";
import { RegisterFormData } from "@components/register/types";
import { getAxiosInstance } from "../axios-client";
import { UserService } from "../services/user-service";


const client = getAxiosInstance()
const userService = new UserService(client)

const auth = async (login: string, password: string): Promise<AuthResponseData | null> => {
    const result = await userService.auth(login, password)
    return result
}

const register = async (registerData: RegisterFormData) => {
    const result = await userService.register(registerData)
    return result
}

const checkAuth = async () => {
    const result = await userService.checkAuth()
    return result
}

export const userQueries = {
    auth,
    register,
    checkAuth
}