import { ExpensesByCategoryRecord } from '@entities/expense'
import { EChartsOption } from 'echarts'

export const generateExpByMonth = (
  data: ExpensesByCategoryRecord[],
  symbol: string,
): EChartsOption => {
  const opt: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      left: '5%',
      top: 'center',
      orient: 'vertical',
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          show: false,
          position: 'center',
        },
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'bold',
          },
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

  // const chartSeries: SeriesOptionsType[] = data.map((el) => ({
  //   type: 'pie',
  //   name: el.categoryName,
  //   y: el.amount,
  //   color: el.color,
  // }))

  // const expByMonth: Highcharts.Options = {
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false,
  //     borderRadius: 10,
  //   },
  //   title: {
  //     text: '',
  //   },
  //   tooltip: {
  //     headerFormat: '',
  //     pointFormat: `{point.name}: <b>{point.y} ${symbol}</b>`,
  //   },
  //   legend: {
  //     enabled: true,
  //     align: 'left',
  //     verticalAlign: 'top',
  //     layout: 'vertical',
  //   },
  //   plotOptions: {
  //     pie: {
  //       innerSize: '70%',
  //       allowPointSelect: true,
  //       cursor: 'pointer',
  //       showInLegend: true,
  //       dataLabels: {
  //         enabled: false,
  //       },
  //     },
  //   },
  //   credits: {
  //     enabled: false,
  //   },
  //   series: [
  //     {
  //       name: 'Категории',
  //       type: 'pie',
  //       data: chartSeries.map((s) => ({
  //         name: s.name,
  //         y: (s as any).y,
  //         color: (s as any).color,
  //       })),
  //     },
  //   ],
  // }

  return opt
}
