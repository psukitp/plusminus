import { Key, ReactNode } from 'react'

export type RecordType = {
  group: string
  data: {
    key: Key
    prefix?: ReactNode
    title: string
    suffix?: ReactNode
    color?: string
  }[]
}
