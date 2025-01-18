import { ActiveCaption } from '@shared/ui'

export interface IAddRecordButtonProps {
  className?: string
  onAdd: (value: Partial<ActiveCaption>) => void
}
