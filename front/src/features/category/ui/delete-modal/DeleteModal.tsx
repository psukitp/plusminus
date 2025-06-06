import { Modal } from '@shared/ui/components/modal'
import { IDeleteModalComponentProps } from './types'
import { Button } from 'antd'

export const DeleteModalComponent = ({
  className,
  category,
  open,
  onOk,
  onClose,
}: IDeleteModalComponentProps) => {
  return (
    <Modal className={className} open={open} onClose={onClose}>
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
      <div className="footer">
        <Button type="default" onClick={onClose}>
          Оставить
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onOk()
            onClose()
          }}
        >
          Удалить
        </Button>
      </div>
    </Modal>
  )
}
