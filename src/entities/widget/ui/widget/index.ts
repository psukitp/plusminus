import styled from 'styled-components'
import { WidgetComponent } from './Widget'

export const Widget = styled(WidgetComponent)`
  //TODO заменить на значение из темы
  padding: 24px;
  border-radius: 16px;
  outline: ${({ type }) => (type === 'outlined' ? '1px solid #000' : 'none')};
  background: ${({ theme: { pallete }, type }) =>
    type === 'primary'
      ? pallete.primary.orange
      : type === 'secondary'
        ? pallete.primary.purple
        : pallete.dom.background};
  height: 100%;
  box-sizing: border-box;
`
