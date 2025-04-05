import { Dates } from '@shared/lib'
import dayjs from 'dayjs'
import { ExpensesRecord } from '@entities/expense'
import { IncomesRecord } from '@entities/income'
import { EChartsOption } from 'echarts'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from '@shared/types'

export const getDates = (period: DatePeriod): Dates => {
  const endDate = dayjs()
  switch (period) {
    case DatePeriods.Week:
      return [endDate.add(-1, 'week'), endDate]
    case DatePeriods.Month:
      return [endDate.add(-1, 'month'), endDate]
    case DatePeriods.Year:
      return [endDate.add(-1, 'year'), endDate]
  }
}

export const getChartOptions = (
  data: ExpensesRecord[],
  chartType: ChartType,
) => {
  if (chartType === ChartTypes.Bar) return getBarOptions(data)
  return getPieOptions(data)
}

const getPieOptions = (
  data: ExpensesRecord[] | IncomesRecord[],
): EChartsOption => {
  const collectedData: {
    value: number
    name: string
    itemStyle: { color: string }
  }[] = []

  data.forEach((exp) => {
    if (collectedData.some((rd) => rd.name === exp.categoryName))
      collectedData.map((rd) =>
        rd.name === exp.categoryName
          ? { ...rd, value: rd.value + exp.amount }
          : rd,
      )
    else {
      collectedData.push({
        name: exp.categoryName,
        value: exp.amount,
        itemStyle: {
          color: exp.categoryColor,
        },
      })
    }
  })

  collectedData.sort((a, b) => b.value - a.value)

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
        data: collectedData,
      },
    ],
  }
}

export const getBarOptions = (expenses: ExpensesRecord[]): EChartsOption => {
  return {}
}
