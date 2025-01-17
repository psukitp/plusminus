import { IConfirmModalProps } from './types'
import { Button, Modal } from '@shared/ui'

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
          <Button onClick={onCancel} type="secondary" textAlign="center">
            Отмена
          </Button>
          <Button onClick={onOk} type="primary" textAlign="center">
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
