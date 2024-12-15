import { useEffect, useRef } from 'react'
import { IModalProps } from './types'

export const ModalComponent = ({
  children,
  title,
  className,
  open,
  onClose,
}: IModalProps) => {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose()
        ref.current?.close()
      }
    })

    return () => {
      window.removeEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          onClose()
          ref.current?.close()
        }
      })
    }
  }, [])

  useEffect(() => {
    const modal = ref.current
    if (!modal) return

    if (open) {
      modal.showModal()
    } else {
      onClose()
      modal.close()
    }
  }, [open])

  return (
    open && (
      <dialog ref={ref} className={className}>
        {title && <div className="title">{title}</div>}
        <div
          className="close"
          onClick={() => {
            onClose()
            ref.current?.close()
          }}
        >
          ✖
        </div>
        {children}
      </dialog>
    )
  )
}
