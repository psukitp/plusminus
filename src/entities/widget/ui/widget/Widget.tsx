import { ForwardedRef, forwardRef } from 'react'
import { IWidgetProps } from './types'
import styled from 'styled-components'

export const WidgetComponent = forwardRef(
  (
    { children, title, className, needPadding = false, type }: IWidgetProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className={className}>
        <WidgetTitle needPadding={needPadding} type={type}>
          {title}
        </WidgetTitle>
        {children}
      </div>
    )
  },
)

const WidgetTitle = styled.div<{
  needPadding: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
}>`
  font-size: 16px;
  line-height: 20px;
  color: ${({ type }) =>
    type === 'primary' || type === 'secondary' ? '#FFF' : '#000'};
  padding-bottom: ${({ needPadding }) => (needPadding ? '8px' : 0)};
`
