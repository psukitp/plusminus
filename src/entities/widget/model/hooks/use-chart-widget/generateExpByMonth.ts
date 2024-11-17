import { ExpensesByCategoryRecord } from '@entities/expense'
import { EChartsOption } from 'echarts'

export const generateExpByCategories = (
  data: ExpensesByCategoryRecord[],
  symbol: string,
): EChartsOption => {
  const opt: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: `{c} ${symbol}`,
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '90%'],
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
        labelLine: {
          show: false,
        },
        data: data.map((el) => ({
          value: el.amount,
          color: el.color,
          name: el.categoryName,
        })),
      },
    ],
  }

  return opt
}
