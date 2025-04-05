import { Key } from 'react'
import { getAxiosInstance, StringDates } from '@shared/lib'
import { IncomesService } from '../services'
import {
  IncomesRecord,
  IncomesByCategoryRecord,
  IncomesThisMonth,
  IncomesLastMonthes,
  IncomesByPeriod,
} from '@entities/income/model'
import { NewIncome } from '../../model'

const client = getAxiosInstance()
const incomesService = new IncomesService(client)

const fetchIncomes = async (
  startDate: string,
  endDate: string,
): Promise<IncomesRecord[]> => {
  const result = await incomesService.getIncomes(startDate, endDate)
  return result
}

const fetchIncomesByCategory = async (
  date: string,
): Promise<IncomesByCategoryRecord[]> => {
  const result = incomesService.getIncomesByCategories(date)
  return result
}

const createNewIncomes = async ({
  date,
  categoryId,
  amount,
}: NewIncome): Promise<IncomesRecord | null> => {
  const result = await incomesService.postNewIncomes({
    date,
    amount,
    categoryId,
  })
  return result
}

const fecthIncomesSum = async (
  dates: StringDates,
): Promise<Omit<IncomesThisMonth, 'loading'>> => {
  const result = await incomesService.fetchIncomesSum(dates)
  return result
}

const fetchIncomesLastMonthes = async (): Promise<IncomesLastMonthes> => {
  const result = await incomesService.getIncomesLastMonthes()
  return result
}

const deleteIncome = async (id: Key): Promise<Key | null> => {
  const result = await incomesService.deleteIncome(id)
  return result
}

const editIncome = async (
  income: Partial<NewIncome>,
): Promise<IncomesRecord | null> => {
  const result = await incomesService.editIncome(income)
  return result
}

const getTotalDiff = async (): Promise<number> => {
  const result = await incomesService.getTotalDiff()
  return result
}

const getIncomesByPeriod = async (
  startDate: string,
  endDate: string,
): Promise<IncomesByPeriod | null> => {
  const result = await incomesService.getIncomesByPeriod(startDate, endDate)
  return result
}

export const incomesQueries = {
  fetchIncomes,
  fetchIncomesByCategory,
  createNewIncomes,
  fecthIncomesSum,
  fetchIncomesLastMonthes,
  deleteIncome,
  editIncome,
  getTotalDiff,
  getIncomesByPeriod,
}
