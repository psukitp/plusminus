import { ExpensesLastMonthes } from '@entities/expense'
import { IncomesLastMonthes } from '@entities/income/model'
import { EChartsOption } from 'echarts'

export const generateLastMonthes = (
  data: ExpensesLastMonthes,
  data1: IncomesLastMonthes,
): EChartsOption => {
  const xAxisCategories = data.monthes

  const options: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: xAxisCategories,
    },
    legend: {
      bottom: '0',
      left: 'center',
      orient: 'horizontal',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Траты',
        type: 'line',
        color: '#9C90FC',
        symbol: 'none',
        data: data.values.map((s) => (s == -1 ? null : s)),
        lineStyle: {
          width: 1.5,
        },
        zlevel: 3,
      },
      {
        name: 'Доходы',
        type: 'line',
        color: '#E05A29',
        symbol: 'none',
        data: data1.values.map((s) => (s == -1 ? null : s)),
        lineStyle: {
          width: 1.5,
        },
        zlevel: 2,
      },
    ],
  }

  return options
}
