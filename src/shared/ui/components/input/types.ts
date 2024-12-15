import { ChangeEventHandler } from 'react'

export interface IInputProps {
  type: string
  placeholder?: string
  className?: string
  additionalClass?: string
  value?: string | number | null

  onChange?: ChangeEventHandler<HTMLInputElement>
}
