import { EChartsOption } from 'echarts/types/dist/echarts'
import { useEffect, useRef } from 'react'

import { Echarts } from './Echarts'

export const EchartsReact = ({
  options,
}: {
  options: EChartsOption
}): JSX.Element => {
  const chartRef = useRef(null)

  console.log(options)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current

      // Устанавливаем опции для графика
      //@ts-ignore
      chart.setOption(options, true)
    }
  }, [options])

  return <Echarts chartsRef={chartRef} className="chart" />
}
