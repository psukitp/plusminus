import { NewExpense } from '@entities/expense'
import { useExpensesCategories } from '@features/category'
import { yearMonthDay } from '@shared/constants'
import { openNotificationError } from '@shared/lib'
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Select,
  SelectOption,
} from '@shared/ui'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

interface ICreateProps {
  className?: string
  open: boolean
  onCreate: (expense: NewExpense) => void
  onClose: () => void
}

const CreateComponent = ({
  className,
  open,
  onClose,
  onCreate,
}: ICreateProps) => {
  const [categories] = useExpensesCategories()

  const [newExpenseData, setNewExpenseData] = useState<NewExpense>({
    amount: 0,
    date: dayjs().format(yearMonthDay),
    categoryId: null,
  })

  const selectOptions = useMemo<SelectOption[]>(() => {
    return categories?.map((c) => ({
      key: c.id,
      label: c.name,
      value: c.id.toString(),
      color: c.color,
    }))
  }, [categories])

  const handleOk = () => {
    const { amount, categoryId, date } = newExpenseData
    if (!amount || !categoryId || !date)
      openNotificationError('Не все данные заполнены')
    else {
      onCreate(newExpenseData)
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Новая трата">
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
}

export const Create = styled(CreateComponent)(
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
