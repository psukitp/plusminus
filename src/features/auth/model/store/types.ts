import { AuthResponseData } from "@pages/auth/ui/types"

export interface IUseAuth {
    loading: boolean
    data: AuthResponseData
    setUserData: (userData: AuthResponseData) => void
    setLoading: (val: boolean) => void
}