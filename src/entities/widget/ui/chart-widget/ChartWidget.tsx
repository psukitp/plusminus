import { useRef } from 'react'
import './ChartWidget.css'
import { IChartWidgetProps } from './types'
import { Empty } from 'antd'
import { Loader } from '@shared/ui'
import { EchartsReact } from '@shared/lib/echarts/Echarts-react'
import { Widget } from '../widget'

export const ChartWidget = ({
  options,
  title,
  isLoading,
  haveData,
  customFooter,
}: IChartWidgetProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Widget
      ref={parentRef}
      title={title}
      type="default"
      customFooter={customFooter}
    >
      <>
        {isLoading && <Loader />}
        {!isLoading && haveData && (
          <EchartsReact
            options={options}
            style={customFooter ? { height: 'calc(100% - 230px)' } : {}}
          />
        )}
        {!isLoading && !haveData && <Empty description="Нет данных" />}
      </>
    </Widget>
  )
}
