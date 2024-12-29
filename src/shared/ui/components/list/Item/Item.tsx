import { Delete, DownArrow, Edit, UpArrow } from '@shared/ui/icons'
import { useEffect, useRef, useState } from 'react'
import { IItemProps } from './types'

export const ItemComponent = ({
  title,
  value,
  suffix,
  className,

  onEdit,
  onDelete,
}: IItemProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.addEventListener('toggle', (event: Event) => {
      if ((event as unknown as { newState: string }).newState === 'open')
        setOpen(true)
      else setOpen(false)
    })

    return () => {
      ref.current?.removeEventListener('toggle', (event: Event) => {
        if ((event as unknown as { newState: string }).newState === 'open')
          setOpen(true)
        else setOpen(false)
      })
    }
  }, [])

  return (
    <details className={`${className} ${open ? 'open' : ''}`} ref={ref}>
      <summary>
        <span className="title">{title}</span>
        <div className="right-side">
          <span>{`${value} ${suffix}`}</span>
          {onEdit && (
            <button
              onClick={(e) => {
                e.preventDefault()
                onEdit()
              }}
            >
              <Edit />
            </button>
          )}
          <span>{open ? <DownArrow /> : <UpArrow />}</span>
        </div>
      </summary>

      <p className="comment">
        <span>Тут скоро можно будет оставить комментарий</span>
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onDelete()
            }}
          >
            <Delete />
          </button>
        )}
      </p>
    </details>
  )
}
