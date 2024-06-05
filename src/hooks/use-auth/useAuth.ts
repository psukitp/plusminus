import { useNavigate } from "react-router-dom"
import { userQueries } from "../../api/queries/user-queries"
import { AuthFormData } from "../../components/auth/types"
import { RegisterFormData } from "../../components/register/types"
import { useUser } from "../../store/store"

export const useAuth = () => {

    const setUserData = useUser(state => state.setUserData)
    const setLoading = useUser(state => state.setLoading)
    const navigate = useNavigate()

    const onAuth = async ({ login, password }: AuthFormData) => {
        setLoading(true)
        const userData = await userQueries.auth(login, password)
        if (userData) {
            setUserData(userData)
            navigate('/review')
        }
        setLoading(false)
    }

    const onRegister = async (registerData: RegisterFormData) => {
        setLoading(true)
        const userData = await userQueries.register(registerData)
        if (userData) {
            setUserData(userData)
            navigate('/review')
        }
        setLoading(false)
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