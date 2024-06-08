import { create } from 'zustand'
import { IUseAuth } from './types'
import { AuthResponseData } from '@components/auth/types'

export const useUser = create<IUseAuth>(set => ({
    loading: false,
    data: {
        id: null,
        name: '',
        secondName: '',
        login: '',
        phone: '',
        email: ''
    },
    setUserData: (userData: AuthResponseData) => set({
        data: { ...userData },
    }),
    setLoading: (val: boolean) => set({
        loading: val
    })
}))