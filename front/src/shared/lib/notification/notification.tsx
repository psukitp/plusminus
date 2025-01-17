import { toast } from 'react-toastify'

const defaultConfig = {
  autoClose: 3 * 1000,
  hideProgressBar: true,
}
export const openNotificationError = (message: string) => {
  toast(message, {
    ...defaultConfig,
    type: 'error',
  })
}

export const openNotificationWarning = (message: string) => {
  toast(message, {
    ...defaultConfig,
    type: 'warning',
  })
}

export const openNotificationSuccess = (message: string) => {
  toast(message, {
    ...defaultConfig,
    type: 'success',
  })
}
