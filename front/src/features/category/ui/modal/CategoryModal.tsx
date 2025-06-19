import { openNotificationWarning } from '@shared/lib'
import { useEffect, useState } from 'react'
import { IAddNewCategoryModalProps } from './types'
import { NewCategory } from '@entities/category'
import { Modal } from '@shared/ui/components/modal'
import { Input } from '@shared/ui/components/input'
import { ColorPicker } from '@shared/ui/components'
import { parseColorString, stringifyColorObject } from '@shared/utils'
import { Button } from 'antd'

export const CategoryModalComponent = ({
  open,
  modalInfo,
  mode,
  className,

  onCancel,
  onCreate,
  onEdit,
}: IAddNewCategoryModalProps) => {
  const [newRecord, setNewRecordData] = useState<NewCategory>({
    color: undefined,
    name: undefined,
  })

  useEffect(() => {
    setNewRecordData({
      color: modalInfo.color,
      name: modalInfo.name,
    })
  }, [modalInfo])

  return (
    <Modal open={open} onClose={onCancel} title="12">
      <div className={className}>
        <div className="label">Название</div>
        <Input
          additionalClass="name-input"
          type="text"
          placeholder="Название"
          value={newRecord.name}
          onChange={(e) =>
            setNewRecordData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <div className="footer">
          <ColorPicker
            color={parseColorString(newRecord.color)}
            onChange={(val) =>
              setNewRecordData((prev) => ({
                ...prev,
                color: stringifyColorObject(val),
              }))
            }
          />
          <Button
            type="primary"
            className="saveBtn"
            onClick={() => {
              if (newRecord.color && newRecord.name) {
                mode === 'create' && onCreate && onCreate(newRecord)
                mode === 'edit' &&
                  onEdit &&
                  onEdit({
                    ...newRecord,
                    id: modalInfo.id,
                  })
                onCancel()
              } else openNotificationWarning('Не все данные заполнены')
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
