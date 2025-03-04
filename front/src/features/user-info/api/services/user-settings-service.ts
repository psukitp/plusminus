import { UserSettings } from '@entities/user'
import {
  BaseService,
  openNotificationError,
  ServiceResponse,
} from '@shared/lib'
import { AxiosInstance } from 'axios'
export class UserSettingsService extends BaseService {
  url: string

  constructor(client: AxiosInstance) {
    super(client)
    this.url = 'UserSettings'
  }

  async patchSettings(settings: UserSettings): Promise<UserSettings> {
    try {
      const response = await this.client.patch<ServiceResponse<UserSettings>>(
        `${this.url}`,
        { ...settings },
      )

      const {
        data: { data, message, success },
      } = response

      if (!success) openNotificationError(message)
      return data
    } catch (e) {
      console.error(e)
      return {}
    }
  }
}
