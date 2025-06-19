import { NewExpense } from '@entities/expense'
import { select } from '@entities/expense/store'
import { useExpenseStore } from '@entities/expense'
import { useExpensesCategories } from '@features/category'
import { Modal } from '@shared/ui'
import { Key, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { yearMonthDay } from '@shared/constants'
import { Button, DatePicker, Select, InputNumber } from 'antd'
import { dayMonthYearDot } from '@shared/constants/dayjs'
import dayjs from 'dayjs'
import { DefaultOptionType } from 'antd/es/select'

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

  const selectOptions = useMemo(() => {
    return categories?.map<DefaultOptionType>((c) => ({
      key: c.id,
      title: c.name,
      label: <div style={{ color: c.color }}>{c.name}</div>,
      value: c.id as string | number,
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
            showSearch
            filterOption={(input, option) =>
              (option?.title ?? '').toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Выберите категорию"
            value={newExpenseData.categoryId}
            className="select"
            onChange={(categoryId) =>
              setNewExpenseData((prev) => ({
                ...prev,
                categoryId,
              }))
            }
            options={selectOptions}
          />
          <div className="short-inputs">
            <div>
              <div className="label">Сумма:</div>
              <InputNumber
                type="number"
                placeholder="Введите сумму"
                className="sum"
                value={newExpenseData.amount}
                onChange={(e) =>
                  setNewExpenseData((prev) => ({
                    ...prev,
                    amount: e ?? 0,
                  }))
                }
              />
            </div>
            <div>
              <div className="label">Дата:</div>
              <DatePicker
                allowClear={false}
                format={dayMonthYearDot}
                defaultValue={dayjs()}
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
            <Button className="addBtn" type="primary" onClick={handleOk}>
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

    .select {
      width: 100%;
    }
  `,
)
