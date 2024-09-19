import { ForwardedRef, forwardRef } from 'react'
import { IWidgetProps } from './types'
import { WidgetContainer, WidgetTitle } from './Widget-styled'

export const Widget = forwardRef(({ children, title }: IWidgetProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <WidgetContainer ref={ref}>
      <WidgetTitle>{title}</WidgetTitle>
      {children}
    </WidgetContainer>
  )
})