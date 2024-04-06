import { Link } from 'react-router-dom'
import './SiderButton.less'
import { SiderButtonProps } from './types'

export const SiderButton = ({
    active,
    text,
    icon,
    linkTo,

    onClick
}: SiderButtonProps) => {

    return (
        <Link to={`/${linkTo}`}>
            <button
                className={`sider-button ${active ? 'button-on' : ''}`}
                onClick={onClick}>
                <span>{icon}</span> {text}
            </button >
        </Link>
    )
}