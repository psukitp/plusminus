import { useMutation, useQuery } from '@tanstack/react-query'
import { Key, useEffect } from 'react'
import { incomesQueries, useIncomeStore } from '@entities/income'
import { EditedIncome, NewIncome } from '@entities/income'
import { UseIncomeResult } from './types'

export const useIncome = (
  startDate: string,
  endDate: string,
): UseIncomeResult => {
  const { addIncome, deleteIncome, editIncome, incomes, setIncomes } =
    useIncomeStore((state) => state)

  const { data: incomesResult = [], isLoading: incomesLoading } = useQuery({
    queryKey: ['expenses', startDate, endDate],
    queryFn: () => incomesQueries.fetchIncomes(startDate, endDate),
  })

  useEffect(() => {
    setIncomes(incomesResult)
  }, [JSON.stringify(incomesResult)])

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: Key) => await incomesQueries.deleteIncome(id),
    onSuccess: (deletedId) => deletedId && deleteIncome(deletedId),
  })

  const { mutate: addMutate } = useMutation({
    mutationFn: async (data: NewIncome) =>
      await incomesQueries.createNewIncomes(data),
    onSuccess: (data) => data && addIncome(data),
  })

  const { mutate: editMutate } = useMutation({
    mutationFn: async (data: EditedIncome) =>
      await incomesQueries.editIncome(data),
    onSuccess: (data) => data && editIncome(data),
  })

  return {
    incomes,
    incomesLoading,
    deleteIncome: deleteMutate,
    addIncome: addMutate,
    editIncome: editMutate,
  }
}
