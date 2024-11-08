import type { EChartsCoreOption } from 'echarts/core'
import { RendererType } from 'echarts/types/src/util/types.js'
import React from 'react'

export interface IEchartsReactProps {
  className?: string
  style?: React.CSSProperties

  chartsRef?: React.Ref<EChartsCoreOption>
  renderer?: RendererType
}
