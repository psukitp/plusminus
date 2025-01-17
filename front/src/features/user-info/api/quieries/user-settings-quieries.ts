import { getAxiosInstance } from '@shared/lib'
import { UserSettingsService } from '../services'
import { UserSettings } from '@entities/user'

const client = getAxiosInstance()
const userSettingsService = new UserSettingsService(client)

const updateSettings = async (
  settings: UserSettings,
): Promise<UserSettings> => {
  const result = await userSettingsService.patchSettings(settings)
  return result
}

export const userSettingsQueries = {
  updateSettings,
}
