import { useEffect, useRef, useState } from 'react'
import { RgbColorPicker } from 'react-colorful'
import { createPortal } from 'react-dom'
import { IColorPickerProps } from './types'
import { DownArrow, UpArrow } from '@shared/ui/icons/index'

export const ColorPickerComponent = ({
  className,
  color,
  onChange,
}: IColorPickerProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const rgbaString = `rgb(${color.r}, ${color.g}, ${color.b})`

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible)
  }

  const closeTooltip = (e: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node) &&
      !document.getElementById('color-tooltip')?.contains(e.target as Node)
    ) {
      setTooltipVisible(false)
    }
  }

  useEffect(() => {
    if (isTooltipVisible) {
      document.addEventListener('mousedown', closeTooltip)
    } else {
      document.removeEventListener('mousedown', closeTooltip)
    }

    return () => {
      document.removeEventListener('mousedown', closeTooltip)
    }
  }, [isTooltipVisible])

  const tooltip = (
    <div
      id="color-tooltip"
      style={{
        position: 'fixed',
        top: buttonRef.current?.getBoundingClientRect().bottom ?? 0 + 8,
        left: buttonRef.current
          ? buttonRef.current.getBoundingClientRect().left
          : 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        zIndex: 1001,
      }}
    >
      <RgbColorPicker color={color} onChange={onChange} />
    </div>
  )

  return (
    <div className={className}>
      <button className="open" ref={buttonRef} onClick={toggleTooltip}>
        <div className="color" style={{ background: rgbaString }}></div>
        <div>{isTooltipVisible ? <UpArrow /> : <DownArrow />}</div>
      </button>
      {isTooltipVisible && createPortal(tooltip, document.body)}
    </div>
  )
}
