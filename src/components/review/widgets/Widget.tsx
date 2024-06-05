import { ForwardedRef, forwardRef } from 'react'
import './Widget.less'
import { IWidgetProps } from './types'


export const Widget = forwardRef(({ children, title }: IWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className='widget' ref={ref}>
      <div className='widget-title'>{title}</div>
      {children}
    </div>
  )
})