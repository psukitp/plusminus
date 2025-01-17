import { NewCategory } from '@entities/category'
import { Category } from '@entities/category'
import { Key, useEffect } from 'react'
import {
  useExpensesCategoriesData,
  expensesCategoriesQueries,
} from '@entities/category'

type useExpensesCategoriesResult = [
  Category[],
  boolean,
  {
    createNewCategory: (newCategory: NewCategory) => void
    editCategory: (category: Partial<Category>) => void
    deleteCategory: (id: Key) => void
    refreshData: () => void
  },
]

export const useExpensesCategories = (): useExpensesCategoriesResult => {
  const {
    data,
    loading,
    isDataFetched,
    fetchData,
    deleteCategory: deleteCategoryState,
    editCategory: editCategoryState,
    addCategory: addCategoryState,
  } = useExpensesCategoriesData((state) => state)

  useEffect(() => {
    if (!isDataFetched) fetchData()
  }, [isDataFetched])

  const createNewCategory = (newCategory: NewCategory) => {
    expensesCategoriesQueries.createNewCategory(newCategory).then((result) => {
      if (result != null) addCategoryState(result)
    })
  }

  const editCategory = (category: Partial<Category>) => {
    expensesCategoriesQueries.editCategory(category).then((result) => {
      if (result != null) editCategoryState(result)
    })
  }

  const deleteCategory = (id: Key) => {
    expensesCategoriesQueries.deleteCategory(id).then((result) => {
      if (result != null) deleteCategoryState(result)
    })
  }

  return [
    data,
    loading,
    { createNewCategory, editCategory, deleteCategory, refreshData: fetchData },
  ]
}
