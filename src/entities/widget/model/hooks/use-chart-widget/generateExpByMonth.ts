import { SeriesOptionsType } from 'highcharts'
import { ExpensesByCategoryRecord } from '@entities/expense'

export const generateExpByMonth = (
  data: ExpensesByCategoryRecord[],
  symbol: string,
): Highcharts.Options => {
  const chartSeries: SeriesOptionsType[] = data.map((el) => ({
    type: 'pie',
    name: el.categoryName,
    y: el.amount,
    color: el.color,
  }))

  const expByMonth: Highcharts.Options = {
    chart: {
      type: 'pie',
      plotShadow: false,
      borderRadius: 10,
    },
    title: {
      text: '',
    },
    tooltip: {
      headerFormat: '',
      pointFormat: `{point.name}: <b>{point.y} ${symbol}</b>`,
    },
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'top',
      layout: 'vertical',
    },
    plotOptions: {
      pie: {
        innerSize: '70%',
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Категории',
        type: 'pie',
        data: chartSeries.map((s) => ({
          name: s.name,
          y: (s as any).y,
          color: (s as any).color,
        })),
      },
    ],
  }

  return expByMonth
}
