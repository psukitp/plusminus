import { ICategoryItemProps } from './types'
import { Edit, Delete } from '@shared/ui/icons'

export const CategoryItemComponent = ({
  label,
  color,
  className,
  onDelete,
  onEdit,
}: ICategoryItemProps) => {
  return (
    <div className={className}>
      <div className="title">
        {color && <div className="color"></div>}
        <div className="label">{label}</div>
      </div>
      <div className="actions">
        <button onClick={onEdit} className="edit">
          <Edit />
        </button>
        <button onClick={onDelete} className="delete">
          <Delete />
        </button>
      </div>
    </div>
  )
}
