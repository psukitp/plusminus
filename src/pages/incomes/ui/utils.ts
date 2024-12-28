import { IncomesByPeriod } from '@entities/income/model/types'
import { ModalRecordInfo } from '@features/category'
import dayjs from 'dayjs'
import { EChartsOption } from 'echarts'

export const initialModal: ModalRecordInfo = {
  amount: null,
  categoryId: null,
  id: null,
}

export const generateChartOptions = (
  incomes: IncomesByPeriod,
): EChartsOption => {
  return {
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
    },
    xAxis: {
      type: 'category',
      data: incomes.days.map((d) => dayjs(d).format('DD.MM')),
    },
    series: {
      type: 'bar',
      data: incomes.values,
      color: '#9C90FC',
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  }
}
