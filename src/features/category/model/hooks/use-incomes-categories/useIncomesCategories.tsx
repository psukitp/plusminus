import { NewCategory } from '@entities/category'
import { Category } from '@entities/category'
import { Key, useEffect } from 'react'
import { useIncomesCategoriesData } from '@entities/category'
import { incomesCategoriesQueries } from '@entities/category'

type UseIncomesCategoriesResult = [
  Category[],
  boolean,
  {
    createNewCategory: (newCategory: NewCategory) => void
    editCategory: (category: Partial<Category>) => void
    deleteCategory: (id: Key) => void
    refreshData: () => void
  },
]

export const useIncomesCategories = (): UseIncomesCategoriesResult => {
  const {
    data,
    loading,
    isDataFetched,
    fetchData,
    deleteCategory: deleteCategoryState,
    editCategory: editCategoryState,
    addCategory: addCategoryState,
  } = useIncomesCategoriesData((state) => state)

  useEffect(() => {
    if (!isDataFetched) fetchData()
  }, [])

  const createNewCategory = (newCategory: NewCategory) => {
    incomesCategoriesQueries.createNewCategory(newCategory).then((result) => {
      if (result != null) addCategoryState(result)
    })
  }

  const editCategory = (category: Partial<Category>) => {
    incomesCategoriesQueries.editCategory(category).then((result) => {
      if (result != null) editCategoryState(result)
    })
  }

  const deleteCategory = (id: Key) => {
    incomesCategoriesQueries.deleteCategory(id).then((result) => {
      if (result != null) deleteCategoryState(result)
    })
  }

  return [
    data,
    loading,
    { createNewCategory, editCategory, deleteCategory, refreshData: fetchData },
  ]
}
