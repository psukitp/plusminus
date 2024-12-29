import { ReactElement } from 'react'

export interface IWidgetProps {
  title: string
  children: ReactElement
  customFooter?: ReactElement
  needPadding?: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
  className?: string
}
