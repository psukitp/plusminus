export type ButtonProps = {
  text?: string
  icon?: React.ReactElement
  type: 'primary' | 'secondary'
  className?: string
  additionClass?: string
  textAlign?: 'center' | 'start' | 'end'

  onClick: () => void
}
