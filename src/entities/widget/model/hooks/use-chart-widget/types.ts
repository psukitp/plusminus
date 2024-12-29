import { ExpensesByCategoryRecord } from '@entities/expense'
import { EChartsOption } from 'echarts'

export type UseChartWidgetResult = [
  {
    options: EChartsOption
    loading: boolean
  },
  {
    options: EChartsOption
    loading: boolean
  },
  ExpensesByCategoryRecord[],
]
