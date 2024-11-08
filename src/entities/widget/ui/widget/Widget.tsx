import { ForwardedRef, forwardRef } from 'react'
import { IWidgetProps } from './types'
import { WidgetContainer, WidgetTitle } from './Widget-styled'

export const Widget = forwardRef(
  (
    { children, title, needPadding = false }: IWidgetProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <WidgetContainer ref={ref}>
        <WidgetTitle needPadding={needPadding}>{title}</WidgetTitle>
        {children}
      </WidgetContainer>
    )
  },
)
