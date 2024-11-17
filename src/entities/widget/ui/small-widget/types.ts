export interface ISmallWidgetProps {
  title: string
  text: string
  isLoading: boolean
  type: 'primary' | 'secondary' | 'outlined' | 'default'
  diff?: number
  positive?: boolean
  className?: string
}
