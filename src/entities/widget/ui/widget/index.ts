import styled from 'styled-components'
import { WidgetComponent } from './Widget'

export const Widget = styled(WidgetComponent)`
  padding: 20px;
  border: ${({ theme }) => theme.common.border};
  border-radius: 16px;
  outline: ${({ type }) => (type === 'outlined' ? '1px solid #000' : 'none')};
  background: ${({ theme: { pallete }, type }) =>
    type === 'primary'
      ? pallete.primary.orange
      : type === 'secondary'
        ? pallete.primary.purple
        : pallete.dom.background};
  color: ${({ theme }) => theme.colors.textColor.default};
  height: 100%;
  box-sizing: border-box;
`
