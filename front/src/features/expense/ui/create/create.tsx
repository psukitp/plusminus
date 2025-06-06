import { NewExpense } from '@entities/expense'
import { useExpensesCategories } from '@features/category'
import { yearMonthDay } from '@shared/constants'
import { dayMonthYearDot } from '@shared/constants/dayjs'
import { openNotificationError } from '@shared/lib'
import { Modal } from '@shared/ui'
import { Button, DatePicker, InputNumber, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
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

  const selectOptions = useMemo(() => {
    return categories?.map<DefaultOptionType>((c) => ({
      key: c.id,
      title: c.name,
      label: <div style={{ color: c.color }}>{c.name}</div>,
      value: c.id,
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

    .select {
      width: 100%;
    }
  `,
)
