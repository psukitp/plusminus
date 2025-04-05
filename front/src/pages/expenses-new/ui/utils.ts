import { ExpensesRecord } from '@entities/expense'
import { RecordType } from '@shared/ui'
import dayjs from 'dayjs'
import { EChartsOption } from 'echarts'
import { Key } from 'react'
import { ChartType, ChartTypes } from './types'

export const getListRecords = (expenses: ExpensesRecord[]) => {
  return Object.values(
    expenses.reduce<{ [key: string]: RecordType }>((acc, item) => {
      const { date } = item
      const index = dayjs(date).format('DD.MM')
      if (!acc[index]) {
        acc[index] = { group: index, data: [] }
      }
      const {
        amount,
        categoryColor: color,
        categoryName: title,
        id: key,
      } = item
      acc[index].data.push({
        title,
        color,
        value: `- ${amount}`,
        suffix: 'Р',
        key,
      })
      return acc
    }, {}),
  )
}

export const sortByDates = (a: RecordType, b: RecordType) => {
  const [aDay, aMonth] = a.group.split('.')
  const [bDay, bMonth] = b.group.split('.')

  const aDate = dayjs().set('date', +aDay).set('month', +aMonth)
  const bDate = dayjs().set('date', +bDay).set('month', +bMonth)
  return aDate.isAfter(bDate) ? -1 : 1
}

export const getChartOptions = (
  expenses: ExpensesRecord[],
  chartType: ChartType,
) => {
  if (chartType === ChartTypes.Bar) return getBarOptions(expenses)
  return getPieOptions(expenses)
}

const getPieOptions = (expenses: ExpensesRecord[]): EChartsOption => {
  const data: { value: number; name: string; itemStyle: { color: string } }[] =
    []

  expenses.forEach((exp) => {
    if (data.some((rd) => rd.name === exp.categoryName))
      data.map((rd) =>
        rd.name === exp.categoryName
          ? { ...rd, value: rd.value + exp.amount }
          : rd,
      )
    else {
      data.push({
        name: exp.categoryName,
        value: exp.amount,
        itemStyle: {
          color: exp.categoryColor,
        },
      })
    }
  })

  data.sort((a, b) => b.value - a.value)

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} {d}%',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  }
}

export const getBarOptions = (expenses: ExpensesRecord[]): EChartsOption => {
  return {}
}
