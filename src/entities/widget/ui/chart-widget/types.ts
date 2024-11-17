import { EChartsOption } from 'echarts'

export interface IChartWidgetProps {
  title: string
  options: EChartsOption
  isLoading: boolean
  haveData: boolean
}
