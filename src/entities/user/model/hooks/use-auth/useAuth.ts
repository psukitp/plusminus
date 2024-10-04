import { useNavigate } from 'react-router-dom'
import { userQueries } from '../../../api/queries'
import { useUser } from '../../store'
import { openNotificationWarning } from '@shared/lib'
import { RegisterFormData, AuthFormData } from '../../types'

const validateFieldNoEmpty = (fields: any) => {
  return Object.values(fields).every(
    (value) => value !== null && value !== undefined && value !== '',
  )
}

const emailRegExp = /@/

export const useAuth = () => {
  const setUserData = useUser((state) => state.setUserData)
  const setLoading = useUser((state) => state.setLoading)
  const navigate = useNavigate()

  const onAuth = async (authData: AuthFormData) => {
    if (validateFieldNoEmpty(authData)) {
      setLoading(true)
      const userData = await userQueries.auth(authData.login, authData.password)
      if (userData) {
        setUserData(userData)
        navigate('/review')
      }
      setLoading(false)
    } else {
      openNotificationWarning('Не все данные заполнены')
    }
  }

  const onRegister = async (registerData: RegisterFormData) => {
    if (!validateFieldNoEmpty(registerData)) {
      openNotificationWarning('Не все данные заполнены')
    } else if (registerData.password.length < 8) {
      openNotificationWarning('Минимальная длина пароля - 8 символов')
    } else if (!emailRegExp.test(registerData.email)) {
      openNotificationWarning('Кажется, введена некорректная почта.')
    } else {
      setLoading(true)
      const userData = await userQueries.register(registerData)
      if (userData) {
        setUserData(userData)
        navigate('/review')
      }
      setLoading(false)
    }
  }

  const onCheck = async () => {
    setLoading(true)
    const userData = await userQueries.checkAuth()
    if (userData) {
      setUserData(userData)
      navigate('/review')
    } else navigate('/auth')
    setLoading(false)
  }

  const getResetCode = async (email: string): Promise<boolean> => {
    if (!email) {
      openNotificationWarning('Не заполнено поле')
      return false
    } else if (!emailRegExp.test(email)) {
      openNotificationWarning('Кажется, введена некорректная почта.')
      return false
    } else {
      return await userQueries.getResetCode(email)
    }
  }

  const applyCode = async (code: string): Promise<boolean> => {
    if (!code) {
      openNotificationWarning('Не заполнено поле')
      return false
    }  else {
      return await userQueries.applyCode(code)
    }
  }

  const setPassword = async (password: string) => {
    if (password) {
      setLoading(true)
      const userData = await userQueries.setPassword(password)
      if (userData) {
        setUserData(userData)
        navigate('/review')
      }
      setLoading(false)
    } else {
      openNotificationWarning('Не все данные заполнены')
    }
  }

  return {
    onAuth,
    onRegister,
    onCheck,
    getResetCode,
    applyCode,
    setPassword
  }
}
