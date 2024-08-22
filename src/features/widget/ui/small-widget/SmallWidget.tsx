import { Flex, Tooltip } from "antd";
import { Widget } from "..";
import PositiveDiff from '@features/review/lib/svgs/positive_diff.svg'
import NegativeDiff from '@features/review/lib/svgs/equal_diff.svg'
import EqualDiff from '@features/review/lib/svgs/equal_diff.svg'
import { useMemo } from "react";
import { WidgetText } from "./SmallWidget-styled";
import { ISmallWidgetProps } from "../types";

export const SmallWidget = ({ text, title, diff, positive }: ISmallWidgetProps) => {

  const Marker = useMemo(() => {
    if (!diff)
      return <></>
    if (positive && diff > 0)
      return <Tooltip title={`Больше на ${diff}, чем в прошлом месяце`} color="#75B246"><PositiveDiff /></Tooltip>
    if (positive && diff < 0)
      return <Tooltip title={`Меньше на  ${Math.abs(diff)}, чем в прошлом месяце`} color="#75B246"><PositiveDiff /></Tooltip>
    if (!positive && diff > 0)
      return <Tooltip title={`Больше на ${diff}, чем в прошлом месяце`} color="#A80E0E"><NegativeDiff /></Tooltip>
    if (!positive && diff < 0)
      return <Tooltip title={`Меньше на ${Math.abs(diff)}, чем в прошлом месяце`} color="#A80E0E"><NegativeDiff /></Tooltip>
    if (diff === 0)
      return <Tooltip title={`Сумма не отличается от суммы в прошлом месяце`} color="#666666"><EqualDiff /></Tooltip>
  }, [diff, positive])

  return <Widget title={title}>
    <Flex align="center">
      <WidgetText>{text}</WidgetText>
      {Marker}
    </Flex>
  </Widget>
}