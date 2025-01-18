import { ActiveCaption } from '@shared/ui/sider/types'

export interface IMenuProps {
  activeCaption: ActiveCaption
  className?: string

  setActiveButton: (value: Partial<ActiveCaption>) => void
}
