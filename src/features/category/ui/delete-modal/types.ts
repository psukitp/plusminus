import { Category } from '@entities/category'

export interface IDeleteModalComponentProps {
  className?: string
  category: Category
  open: boolean
  onOk: () => void
  onClose: () => void
}
