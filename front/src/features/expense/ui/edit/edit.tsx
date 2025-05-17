import { NewExpense } from '@entities/expense'
import { select } from '@entities/expense/store/selector'
import { useExpenseStore } from '@entities/expense'
import { useExpensesCategories } from '@features/category'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  SelectOption,
} from '@shared/ui'
import { Key, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { yearMonthDay } from '@shared/constants'

interface IEditProps {
  className?: string
  id: Key | null
  onEdit: (expense: Partial<NewExpense>) => void
  onClose: () => void
}

const EditComponent = ({ className, id, onClose, onEdit }: IEditProps) => {
  const expense = useExpenseStore(select.expenseById(id))
  const [categories] = useExpensesCategories()
  const [newExpenseData, setNewExpenseData] = useState<Partial<NewExpense>>({})

  useEffect(() => {
    if (expense)
      setNewExpenseData({
        amount: expense?.amount,
        categoryId: expense?.categoryId,
      })
  }, [expense])

  const selectOptions = useMemo<SelectOption[]>(() => {
    return categories?.map((c) => ({
      key: c.id,
      label: c.name,
      value: c.id.toString(),
      color: c.color,
    }))
  }, [categories])

  const handleOk = () => {
    onEdit(newExpenseData)
    onClose()
  }

  return (
    expense && (
      <Modal open={!!id} onClose={onClose} title="Изменить">
        <div className={className}>
          <div className="label">Категория:</div>
          <Select
            placeholder="Выберите категорию"
            value={newExpenseData.categoryId}
            onChange={(e) =>
              setNewExpenseData((prev) => ({
                ...prev,
                categoryId: e.target.value,
              }))
            }
            additionalClass="category"
            options={selectOptions}
          />
          <div className="short-inputs">
            <div>
              <div className="label">Сумма:</div>
              <Input
                type="number"
                placeholder="Введите сумму"
                additionalClass="sum"
                value={newExpenseData.amount}
                onChange={(e) =>
                  setNewExpenseData((prev) => ({
                    ...prev,
                    amount: +e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <div className="label">Дата:</div>
              <DatePicker
                value={newExpenseData.date}
                onChange={(date) =>
                  setNewExpenseData((prev) => ({
                    ...prev,
                    date: date.format(yearMonthDay),
                  }))
                }
              />
            </div>
          </div>
          <div className="footer">
            <Button
              additionClass="addBtn"
              type="primary"
              onClick={handleOk}
              textAlign="center"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Modal>
    )
  )
}

export const Edit = styled(EditComponent)(
  ({ theme }) => css`
    .label {
      ${theme.fonts.small};
      margin-bottom: ${theme.gaps.s}px;
      margin-top: ${theme.gaps.s}px;
    }

    .short-inputs {
      display: flex;
      justify-content: space-between;
    }

    .footer {
      margin-top: ${theme.gaps.s}px;
    }
  `,
)
