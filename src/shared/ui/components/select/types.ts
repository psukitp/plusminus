import { ChangeEventHandler, Key, ReactNode } from 'react'

export type SelectOption = {
  key: Key
  label: string | number | ReactNode
  value: Key | null | undefined
  color?: string
}

export interface ISelectProps {
  className?: string
  additionalClass?: string
  value?: string | number | null | Key
  options?: SelectOption[]
  placeholder?: string

  onChange?: ChangeEventHandler<HTMLSelectElement>
}
