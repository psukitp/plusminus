import { RgbColor } from 'react-colorful'

export const parseColorString = (
  colorString: string | null | undefined,
): RgbColor => {
  if (!colorString) return { r: 255, g: 0, b: 0 }
  const clearColor = colorString.replace(/^rgb\((.*)\)$/, '($1)')
  const [r, g, b] = clearColor.slice(1, -1).split(', ').map(Number)

  return { r, g, b }
}

export const stringifyColorObject = (colorObject: RgbColor): string => {
  const { r, g, b } = colorObject
  return `rgb(${r}, ${g}, ${b})`
}
