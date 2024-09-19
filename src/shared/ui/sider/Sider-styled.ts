import { StyledComponentProps } from '@shared/lib'
import styled from 'styled-components'

export const SiderContainer = styled.div`
  height: 100%;
  max-width: 350px;
  width: 100%;
  border-right: 1px solid #d6d6d6;
  display: flex;
  flex-direction: column;

  a {
    max-width: 250px;
    width: 100%;
  }
`

export const SiderMain = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  row-gap: 10px;
`

export const SiderBottom = styled.div`
  max-width: 250px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto auto;
  padding-bottom: 30px;
`

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
