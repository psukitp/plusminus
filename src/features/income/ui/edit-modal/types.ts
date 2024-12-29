import { ModalRecordInfo } from '@features/category'
import { SelectOption } from '@shared/ui'
import { Key } from 'react'

export interface IEditModalProps {
  open: boolean
  modal: ModalRecordInfo
  categoryOptions: SelectOption[]
  className?: string
  mode: 'create' | 'edit'

  onClose: () => void
  onChangeCategory: (id: Key) => void
  onChangeAmount: (value: string) => void
  onCreate: () => void
  onEdit: () => void
}
