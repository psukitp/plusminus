import { ButtonProps } from './types'

export const ButtonComponent = ({
  text,
  icon,
  onClick,
  className,
  additionClass,
}: ButtonProps) => {
  return (
    <button className={`${className} ${additionClass ?? ''}`} onClick={onClick}>
      {icon && <div className="icon">{icon}</div>} <div>{text}</div>
    </button>
  )
}
