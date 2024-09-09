import React from "react"

export interface IWidgetProps {
  title: string
  children: React.ReactElement
}

export interface ISmallWidgetProps {
  title: string
  text: string
  isLoading: boolean
  diff?: number
  positive?: boolean
}

export interface IChartWidgetProps {
  title: string
  options: Highcharts.Options
  isLoading: boolean
  text: string
}