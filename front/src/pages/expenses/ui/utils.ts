import { ExpensesLastWeek } from '@entities/expense/model/types'
import { ModalRecordInfo } from '@features/category'
import dayjs from 'dayjs'
import { EChartsOption } from 'echarts'

export const initialModal: ModalRecordInfo = {
  amount: null,
  categoryId: null,
  id: null,
}

export const generateChartOptions = (
  expensesLastWeek: ExpensesLastWeek,
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
      data: expensesLastWeek.days.map((d) => dayjs(d).format('DD.MM')),
    },
    series: {
      type: 'bar',
      data: expensesLastWeek.values,
      color: '#9C90FC',
      itemStyle: {
        borderRadius: [8, 8, 0, 0],
      },
    },
  }
}
