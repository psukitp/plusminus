import { Modal } from '@shared/ui/components/modal'
import { Select } from '@shared/ui/components/select'
import { IEditModalProps } from './types'
import { Button, InputNumber } from 'antd'

export const EditModalComponent = ({
  open,
  modal,
  categoryOptions,
  className,
  mode,

  onChangeAmount,
  onChangeCategory,
  onClose,
  onCreate,
  onEdit,
}: IEditModalProps) => {
  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Новый доход' : 'Редактировать'}
      onClose={onClose}
    >
      <div className={className}>
        <div className="label">Категория:</div>
        <Select
          placeholder="Выберите категорию"
          value={modal.categoryId}
          onChange={(e) => onChangeCategory(e.target.value)}
          additionalClass="category"
          options={categoryOptions}
        />
        <div className="label">Сумма:</div>
        <InputNumber
          type="number"
          placeholder="Введите сумму"
          className="sum"
          value={modal.amount}
          onChange={(e) => onChangeAmount(e?.toString() ?? '')}
        />
        <div className="footer">
          <Button
            className="addBtn"
            type="primary"
            onClick={mode === 'create' ? onCreate : onEdit}
          >
            {mode === 'create' ? 'Добавить' : 'Сохранить'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
