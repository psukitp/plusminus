import { create } from 'zustand'
import { IUseAuth } from './types'
import { AuthResponseData, UserSettings } from '../types'

const initial: AuthResponseData = {
  id: null,
  name: '',
  secondName: '',
  login: '',
  phone: '',
  email: '',
  settings: {},
}

export const useUser = create<IUseAuth>((set) => ({
  loading: false,
  data: { ...initial },
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
  setInitial: () =>
    set({
      data: { ...initial },
    }),
}))
