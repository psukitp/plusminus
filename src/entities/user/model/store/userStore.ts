import { create } from 'zustand'
import { IUseAuth } from './types'
import { AuthResponseData, UserSettings } from '../types'

export const useUser = create<IUseAuth>((set) => ({
  loading: false,
  data: {
    id: null,
    name: '',
    secondName: '',
    login: '',
    phone: '',
    email: '',
    settings: {},
  },
  setUserData: (userData: AuthResponseData) =>
    set({
      data: { ...userData },
    }),
  setUserSettings: (settings: UserSettings) =>
    set((state) => ({
      data: {
        ...state.data,
        settings,
      },
    })),
  setLoading: (val: boolean) =>
    set({
      loading: val,
    }),
}))
