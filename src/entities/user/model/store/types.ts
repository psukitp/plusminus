import { AuthResponseData, UserSettings } from '../types'

export interface IUseAuth {
  loading: boolean
  data: AuthResponseData
  setUserSettings: (settings: Partial<UserSettings>) => void
  setUserData: (userData: AuthResponseData) => void
  setLoading: (val: boolean) => void
  setInitial: () => void
}
