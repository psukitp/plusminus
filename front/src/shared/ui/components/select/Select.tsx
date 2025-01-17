import { ISelectProps } from './types'

export const SelectComponent = ({
  options,
  additionalClass,
  className,
  value,
  placeholder = 'Выбор из списка',
  onChange,
}: ISelectProps) => {
  const typedValue = value as number | string
  return (
    <div className={`${className} ${additionalClass}`}>
      <select autoFocus={false} value={typedValue ?? ''} onChange={onChange}>
        <option value="" disabled selected={(value ?? '') === ''}>
          {placeholder}
        </option>
        {options?.map((opt) => (
          <option
            key={opt.key}
            value={opt.value?.toString() ?? undefined}
            style={{ color: opt.color ?? '#000' }}
            selected={value === opt.key}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
