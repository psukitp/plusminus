import { Link } from 'react-router-dom'
import { SiderButtonProps } from './types'
import { IconContainer, SiderButtonContainer } from './SiderButton-styled'
import { Button } from '../components/button'
// import { Button } from '../buttton'

export const SiderButton = ({
  active,
  text,
  icon,
  linkTo,

  onClick,
}: SiderButtonProps) => {
  return (
    <Link to={`/${linkTo}`}>
      <Button
        icon={icon}
        onClick={onClick}
        text={text}
        type={active ? 'primary' : 'secondary'}
      />
      {/* <SiderButtonContainer active={active} onClick={onClick}>
        <IconContainer>{icon}</IconContainer> {text}
      </SiderButtonContainer> */}
    </Link>
  )
}
