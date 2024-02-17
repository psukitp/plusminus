import { ISmallWidgetProps, Widget } from "..";

export const SmallWidget = ({ text, title }: ISmallWidgetProps) => {
  return <Widget>
    <>
      <div className="widget-title">{title}</div>
      <div className="widget-text">{text}</div>
    </>
  </Widget>
}