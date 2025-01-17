import { Key } from 'react'

export type CategoryRecord = {
  id: number
  date: Date | string
  categoryName: string
  amount: number
}

export type Category = {
  id: Key
  name: string
  color: string
}

export type NewCategory = Partial<Pick<Category, 'color' | 'name'>>
