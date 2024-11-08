import { useRef } from 'react'
import { Widget } from '../widget'
import { IPercentWidgetProps } from './types'

export const PercentWidgetComponent = ({ title }: IPercentWidgetProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  return (
    <Widget title={title} ref={ref}>
      <>
        <div>
          Топ 1 ----------------------------------------------------------- 50%
        </div>
        <div>Топ 2 ------------------------ 30%</div>
        <div>Топ 3 ------------------- 20%</div>
        <div>Топ 4 --------------- 10%</div>
        <div>Топ 5 ------- 5%</div>
      </>
    </Widget>
  )
}
