import { Modal } from '@shared/ui/components/modal'
import { IConfirmModalProps } from './types'
import { Button } from 'antd'

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
