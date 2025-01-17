import { RgbColor } from 'react-colorful'

export interface IColorPickerProps {
  color: RgbColor
  className?: string

  onChange: (color: RgbColor) => void
}
