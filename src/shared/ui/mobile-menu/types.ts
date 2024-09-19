import { ActiveCaption } from '../sider/types'

export interface IMenuProps {
  activeCaption: ActiveCaption
  setActiveButton: (value: Partial<ActiveCaption>) => void
}
