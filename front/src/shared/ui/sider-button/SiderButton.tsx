import { Link } from 'react-router-dom'
import { SiderButtonProps } from './types'
import { Button } from '../components/button'

export const SiderButtonComponent = ({
  active,
  text,
  icon,
  linkTo,
  className,
  type = 'sider',

  onClick,
}: SiderButtonProps) => {
  const getType = () => {
    if (type === 'mobile') return 'ghost'

    if (active) return 'primary'

    return 'secondary'
  }

  return (
    <Link to={`/${linkTo}`} className={className}>
      <Button
        additionClass="sider-button"
        icon={type === 'mobile' ? undefined : icon}
        onClick={onClick}
        type={getType()}
        active={active}
      >
        {type === 'mobile' ? icon : text}
      </Button>
    </Link>
  )
}
