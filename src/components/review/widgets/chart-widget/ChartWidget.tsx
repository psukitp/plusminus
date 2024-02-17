import { IChartWidgetProps, Widget } from ".."

export const ChartWidget = ({ text, title }: IChartWidgetProps) => {
  return <Widget>
    <>
      <div className="widget-title">{title}</div>
      <div className="widget-text">{text}</div>
    </>
  </Widget>
}