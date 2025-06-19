export const ChartTypes = {
  Pie: 'pie',
  Bar: 'bar',
}

export type ChartType = (typeof ChartTypes)[keyof typeof ChartTypes]
