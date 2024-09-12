import { StyledComponentProps } from "@shared/lib"
import styled from "styled-components";


export const MobileMenuContainer = styled.div<StyledComponentProps>`
 position: fixed;
 bottom: 0px;
 width: 100%;
 background: ${({ theme }) => theme.colors.mobile.containerBackground};
 padding: 10px 0px;
 z-index: 1000;
 border-radius: 15px;
`

export const MobileMenuButtons = styled.div`
display: flex;
justify-content: space-around;
`