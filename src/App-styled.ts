import { StyledComponentProps } from "@common/theme-light";
import styled from "styled-components";

export const AppContainer = styled.div<StyledComponentProps>`
      height: 100%;
      display: flex;
      background: ${({ theme }) => theme.colors.backgroundComponent.default};
      color: ${({ theme }) => theme.colors.textColor.default};
`