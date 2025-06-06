import { NewIncome } from '@entities/income'
import { useExpensesCategories } from '@features/category'
import { openNotificationError } from '@shared/lib'
import { Modal } from '@shared/ui'
import { Button, InputNumber, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

interface ICreateProps {
  className?: string
  open: boolean
  onCreate: (expense: NewIncome) => void
  onClose: () => void
}

const CreateComponent = ({
  className,
  open,
  onClose,
  onCreate,
}: ICreateProps) => {
  const [categories] = useExpensesCategories()

  const [newIncomeData, setNewIncomeData] = useState<NewIncome>({
    amount: 0,
    date: dayjs().format('YYYY-MM-DD'),
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
    const { amount, categoryId, date } = newIncomeData
    if (!amount || !categoryId || !date)
      openNotificationError('Не все данные заполнены')
    else {
      onCreate(newIncomeData)
      onClose()
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
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
        <InputNumber
          type="number"
          placeholder="Введите сумму"
          className="sum"
          value={newIncomeData.amount}
          onChange={(e) =>
            setNewIncomeData((prev) => ({ ...prev, amount: e ? e : 0 }))
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
}

export const Create = styled(CreateComponent)(
  () => css`
    .select {
      width: 100%;
    }
  `,
)
