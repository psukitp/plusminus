import { Link } from 'react-router-dom'
import { SiderButtonProps } from './types'
import { Button } from 'antd'

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
    if (type === 'mobile') return 'text'

    if (active) return 'primary'

    return 'text'
  }

  return (
    <Link to={`/${linkTo}`} className={className}>
      <Button
        className="sider-button"
        icon={type === 'mobile' ? undefined : icon}
        onClick={onClick}
        type={getType()}
        block
        size="large"
      >
        {type === 'mobile' ? icon : text}
      </Button>
    </Link>
  )
}
