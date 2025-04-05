import { EditedExpense, expensesQueries, NewExpense } from '@entities/expense'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Key, useEffect } from 'react'
import { UseExpenseResult } from './types'
import { useExpenseStore } from '@entities/expense'

export const useExpense = (
  startDate: string,
  endDate: string,
): UseExpenseResult => {
  const { addExpense, deleteExpense, editExpense, expenses, setExpenses } =
    useExpenseStore((state) => state)

  const { data: expensesResult = [], isLoading: expensesLoading } = useQuery({
    queryKey: ['expenses', startDate, endDate],
    queryFn: () => expensesQueries.fetchExpenses(startDate, endDate),
  })

  useEffect(() => {
    setExpenses(expensesResult)
  }, [JSON.stringify(expensesResult)])

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: Key) => await expensesQueries.deleteExpense(id),
    onSuccess: (deletedId) => deletedId && deleteExpense(deletedId),
  })

  const { mutate: addMutate } = useMutation({
    mutationFn: async (data: NewExpense) =>
      await expensesQueries.createNewExpense(data),
    onSuccess: (data) => data && addExpense(data),
  })

  const { mutate: editMutate } = useMutation({
    mutationFn: async (data: EditedExpense) =>
      await expensesQueries.editExpense(data),
    onSuccess: (data) => data && editExpense(data),
  })

  return {
    expenses,
    expensesLoading,
    deleteExpense: deleteMutate,
    addExpense: addMutate,
    editExpense: editMutate,
  }
}
