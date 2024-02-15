import './SiderButton.less'
import { SiderButtonProps } from './types'

export const SiderButton = ({
    active,
    text,
    icon,
    onClick
}: SiderButtonProps) => {
    return (
        <button
            className={`sider-button ${active ? 'button-on' : ''}`}
            onClick={onClick}>
            <span>{icon}</span> {text}
        </button>
    )
}