import { IInputProps } from './types'

export const InputComponent = ({
  className,
  placeholder,
  value,
  additionalClass,
  type = 'text',
  disabled = false,
  onChange,
}: IInputProps) => {
  return (
    <input
      type={type}
      disabled={disabled}
      value={value ?? undefined}
      onChange={onChange}
      className={`${className} ${additionalClass}`}
      placeholder={placeholder}
    />
  )
}
