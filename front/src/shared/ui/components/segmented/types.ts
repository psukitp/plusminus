import { Key } from 'react'

export type SegmentedOption<T> = {
  id: Key
  value: T
  label: string
}

export interface ISegmentedProps<T> {
  options: SegmentedOption<T>[]
  className?: string
  active: Key
  onClick: (value: SegmentedOption<T>) => void
}
