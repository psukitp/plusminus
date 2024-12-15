import { useRef } from 'react'
import { Widget } from '../widget'
import { IPercentWidgetProps } from './types'

export const PercentWidgetComponent = ({ title }: IPercentWidgetProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Widget title={title} ref={ref} type="default">
      <>Скоро тут появится новый функционал</>
    </Widget>
  )
}
