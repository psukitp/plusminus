import { useNavigate } from "react-router-dom"
import { userQueries } from "../../api/queries/user-queries"
import { AuthFormData } from "../../components/auth/types"
import { RegisterFormData } from "../../components/register/types"
import { useUser } from "@store"
import { openNotificationWarning } from "@common/notification/notification"

const validateFieldNoEmpty = (fields: any) => {
    return Object.values(fields).every(value => value !== null && value !== undefined && value !== "")
}

export const useAuth = () => {

    const setUserData = useUser(state => state.setUserData)
    const setLoading = useUser(state => state.setLoading)
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
            openNotificationWarning("Не все данные заполнены")
        }
    }

    const onRegister = async (registerData: RegisterFormData) => {
        if (validateFieldNoEmpty(registerData)) {
            setLoading(true)
            const userData = await userQueries.register(registerData)
            if (userData) {
                setUserData(userData)
                navigate('/review')
            }
            setLoading(false)
        } else {
            openNotificationWarning("Не все данные заполнены")
        }
    }

    const onCheck = async () => {
        setLoading(true)
        const userData = await userQueries.checkAuth()
        if (userData) {
            setUserData(userData)
            navigate('/review')
        } else
            navigate('/auth')
        setLoading(false)
    }

    return {
        onAuth,
        onRegister,
        onCheck
    }
}