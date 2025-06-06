import { select } from '@entities/expense/store/selector'
import { useExpenseStore } from '@entities/expense'
import { useIncomesCategories } from '@features/category'
import { Modal } from '@shared/ui'
import { Key, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { NewIncome } from '@entities/income'
import { Button, Input, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'

interface IEditProps {
  className?: string
  id: Key | null
  onEdit: (expense: Partial<NewIncome>) => void
  onClose: () => void
}

const EditComponent = ({ className, id, onClose, onEdit }: IEditProps) => {
  const expense = useExpenseStore(select.expenseById(id))
  const [categories] = useIncomesCategories()
  const [newIncomeData, setNewIncomeData] = useState<Partial<NewIncome>>({})

  useEffect(() => {
    if (expense)
      setNewIncomeData({
        amount: expense?.amount,
        categoryId: expense?.categoryId,
      })
  }, [expense])

  const selectOptions = useMemo(() => {
    return categories?.map<DefaultOptionType>((c) => ({
      key: c.id,
      title: c.name,
      label: <div style={{ color: c.color }}>{c.name}</div>,
      value: c.id,
    }))
  }, [categories])

  const handleOk = () => {
    onEdit(newIncomeData)
    onClose()
  }

  return (
    expense && (
      <Modal open={!!id} onClose={onClose} title="Изменить">
        <div className={className}>
          <div className="label">Категория:</div>
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.title ?? '').toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Выберите категорию"
            value={newIncomeData.categoryId}
            className="select"
            onChange={(categoryId) =>
              setNewIncomeData((prev) => ({
                ...prev,
                categoryId,
              }))
            }
            options={selectOptions}
          />
          <div className="label">Сумма:</div>
          <Input
            type="number"
            placeholder="Введите сумму"
            className="sum"
            value={newIncomeData.amount}
            onChange={(e) =>
              setNewIncomeData((prev) => ({ ...prev, amount: +e.target.value }))
            }
          />
          <div className="footer">
            <Button className="addBtn" type="primary" onClick={handleOk}>
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    )
  )
}

export const Edit = styled(EditComponent)(() => css``)
