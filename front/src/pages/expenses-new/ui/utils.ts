import { ExpensesRecord } from '@entities/expense'
import { RecordType } from '@shared/ui'
import dayjs from 'dayjs'
import { EChartsOption } from 'echarts'
import { Key } from 'react'

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

export const getBarOptions = (expenses: ExpensesRecord[]): EChartsOption => {
  // Преобразуем даты в формат dd.mm и сортируем их
  const uniqueDates = Array.from(
    new Set(expenses.map((item) => dayjs(item.date))),
  ).sort()

  const formattedDates = uniqueDates.map((date) => date.format('DD.MM.YYY'))

  // Группируем данные по категориям
  const categoryMap = new Map<
    Key,
    { name: string; color: string; values: number[] }
  >()

  uniqueDates.forEach((date, index) => {
    expenses
      .filter((item) => dayjs(item.date).isBefore(dayjs(date))) // Накопление по датам
      .forEach(({ categoryId, categoryName, categoryColor, amount }) => {
        if (!categoryMap.has(categoryId)) {
          categoryMap.set(categoryId, {
            name: categoryName,
            color: categoryColor,
            values: new Array(uniqueDates.length).fill(0),
          })
        }
        const category = categoryMap.get(categoryId)!
        category.values[index] += amount
      })
  })

  // Формируем серии данных для ECharts
  const series = Array.from(categoryMap.values()).map((category) => ({
    name: category.name,
    type: 'bar',
    stack: 'total',
    itemStyle: { color: category.color },
    emphasis: { focus: 'series' },
    data: category.values,
  }))

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: Array.from(categoryMap.values()).map((c) => c.name),
    },
    xAxis: {
      type: 'category',
      data: formattedDates,
    },
    yAxis: { type: 'value' },
    series,
  } as EChartsOption
}
