import { StyledComponentProps } from "@shared/lib/styles/theme-light";
import { ButtonProps, Button as AntdButton } from "antd";
import styled from "styled-components";

type PlusminusButtonProps = ButtonProps & {
    margin?: boolean
}

const ButtonContainer = styled(AntdButton) <StyledComponentProps>`
    background: ${({ theme }) => theme.colors.backgroundComponent.default};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    color: ${({ theme }) => theme.colors.textColor.default};

    &.default-margin {
        margin-bottom: 15px;
    }
`

export const Button = ({ margin = true, ...rest }: PlusminusButtonProps) => {
    return <ButtonContainer
        {...rest}
        className={`plusminus-button ${margin ? 'default-margin' : ''}`}
    />
}