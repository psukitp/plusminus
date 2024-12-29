import { ExpensesByCategoryRecord } from '@entities/expense'
import { EChartsOption } from 'echarts'

export const generateExpByCategories = (
  data: ExpensesByCategoryRecord[],
  symbol: string,
): EChartsOption => {
  const sortedData = data.sort((a, b) => b.amount - a.amount)
  const opt: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: `<strong>{b}</strong> <br/> {c}${symbol} ({d}%)`,
    },
    series: [
      {
        label: {
          show: false,
        },
        type: 'pie',
        radius: ['65%', '90%'],
        labelLine: {
          show: false,
        },
        colorBy: 'data',
        data: sortedData.map((el) => ({
          value: el.amount,
          name: el.categoryName,
          itemStyle: {
            color: el.color,
          },
        })),
      },
    ],
  }

  return opt
}
