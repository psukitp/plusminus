import { EChartsOption } from 'echarts/types/dist/echarts'
import { CSSProperties, useEffect, useRef } from 'react'

import { Echarts } from './Echarts'

export const EchartsReact = ({
  options,
  style,
}: {
  options: EChartsOption
  style?: CSSProperties
}): JSX.Element => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current

      // Устанавливаем опции для графика
      //@ts-ignore
      chart.setOption(options, true)
    }
  }, [options])

  return <Echarts chartsRef={chartRef} className="chart" style={style} />
}
