import './Widget.less'
import { IWidgetProps } from './types'

export const Widget = ({ children }: IWidgetProps) => {
  return <div className='widget'>
    {children}
  </div>
}