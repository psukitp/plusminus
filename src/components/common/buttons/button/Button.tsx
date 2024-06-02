import { ButtonProps, Button as AntdButton } from "antd";
import './Button.less'

export const Button = (props: ButtonProps) => {
    return <AntdButton
        {...props}
        className="plusminus-button"
    />
}