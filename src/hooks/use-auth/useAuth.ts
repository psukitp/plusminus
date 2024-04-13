import { useNavigate } from "react-router-dom"
import { userQueries } from "../../api/queries/user-queries"
import { AuthFormData } from "../../components/auth/types"
import { RegisterFormData } from "../../components/register/types"
import { useUser } from "../../store/store"

export const useAuth = () => {

    const setUserData = useUser(state => state.setUserData)
    const navigate = useNavigate()

    const onAuth = async ({ login, password }: AuthFormData) => {
        const userData = await userQueries.auth(login, password)
        if (userData) {
            setUserData(userData)
            navigate('/review')
        }
    }

    const onRegister = async (registerData: RegisterFormData) => {
        const userData = await userQueries.register(registerData)
        if (userData) {
            setUserData(userData)
            navigate('/review')
        }
    }

    const onCheck = async () => {
        const userData = await userQueries.checkAuth()
        if (userData) {
            setUserData(userData)
            navigate('/review')
        } else {
            navigate('/auth')
        }
    }

    return {
        onAuth,
        onRegister,
        onCheck
    }
}