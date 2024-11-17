import { StyledComponentProps } from '@shared/lib'
import styled from 'styled-components'

export const SiderBottomButton = styled.button<
  StyledComponentProps & { active: boolean }
>`
  padding: 10px 0;
  max-width: 100px;
  height: 100%;
  width: 100%;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  background: ${({ theme, active }) =>
    active
      ? theme.colors.backgroundComponent.active
      : theme.colors.backgroundComponent.default};
  border: ${({ theme }) => theme.common.border};
  border-radius: ${({ theme }) => theme.common.borderRadius};
  color: ${({ theme }) => theme.colors.textColor.default};
  span {
    color: ${({ theme, active }) =>
      active ? theme.colors.textColor.active : theme.colors.textColor.default};
  }
`
