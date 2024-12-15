import { Button } from '@shared/ui/components/button'
import { Input } from '@shared/ui/components/input'
import { Modal } from '@shared/ui/components/modal'
import { Select } from '@shared/ui/components/select'
import { IEditModalProps } from './types'

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
      title={mode === 'create' ? 'Новая трата' : 'Редактировать'}
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
        <Input
          type="number"
          placeholder="Введите сумму"
          additionalClass="sum"
          value={modal.amount}
          onChange={(e) => onChangeAmount(e.target.value)}
        />
        <div className="footer">
          <Button
            additionClass="addBtn"
            type="primary"
            onClick={mode === 'create' ? onCreate : onEdit}
            text={mode === 'create' ? 'Добавить' : 'Сохранить'}
            textAlign="center"
          />
        </div>
      </div>
    </Modal>
  )
}
