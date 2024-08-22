import { useRef } from "react"
import { Widget } from ".."
import './ChartWidget.css'
import { useResize } from "@shared/hooks"
import { Highchart } from "@shared/lib"
import { IChartWidgetProps } from "../types"

const HEIGHT_PADDING = 20
const TITLE_PADDING = 25 + 20
const WIDTH_PADDING = 25

export const ChartWidget = ({ options, title }: IChartWidgetProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const size = useResize(parentRef)

  const chartOptions = {
    ...options,
    chart: {
      ...options?.chart,
      style: {
        fontFamily: 'RobotoRegular, sans-serif',
      },
      animation: true,
      width: size.width - WIDTH_PADDING * 2,
      height: size.height - HEIGHT_PADDING * 2 - TITLE_PADDING,
    },
  }

  return <>
    <Widget ref={parentRef} title={title}>
      <Highchart
        options={chartOptions} />
    </Widget >
  </>
}