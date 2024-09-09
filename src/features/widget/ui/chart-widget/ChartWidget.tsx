import { useEffect, useRef, useState } from "react"
import { Widget } from ".."
import './ChartWidget.css'
import { useResize } from "@shared/hooks"
import { Highchart } from "@shared/lib"
import { IChartWidgetProps } from "../types"
import { Empty } from "antd"
import { Loader } from "@shared/ui"

const HEIGHT_PADDING = 20
const TITLE_PADDING = 25 + 20
const WIDTH_PADDING = 25

export const ChartWidget = ({ options, title, isLoading }: IChartWidgetProps) => {
  const [isDataReady, setIsDataReady] = useState<boolean>(false)
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

  useEffect(() => {
    if (!isLoading && chartOptions?.series?.every(s => (s as any).data.length)) {
      setIsDataReady(true)
    } else {
      setIsDataReady(false)
    }
  }, [isLoading, chartOptions])


  return <Widget ref={parentRef} title={title}>
    <>
      {isLoading && <Loader />}
      {!isLoading && isDataReady && <Highchart options={chartOptions} />}
      {!isLoading && !isDataReady && <Empty description="Нет данных" />}
    </>
  </Widget >

}