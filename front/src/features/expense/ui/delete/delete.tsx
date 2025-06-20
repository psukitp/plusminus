import { Modal } from '@shared/ui'
import { Button } from 'antd'
import { Key } from 'react'
import styled, { css } from 'styled-components'

interface IDeleteProps {
  className?: string
  id: Key | null
  onDelete: (id: Key) => void
  onClose: () => void
}

const DeleteComponent = ({
  className,
  id,
  onClose,
  onDelete,
}: IDeleteProps) => {
  return (
    <Modal open={!!id} onClose={onClose} title="Удалить">
      <div className={className}>
        <div className="text">Это действие нельзя отменить, вы уверены?</div>
        <div className="footer">
          <Button onClick={onClose} type="default">
            Отмена
          </Button>
          <Button
            onClick={() => {
              onDelete(id!)
              onClose()
            }}
            type="primary"
          >
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const Delete = styled(DeleteComponent)(
  () => css`
    .footer {
      display: flex;
      justify-content: space-between;
    }
  `,
)
