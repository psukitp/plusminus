import { Modal } from '@shared/ui/components/modal'
import { IConfirmModalProps } from './types'
import { Button } from '@shared/ui/components/button'

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
          <Button
            onClick={onCancel}
            text="Отмена"
            type="secondary"
            textAlign="center"
          />
          <Button
            onClick={onOk}
            text="Удалить"
            type="primary"
            textAlign="center"
          />
        </div>
      </div>
    </Modal>
  )
}
