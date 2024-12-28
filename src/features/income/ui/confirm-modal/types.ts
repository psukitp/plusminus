export interface IConfirmModalProps {
  open: boolean
  className?: string

  onOk: () => void
  onCancel: () => void
  onClose: () => void
}
