import { create } from 'zustand'
import { AuthResponseData } from '../components/auth/types'

interface IUseAuth {
    data: AuthResponseData
    setUserData: (userData: AuthResponseData) => void
}


export const useUser = create<IUseAuth>(set => ({
    data: {
        id: null,
        name: '',
        secondName: '',
        login: '',
        phone: '',
        email: ''
    },
    setUserData: (userData: AuthResponseData) => set({
        data: { ...userData }
    })
}))