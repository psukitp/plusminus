import { create } from 'zustand'
import { IExpensesCategoriesData } from './types'
import { expensesCategoriesQueries } from '@entities/category/api/queries'

export const useExpensesCategoriesData = create<IExpensesCategoriesData>(
  (set) => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async () => {
      set({ loading: true })
      const result = await expensesCategoriesQueries.fetchExpensesCategories()
      set({ data: result, loading: false, isDataFetched: true })
    },
    setCategories: (categories) =>
      set({
        data: [...categories],
      }),
    deleteCategory: (id) =>
      set((state) => ({
        data: state.data.filter((c) => c.id !== id),
      })),
    editCategory: (category) =>
      set((state) => ({
        data: state.data.map((c) =>
          c.id === category.id ? { ...category } : c,
        ),
      })),
    addCategory: (category) =>
      set((state) => ({
        data: [...state.data, category],
      })),
  }),
)
