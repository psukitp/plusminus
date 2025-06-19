import { useIncomesCategories } from '@features/category'
import { Modal } from '@shared/ui'
import { Key, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { NewIncome, useIncomeStore } from '@entities/income'
import { Button, DatePicker, InputNumber, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { dayMonthYearDot, yearMonthDay } from '@shared/constants/dayjs'
import dayjs from 'dayjs'

interface IEditProps {
  className?: string
  id: Key | null
  onEdit: (expense: Partial<NewIncome>) => void
  onClose: () => void
}

const EditComponent = ({ className, id, onClose, onEdit }: IEditProps) => {
  const income = useIncomeStore(
    (state) => state.incomes.find((inc) => inc.id === id) ?? null,
  )
  const [categories] = useIncomesCategories()
  const [newIncomeData, setNewIncomeData] = useState<Partial<NewIncome>>({})

  useEffect(() => {
    if (income)
      setNewIncomeData({
        amount: income?.amount,
        categoryId: income?.categoryId,
      })
  }, [income])

  const selectOptions = useMemo(() => {
    return categories?.map<DefaultOptionType>((c) => ({
      key: c.id,
      title: c.name,
      label: <div style={{ color: c.color }}>{c.name}</div>,
      value: c.id as string | number,
    }))
  }, [categories])

  const handleOk = () => {
    onEdit(newIncomeData)
    onClose()
  }

  return (
    income && (
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
          <div className="short-inputs">
            <div>
              <div className="label">Сумма:</div>
              <InputNumber
                placeholder="Введите сумму"
                className="sum"
                value={newIncomeData.amount}
                onChange={(e) =>
                  setNewIncomeData((prev) => ({
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
                  setNewIncomeData((prev) => ({
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
