import { Button } from 'antd'
import { IConfirmModalProps } from './types'
import { Modal } from '@shared/ui'

export const ConfirmModalComponent = ({
  open,
  className,

  onOk,
  onCancel,
  onClose,
}: IConfirmModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={className}>
        <div className="text">Это действие нельзя отменить, вы уверены?</div>
        <div className="footer">
          <Button onClick={onCancel} type="default">
            Отмена
          </Button>
          <Button onClick={onOk} type="primary">
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
