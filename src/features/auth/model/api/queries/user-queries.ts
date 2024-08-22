import { getAxiosInstance } from "@shared/lib";
import { UserService } from "../services/user-service";
import { AuthResponseData } from "@pages/auth/ui/types";
import { RegisterFormData } from "@pages/register/ui/types";


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