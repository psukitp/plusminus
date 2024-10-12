import { Modal } from 'antd'
import { IDeleteModalComponentProps } from './types'

export const DeleteModalComponent = ({
  className,
  category,
  open,
  onOk,
  onClose,
}: IDeleteModalComponentProps) => {
  return (
    <Modal
      className={className}
      centered
      destroyOnClose
      open={open}
      onCancel={onClose}
      okText={'Удалить'}
      cancelText={'Оставить'}
      onOk={() => {
        onOk()
        onClose()
      }}
    >
      <div className="question">
        Ты уверен, что хочешь удалить категорию
        <strong> {category?.name} </strong>?
      </div>
      <div className="description">
        Все траты по этой категории автоматически удалятся.
      </div>
      <div className="warning">
        <strong>Это действие нельзя отменить!</strong>
      </div>
    </Modal>
  )
}
