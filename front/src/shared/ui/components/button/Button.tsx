import { ButtonProps } from './types'

export const ButtonComponent = ({
  children,
  icon,
  className,
  additionClass,
  onClick,
}: ButtonProps) => {
  return (
    <button className={`${className} ${additionClass ?? ''}`} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>} {children}
    </button>
  )
}
