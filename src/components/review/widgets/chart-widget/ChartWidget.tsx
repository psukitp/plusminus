import { useRef } from "react"
import { IChartWidgetProps, Widget } from ".."
import { Highchart } from "@common/highchart"
import './ChartWidget.less'
import { useResize } from "@hooks/use-resize/useResize"

const HEIGHT_PADDING = 20
const WIDTH_PADDING = 25

export const ChartWidget = ({ options }: IChartWidgetProps) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const size = useResize(parentRef)



  return <Widget ref={parentRef}>
    <>
      <Highchart
        options={{
          chart: {
            style: {
              fontFamily: 'RobotoRegular, sans-serif'
            },
            animation: true,
            width: size.width - WIDTH_PADDING * 2,
            height: size.height - HEIGHT_PADDING * 2,
          },
          ...options
        }} />
    </>
  </Widget>
}