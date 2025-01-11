import { useState } from 'react'

export const SwitchComponent = ({
  className,
  checked: initialChecked = false,
  onChange,
}: {
  className?: string
  checked: boolean
  onChange: (val: boolean) => void
}) => {
  const [checked, setChecked] = useState(initialChecked)

  const handleClick = () => {
    const newChecked = !checked
    setChecked(newChecked)
    if (onChange) {
      onChange(newChecked)
    }
  }

  return (
    <div
      className={`${className} ${checked ? 'switch-checked' : ''}`}
      onClick={handleClick}
    >
      <div className="switch-handle" />
    </div>
  )
}
