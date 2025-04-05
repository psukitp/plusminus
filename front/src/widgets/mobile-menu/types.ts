import { ActiveCaption } from '@shared/ui/sider'

export interface IMenuProps {
  activeCaption: ActiveCaption
  className?: string

  setActiveButton: (value: Partial<ActiveCaption>) => void
}
