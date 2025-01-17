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
  type = 'sider',

  onClick,
}: SiderButtonProps) => {
  return (
    <Link to={`/${linkTo}`} className={className}>
      <Button
        additionClass="sider-button"
        icon={type === 'mobile' ? undefined : icon}
        onClick={onClick}
        type={active ? 'primary' : 'secondary'}
      >
        {type === 'mobile' ? icon : text}
      </Button>
    </Link>
  )
}
