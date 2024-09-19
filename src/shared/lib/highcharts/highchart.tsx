import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { forwardRef } from 'react'

export const Highchart = forwardRef(function highchartComponent({
  options,
  ref,
}: {
  options: Highcharts.Options
  ref: React.Ref<HighchartsReact.RefObject>
}): JSX.Element {
  return <HighchartsReact ref={ref} highcharts={Highcharts} options={options} />
})
