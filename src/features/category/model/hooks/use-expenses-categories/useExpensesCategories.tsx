import { NewCategory } from '@entities/category'
import { Category } from '@entities/category'
import { ColumnsType } from 'antd/es/table'
import { Key, useEffect } from 'react'
import {
  useExpensesCategoriesData,
  expensesCategoriesQueries,
} from '@entities/category'

type useExpensesCategoriesResult = [
  Category[],
  ColumnsType<Category>,
  boolean,
  {
    createNewCategory: (newCategory: NewCategory) => void
    editCategory: (category: Partial<Category>) => void
    deleteCategory: (id: Key) => void
    refreshData: () => void
  },
]

const columns: ColumnsType<Category> = [
  {
    title: 'Категория',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Цвет',
    dataIndex: 'color',
    key: 'color',
    render: (value) => (
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: value,
          margin: '0 auto',
          border: '1px solid #a6a6a6',
          borderRadius: '50%',
        }}
      />
    ),
  },
  {
    title: 'Действия',
    dataIndex: 'actions',
    key: 'actions',
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
    columns,
    loading,
    { createNewCategory, editCategory, deleteCategory, refreshData: fetchData },
  ]
}
