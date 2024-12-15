export type ButtonProps = {
  text?: string
  icon?: React.ReactElement
  type: 'primary' | 'secondary' | 'ghost'
  className?: string
  additionClass?: string
  textAlign?: 'center' | 'start' | 'end'

  onClick: () => void
}
