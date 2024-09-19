import { notification } from 'antd'
import { ArgsProps } from 'antd/es/notification'

const defaultConfig: Partial<ArgsProps> = {
  duration: 3,
  placement: 'topRight',
}
export const openNotificationError = (message: string) => {
  notification.error({
    message,
    ...defaultConfig,
  })
}

export const openNotificationWarning = (message: string) => {
  notification.warning({
    message,
    ...defaultConfig,
  })
}

export const openNotificationSuccess = (message: string) => {
  notification.success({
    message,
    ...defaultConfig,
  })
}
