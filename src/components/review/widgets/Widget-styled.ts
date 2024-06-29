import { StyledComponentProps } from "@common/theme-light"
import { border, borderRadius } from "@common/variables"
import styled from "styled-components"

export const WidgetContainer = styled.div<StyledComponentProps>`
  padding: 20px 25px;
  ${border}
  ${borderRadius}
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