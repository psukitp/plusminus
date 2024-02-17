import React from "react"

export interface IWidgetProps {
  children: React.ReactElement
}

export interface ISmallWidgetProps {
  title: string
  text: string
}

export interface IChartWidgetProps {
  title: string
  //TODO сделать настройки графика. Маппить внутри хука.
  text: string
}