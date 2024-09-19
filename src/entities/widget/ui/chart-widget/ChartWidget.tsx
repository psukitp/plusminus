import { useMemo, useRef } from "react"
import './ChartWidget.css'
import { useResize } from "@shared/hooks"
import { Highchart } from "@shared/lib"
import { IChartWidgetProps } from "./types"
import { Empty } from "antd"
import { Loader } from "@shared/ui"
import { Widget } from "../widget/Widget"

const HEIGHT_PADDING = 20
const TITLE_PADDING = 25 + 20
const WIDTH_PADDING = 25

export const ChartWidget = ({ options, title, isLoading, haveData }: IChartWidgetProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const size = useResize(parentRef)

  const chartOptions = useMemo(() => ({
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
  }), [options, size])

  return <Widget ref={parentRef} title={title}>
    <>
      {isLoading && <Loader />}
      {!isLoading && haveData && <Highchart options={chartOptions} />}
      {!isLoading && !haveData && <Empty description="Нет данных" />}
    </>
  </Widget >
}