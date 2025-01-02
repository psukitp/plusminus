import { useRef } from 'react'
import { Widget } from '../widget'
import { IPercentWidgetProps } from './types'

export const PercentWidgetComponent = ({
  title,
  className,
}: IPercentWidgetProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Widget title={title} ref={ref} type="default">
      <div className={className}>Coming soon...</div>
    </Widget>
  )
}
