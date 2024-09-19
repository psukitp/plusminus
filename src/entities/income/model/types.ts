import { Key } from 'react'

export type IncomesRecord = {
  id: Key
  date: Date | string
  categoryId: number
  categoryName: string
  categoryColor: string
  amount: number
}

export type IncomesByCategoryRecord = {
  id: Key
  categoryName: string
  amount: number
  color: string
}

export type IncomesLastMonthes = {
  monthes: string[]
  values: number[]
}

export type IncomesThisMonth = {
  loading: boolean
  incomesTotal: number
  incomesDiff: number
}
