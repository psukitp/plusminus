import { ButtonProps } from './types'

export const ButtonComponent = ({
  children,
  icon,
  onClick,
  className,
  additionClass,
}: ButtonProps) => {
  return (
    <button className={`${className} ${additionClass ?? ''}`} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>} {children}
    </button>
  )
}
