import { lazy } from 'react'

export const CategoriesPage = lazy(
  () => import('./CategoriesPageDataContainer'),
)
