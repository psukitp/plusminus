import { useRef } from 'react'
import './ChartWidget.css'
import { IChartWidgetProps } from './types'
import { Empty } from 'antd'
import { Loader } from '@shared/ui'
import { Widget } from '../widget/Widget'
import { EchartsReact } from '@shared/lib/echarts/Echarts-react'

export const ChartWidget = ({
  options,
  title,
  isLoading,
  haveData,
}: IChartWidgetProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const chartOptions = options

  return (
    <Widget ref={parentRef} title={title}>
      <>
        {isLoading && <Loader />}
        {!isLoading && haveData && <EchartsReact options={chartOptions} />}
        {!isLoading && !haveData && <Empty description="Нет данных" />}
      </>
    </Widget>
  )
}
