import { select } from "@entities/expense/store/selector"
import { useExpenseStore } from "@entities/expense"
import { useIncomesCategories } from "@features/category"
import { Button, Input, Modal, Select, SelectOption } from "@shared/ui"
import { Key, useEffect, useMemo, useState } from "react"
import styled, { css } from "styled-components"
import { NewIncome } from "@entities/income"

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
      setNewIncomeData({ amount: expense?.amount, categoryId: expense?.categoryId })
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
    onEdit(newIncomeData)
    onClose()
  }

  return expense && <Modal open={!!id} onClose={onClose} title="Изменить">
    <div className={className}>
      <div className="label">Категория:</div>
      <Select
        placeholder="Выберите категорию"
        value={newIncomeData.categoryId}
        onChange={(e) => setNewIncomeData(prev => ({ ...prev, categoryId: e.target.value }))}
        additionalClass="category"
        options={selectOptions}
      />
      <div className="label">Сумма:</div>
      <Input
        type="number"
        placeholder="Введите сумму"
        additionalClass="sum"
        value={newIncomeData.amount}
        onChange={(e) => setNewIncomeData(prev => ({ ...prev, amount: +e.target.value }))}
      />
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
}

export const Edit = styled(EditComponent)(() => css``)