import { Link } from 'react-router-dom'
import { SiderButtonProps } from './types'
import { Button } from '../components/button'
// import { Button } from '../buttton'

export const SiderButtonComponent = ({
  active,
  text,
  icon,
  linkTo,
  className,

  onClick,
}: SiderButtonProps) => {
  return (
    <Link to={`/${linkTo}`} className={className}>
      <Button
        additionClass="sider-button"
        icon={icon}
        onClick={onClick}
        type={active ? 'primary' : 'secondary'}
      >
        {text}
      </Button>
    </Link>
  )
}
