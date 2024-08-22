import { StyledComponentProps } from "@shared/lib/styles/theme-light"
import styled from "styled-components"

export const WidgetContainer = styled.div<StyledComponentProps>`
  padding: 20px 25px;
  border: ${({ theme }) => theme.common.border};
  border-radius: ${({ theme }) => theme.common.borderRadius};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  background: ${({ theme }) => theme.colors.backgroundComponent.default};
  color: ${({ theme }) => theme.colors.textColor.default};
  height: 100%;
  box-sizing: border-box;
`

export const WidgetTitle = styled.div`
    font-size: 20px;
    line-height: 20px;
    padding-bottom: 25px;
`