import { Key } from 'react'
import { getAxiosInstance } from '@shared/lib'
import { ExpensesCategoriesService } from '../services/expenses-categories-service'
import { Category } from '../../model/types'
import { NewCategory } from '../../model/types'

const client = getAxiosInstance()
const expensesCategoriesService = new ExpensesCategoriesService(client)

const fetchExpensesCategories = async (): Promise<Category[]> => {
  const result = await expensesCategoriesService.getCategories()
  return result
}

const createNewCategory = async (
  newCategory: NewCategory,
): Promise<Category | null> => {
  const result = await expensesCategoriesService.postCategory(newCategory)
  return result
}

const editCategory = async (
  category: Partial<Category>,
): Promise<Category | null> => {
  const result = await expensesCategoriesService.editCategory(category)
  return result
}

const deleteCategory = async (id: Key): Promise<Key | null> => {
  const result = await expensesCategoriesService.deleteCategory(id)
  return result
}

export const expensesCategoriesQueries = {
  fetchExpensesCategories,
  createNewCategory,
  editCategory,
  deleteCategory,
}
