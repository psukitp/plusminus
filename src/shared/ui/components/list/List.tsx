import { IListProps } from './types'
import { Loader } from '../../loader'
import { Fragment, useMemo } from 'react'
import { Item } from './Item'

export const ListComponent = ({
  records,
  className,
  loading,
  sort = null,

  sortFunc,
  onEdit,
  onDelete,
}: IListProps) => {
  const sortedRecords = useMemo(() => {
    if (sortFunc) return records.sort(sortFunc)
    if (!sort) return records
    return records.sort((a, b) =>
      sort === 'asc'
        ? a.group.localeCompare(b.group)
        : b.group.localeCompare(a.group),
    )
  }, [records, sort, sortFunc])

  if (loading) return <Loader />
  if (!records || records.length < 1)
    return (
      <div className={className}>
        <div className="empty">Данных не нашлось {':('}</div>
      </div>
    )

  return (
    <div className={className}>
      {sortedRecords.map((r) => (
        <Fragment key={r.group}>
          <div className="group">{r.group}</div>
          {r.data.map((el) => (
            <Item
              key={el.key}
              title={el.title}
              color={el.color}
              value={el.value}
              suffix={el.suffix}
              onEdit={() => onEdit?.(el)}
              onDelete={() => onDelete?.(el.key)}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
