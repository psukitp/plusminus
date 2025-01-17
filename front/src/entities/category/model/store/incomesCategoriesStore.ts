import { create } from 'zustand'
import { IIncomesCategoriesData } from './types'
import { incomesCategoriesQueries } from '@entities/category/api/queries'

export const useIncomesCategoriesData = create<IIncomesCategoriesData>(
  (set) => ({
    data: [],
    isDataFetched: false,
    loading: false,
    fetchData: async () => {
      set({ loading: true })
      const result = await incomesCategoriesQueries.fetchIncomesCategories()
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
