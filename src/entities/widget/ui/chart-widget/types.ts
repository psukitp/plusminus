import { EChartsOption } from 'echarts'
import { ReactElement } from 'react'

export interface IChartWidgetProps {
  title: string
  options: EChartsOption
  isLoading: boolean
  haveData: boolean
  customFooter?: ReactElement
}
