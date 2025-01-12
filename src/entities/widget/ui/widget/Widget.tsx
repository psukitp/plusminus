import { ForwardedRef, forwardRef } from 'react'
import { IWidgetProps } from './types'
import styled from 'styled-components'

export const WidgetComponent = forwardRef(
  (
    {
      children,
      title,
      className,
      needpadding = false,
      type,
      customFooter,
    }: IWidgetProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className={className}>
        <WidgetTitle needpadding={needpadding} type={type}>
          {title}
        </WidgetTitle>
        {children}
        {customFooter}
      </div>
    )
  },
)

const WidgetTitle = styled.div<{
  needpadding: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
}>`
  ${({ theme }) => theme.fonts.leading}

  color: ${({ type }) =>
    type === 'primary' || type === 'secondary' ? '#FFF' : '#000'};
  padding-bottom: ${({ needpadding }) => (needpadding ? '8px' : 0)};
`
