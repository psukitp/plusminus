import React from "react"

export interface IWidgetProps {
  children: React.ReactElement
}

export interface ISmallWidgetProps {
  title: string
  text: string
  diff: number
  positive: boolean
}

export interface IChartWidgetProps {
  title: string
  options: Highcharts.Options
  text: string
}