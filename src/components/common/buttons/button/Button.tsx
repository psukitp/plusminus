import { ButtonProps, Button as AntdButton } from "antd";
import './Button.less'

type PlusminusButtonProps = ButtonProps & {
    margin?: boolean
}

export const Button = ({ margin = true, ...rest }: PlusminusButtonProps) => {
    return <AntdButton
        {...rest}
        className={`plusminus-button ${margin ? 'default-margin' : ''}`}
    />
}