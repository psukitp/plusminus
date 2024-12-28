import { useEffect } from 'react'
import { IModalProps } from './types'

export const ModalComponent = ({
  children,
  title,
  className,
  open,
  onClose,
}: IModalProps) => {
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    })

    return () => {
      window.removeEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          onClose()
        }
      })
    }
  }, [])

  return (
    open && (
      <div className={className}>
        <div className="overlay" onClick={onClose}></div>
        <div className="modal">
          {title && <div className="title">{title}</div>}
          <div
            className="close"
            onClick={() => {
              onClose()
            }}
          >
            ✖
          </div>
          {children}
        </div>
      </div>
    )
  )
}
