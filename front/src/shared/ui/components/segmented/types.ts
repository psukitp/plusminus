import { Key, ReactNode } from 'react'

export type SegmentedOption<T> = {
  id: Key
  value: T
  label: string | ReactNode
}

export interface ISegmentedProps<T> {
  options: SegmentedOption<T>[]
  className?: string
  active: Key
  cirlced?: boolean
  onClick: (value: SegmentedOption<T>) => void
}
