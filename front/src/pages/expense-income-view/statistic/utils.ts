import { Dates } from '@shared/lib'
import dayjs from 'dayjs'
import { ExpensesRecord } from '@entities/expense'
import { IncomesRecord } from '@entities/income'
import { EChartsOption } from 'echarts'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from '@shared/types'
import { dayMonthDot } from '@shared/constants/dayjs'

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
  data: ExpensesRecord[] | IncomesRecord[],
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
      formatter: '{b}: {d}%',
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

export const getBarOptions = (
  data: ExpensesRecord[] | IncomesRecord[],
): EChartsOption => {
  const dateMap = new Map<string, number>()

  for (const item of data) {
    const date = new Date(item.date).toISOString().slice(0, 10) 
    dateMap.set(date, (dateMap.get(date) || 0) + item.amount)
  }

  const dates = Array.from(dateMap.keys()).sort()
  const values = dates.map((date) => dateMap.get(date)!)

  return {
    title: {
      text: 'Расходы по датам',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    xAxis: {
      type: 'category',
      data: dates.map((d) => dayjs(d).format(dayMonthDot)),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: values,
        label: {
          show: true,
          position: 'top',
        },
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
  }
}
