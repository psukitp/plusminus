import { IncomesRecord } from '@entities/income'
import { EditedIncome, NewIncome } from '@entities/income'
import { Key } from 'react'

export type UseIncomeResult = {
  incomes: IncomesRecord[]
  incomesLoading: boolean
  deleteIncome: (id: Key) => void
  addIncome: (expense: NewIncome) => void
  editIncome: (expense: EditedIncome) => void
}
