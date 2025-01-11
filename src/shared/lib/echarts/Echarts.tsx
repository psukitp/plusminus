import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { init, dispose, EChartsType } from 'echarts/core'
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { useCallback, useEffect, useRef } from 'react'

import { useResizeCallback } from '@shared/hooks'

import { IEchartsReactProps } from './types'

echarts.use([
  LineChart,
  PieChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

export const Echarts = (props: IEchartsReactProps): JSX.Element => {
  const { className } = props
  const { chartsRef, renderer = 'canvas', style } = props

  const localChartsRef = useRef<EChartsType>()

  const refCallback = useCallback(
    (element: HTMLDivElement) => {
      if (element != null) {
        const charts = init(element, null, { renderer })

        //@ts-ignore
        if (typeof chartsRef === 'function') chartsRef(charts)
        //@ts-ignore
        else if (chartsRef != undefined) chartsRef.current = charts
        localChartsRef.current = charts
      } else {
        if (typeof chartsRef === 'function') chartsRef(null)
        //@ts-ignore
        else if (chartsRef != undefined) chartsRef.current = null

        const charts = localChartsRef.current
        if (charts != undefined) dispose(charts)
        localChartsRef.current = undefined
      }
    },
    [chartsRef, renderer],
  )

  const [wrappedRefCallback, { width, height }] = useResizeCallback({
    ref: refCallback,
  })
  useEffect(() => localChartsRef.current?.resize(), [width, height])

  return (
    <div
      ref={wrappedRefCallback}
      className={`echarts-react ${className}`}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        ...style,
      }}
    />
  )
}
