import { ExpensesLastMonthes } from '@entities/expense'
import { IncomesLastMonthes } from '@entities/income'
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
        smooth: true,
        color: 'red',
        data: data.values.map((s) => (s == -1 ? null : s)),
        lineStyle: {
          width: 5,
        },
      },
      {
        name: 'Доходы',
        type: 'line',
        smooth: true,
        color: 'green',
        data: data1.values.map((s) => (s == -1 ? null : s)),
        lineStyle: {
          width: 5,
        },
      },
    ],
  }

  return options
}
