import { StyledComponentProps } from "@shared/lib/styles/theme-light"
import { isMobile } from "react-device-detect"
import styled from "styled-components"

export const IconContainer = styled.span`
    margin-right: ${isMobile
        ? 0
        : '20px'};
`

export const SiderButtonContainer = styled.button<StyledComponentProps & { active: boolean }>`
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    background: ${({ theme, active }) => active ? theme.colors.backgroundComponent.active : theme.colors.backgroundComponent.default};
    border: ${({ theme }) => theme.common.border};
    border-radius: ${({ theme }) => theme.common.borderRadius};
    padding: 15px 15px;
    max-width: 250px;
    font-size: 20px;
    line-height: 20px;
    width: 100%;
    color: ${(({ active, theme }) => active ? theme.colors.textColor.active : theme.colors.textColor.default)};
    user-select: none;
    text-align: left;
`