import { IInputProps } from './types'

export const InputComponent = ({
  className,
  placeholder,
  value,
  additionalClass,
  type,
  onChange,
}: IInputProps) => {
  return (
    <input
      type={type}
      value={value ?? undefined}
      onChange={onChange}
      className={`${className} ${additionalClass}`}
      placeholder={placeholder}
    />
  )
}
