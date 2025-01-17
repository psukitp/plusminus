import { Key, ReactNode } from 'react'

export type RecordData = {
  key: Key
  prefix?: ReactNode
  title: string
  value?: string | number | null
  suffix?: ReactNode
  color?: string
}

export type RecordType = {
  group: string
  data: RecordData[]
}

export interface IListProps {
  records: RecordType[]
  loading?: boolean
  className?: string
  sort?: 'asc' | 'desc' | null

  sortFunc?: (a: RecordType, b: RecordType) => number
  onEdit?: (value: RecordData) => void
  onDelete?: (id: Key) => void
}
