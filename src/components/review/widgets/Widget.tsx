import { ForwardedRef, forwardRef } from 'react'
import './Widget.less'
import { IWidgetProps } from './types'


export const Widget = forwardRef(({ children }: IWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div className='widget' ref={ref}>
      {children}
    </div>
  )
})