import { Link } from 'react-router-dom'
import { SiderButtonProps } from './types'
import { IconContainer, SiderButtonContainer } from './SiderButton-styled'

export const SiderButton = ({
    active,
    text,
    icon,
    linkTo,

    onClick
}: SiderButtonProps) => {

    return (
        <Link to={`/${linkTo}`}>
            <SiderButtonContainer
                active={active}
                onClick={onClick}>
                <IconContainer>{icon}</IconContainer> {text}
            </SiderButtonContainer >
        </Link>
    )
}