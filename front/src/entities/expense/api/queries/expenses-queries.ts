import { Key } from 'react'
import { getAxiosInstance, StringDates } from '@shared/lib'
import { ExpensesService } from '../services'
import {
  ExpensesRecord,
  ExpensesByCategoryRecord,
  ExpensesLastMonthes,
  ExpensesThisMonth,
} from '@entities/expense/model'
import { ExpensesLastWeek } from '@entities/expense/model/types'

const client = getAxiosInstance()
const expensesService = new ExpensesService(client)

const fetchExpenses = async (date: string): Promise<ExpensesRecord[]> => {
  const result = await expensesService.getExpenses(date)
  return result
}

const createNewExpense = async ({
  date,
  categoryId,
  amount,
}: {
  date: string
  categoryId: Key
  amount: number
}): Promise<ExpensesRecord | null> => {
  const result = await expensesService.postNewExpense({
    date,
    amount,
    categoryId,
  })
  return result
}

const fetchExpensesSum = async (
  dates: StringDates,
): Promise<Omit<ExpensesThisMonth, 'loading'>> => {
  const result = await expensesService.fetchExpensesSum(dates)
  return result
}

const fetchExpensesByCategoryPeriod = async (
  dates: StringDates,
): Promise<ExpensesByCategoryRecord[]> => {
  const result = await expensesService.getExpensesByCategoriesPeriod(dates)
  return result
}

const fetchExpensesByLastMonthes = async (): Promise<ExpensesLastMonthes> => {
  const result = await expensesService.getExpensesLastMonthes()
  return result
}

const deleteExpense = async (id: Key): Promise<Key | null> => {
  const result = await expensesService.deleteExpense(id)
  return result
}

const editExpense = async (expense: {
  id: Key | null
  categoryId: Key | null
  amount: number | null
}): Promise<ExpensesRecord | null> => {
  const result = await expensesService.editExpense(expense)
  return result
}

const fetchExpensesLastWeek = async (
  date: string,
): Promise<ExpensesLastWeek | null> => {
  const result = await expensesService.getExpensesLastWeek(date)
  return result
}

export const expensesQueries = {
  fetchExpenses,
  createNewExpense,
  fetchExpensesSum,
  fetchExpensesByCategory: fetchExpensesByCategoryPeriod,
  fetchExpensesByLastMonthes,
  deleteExpense,
  editExpense,
  fetchExpensesLastWeek,
}
