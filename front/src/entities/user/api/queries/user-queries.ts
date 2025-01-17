import { getAxiosInstance } from '@shared/lib'
import { UserService } from '../services'
import { AuthResponseData, RegisterFormData } from '../../model/types'

const client = getAxiosInstance()
const userService = new UserService(client)

const auth = async (
  login: string,
  password: string,
): Promise<AuthResponseData | null> => {
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

const getResetCode = async (email: string): Promise<boolean> => {
  const res = await userService.getResetCode(email)
  return res
}

const applyCode = async (code: string): Promise<boolean> => {
  const res = await userService.applyCode(code)
  return res
}

const setPassword = async (
  password: string,
): Promise<AuthResponseData | null> => {
  const res = await userService.setPassword(password)
  return res
}

const logout = async (): Promise<void> => {
  await userService.logout()
}

export const userQueries = {
  auth,
  register,
  checkAuth,
  getResetCode,
  applyCode,
  setPassword,
  logout,
}
