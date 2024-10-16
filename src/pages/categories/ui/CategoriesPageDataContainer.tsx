import { Key, useCallback, useMemo, useState } from 'react'
import { ModalInfo } from '@features/category/ui/modal/types'
import { Category } from '@entities/category'
import { Space } from 'antd'
import { Button } from '@shared/ui'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { CategoriesPage } from './CategoriesPage'
import { initialModal } from './utils'
import { useExpensesCategories, useIncomesCategories } from '@features/category'
import { DeleteModal } from '@features/category/ui/delete-modal'

const CategoriesPageDataContainer = () => {
  const [
    expRecords,
    expColumns,
    expLoading,
    {
      createNewCategory: createExpenseCategory,
      editCategory: editExpenseCategory,
      deleteCategory: deleteExpenseCategory,
      refreshData: refreshExpenseCategories,
    },
  ] = useExpensesCategories()
  const [
    incRecords,
    incColumns,
    incLoading,
    {
      createNewCategory: createIncomeCategory,
      editCategory: editIncomeCategory,
      deleteCategory: deleteIncomeCategory,
      refreshData: refreshIncomeCategories,
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

  const expColumnsToRender = useMemo(
    () =>
      expColumns.map((c) =>
        c.key === 'actions'
          ? {
              ...c,
              render: (_: any, record: Category) => (
                <Space size="middle">
                  <Button
                    margin={false}
                    type="text"
                    onClick={() => onEdit(record, 'expense')}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    margin={false}
                    type="text"
                    onClick={() => onOpenDeleteModal(record, 'expense')}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              ),
            }
          : c,
      ),
    [expColumns],
  )

  const incColumnsToRender = useMemo(
    () =>
      incColumns.map((c) =>
        c.key === 'actions'
          ? {
              ...c,
              render: (_: any, record: Category) => (
                <Space size="middle">
                  <Button
                    margin={false}
                    type="text"
                    onClick={() => onEdit(record, 'income')}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    margin={false}
                    type="text"
                    onClick={() => onOpenDeleteModal(record, 'income')}
                  >
                    <DeleteOutlined />
                  </Button>
                </Space>
              ),
            }
          : c,
      ),
    [incColumns],
  )

  console.log(!!deleteInfo)

  return (
    <>
      <CategoriesPage
        expColumns={expColumnsToRender}
        expLoading={expLoading}
        expRecords={expRecords}
        incColumns={incColumnsToRender}
        incLoading={incLoading}
        incRecords={incRecords}
        modalInfo={modalInfo}
        openModal={openModal}
        createExpenseCategory={createExpenseCategory}
        createIncomeCategory={createIncomeCategory}
        editExpenseCategory={editExpenseCategory}
        editIncomeCategory={editIncomeCategory}
        refreshExpenseCategories={refreshExpenseCategories}
        refreshIncomeCategories={refreshIncomeCategories}
        setModalInfo={setModalInfo}
        setOpenModal={setOpenModal}
      />
      <DeleteModal
        open={!!deleteInfo}
        onOk={() => onDelete(deleteInfo!.id, categoryType!)}
        category={deleteInfo!}
        onClose={() => setDeleteInfo(null)}
      />
    </>
  )
}

export default CategoriesPageDataContainer
