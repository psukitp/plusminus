import {
  CategoryModal,
  ModalInfo,
  useExpensesCategories,
  useIncomesCategories,
} from '@features/category'
import { ICategoriesPageProps } from './types'
import { initialModal } from './utils'
import { CategoryItem } from './CategoryItem'
import { Key, useCallback, useState } from 'react'
import { Category } from '@entities/category'
import { DeleteModal } from '@features/category/ui/delete-modal'
import { Button } from '@shared/ui/components'
import { PlusIcon } from '@shared/ui/icons'

export const CategoriesPageComponent = ({
  className,
}: ICategoriesPageProps) => {
  const [
    expRecords,
    ,
    ,
    {
      createNewCategory: createExpenseCategory,
      editCategory: editExpenseCategory,
      deleteCategory: deleteExpenseCategory,
    },
  ] = useExpensesCategories()
  const [
    incRecords,
    ,
    ,
    {
      createNewCategory: createIncomeCategory,
      editCategory: editIncomeCategory,
      deleteCategory: deleteIncomeCategory,
    },
  ] = useIncomesCategories()

  const [openModal, setOpenModal] = useState({ expense: false, income: false })
  const [modalInfo, setModalInfo] = useState<ModalInfo>({ ...initialModal })
  const [deleteInfo, setDeleteInfo] = useState<Category | null>(null)
  const [categoryType, setCategoryType] = useState<'expense' | 'income' | null>(
    null,
  )

  const onEdit = useCallback(
    (category: Category, mode: 'expense' | 'income') => {
      setModalInfo({
        id: category.id,
        title: mode === 'expense' ? 'Расходы' : 'Доходы',
        color: category.color,
        name: category.name,
      })

      mode === 'expense'
        ? setOpenModal((prev) => ({ ...prev, expense: true }))
        : setOpenModal((prev) => ({ ...prev, income: true }))
    },
    [setModalInfo, setOpenModal],
  )

  const onOpenDeleteModal = (
    category: Category,
    mode: 'expense' | 'income',
  ) => {
    setDeleteInfo(category)
    setCategoryType(mode)
  }

  const onDelete = useCallback(
    (id: Key, mode: 'expense' | 'income') => {
      if (mode === 'expense') deleteExpenseCategory(id)
      if (mode === 'income') deleteIncomeCategory(id)
    },
    [deleteExpenseCategory, deleteIncomeCategory],
  )

  return (
    <div className={className}>
      <div className="tables">
        <div className="table">
          <div className="title-block">
            <div className="category-subtitle">Расходы</div>
            <Button
              additionClass="addBtn"
              type="primary"
              onClick={() => setOpenModal({ expense: true, income: false })}
            >
              <PlusIcon />
            </Button>
          </div>
          {expRecords.map((r) => (
            <CategoryItem
              label={r.name}
              color={r.color}
              key={r.id}
              onDelete={() => onOpenDeleteModal(r, 'expense')}
              onEdit={() => onEdit(r, 'expense')}
            />
          ))}
        </div>
        <div className="table">
          <div className="title-block">
            <div className="category-subtitle">Доходы</div>
            <Button
              additionClass="addBtn"
              type="primary"
              onClick={() => setOpenModal({ expense: false, income: true })}
            >
              <PlusIcon />
            </Button>
          </div>
          {incRecords.map((r) => (
            <CategoryItem
              label={r.name}
              color={r.color}
              key={r.id}
              onDelete={() => onOpenDeleteModal(r, 'income')}
              onEdit={() => onEdit(r, 'income')}
            />
          ))}
        </div>
      </div>
      <CategoryModal
        onCancel={() => {
          setModalInfo({ ...initialModal })
          setOpenModal({ expense: false, income: false })
        }}
        mode={modalInfo.name === '' ? 'create' : 'edit'}
        onEdit={openModal.expense ? editExpenseCategory : editIncomeCategory}
        onCreate={
          openModal.expense ? createExpenseCategory : createIncomeCategory
        }
        open={openModal.expense || openModal.income}
        modalInfo={modalInfo}
      />
      <DeleteModal
        open={!!deleteInfo}
        onOk={() => onDelete(deleteInfo!.id, categoryType!)}
        category={deleteInfo!}
        onClose={() => setDeleteInfo(null)}
      />
    </div>
  )
}
