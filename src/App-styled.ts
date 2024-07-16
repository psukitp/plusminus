import { StyledComponentProps } from "@common/theme-light";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const AppContainer = styled.div<StyledComponentProps>`
      background: ${({ theme }) => theme.colors.backgroundComponent.default};
      color: ${({ theme }) => theme.colors.textColor.default};
      padding-bottom: ${isMobile
            ? '70px'
            : '0'};


      position: relative;
      height: 100%;
      display: flex;

      .fullscreen_loader{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
      }
`