import { SeriesOptionsType } from "highcharts";
import { ExpensesLastMonthes } from "@components/expenses/expenses-page/types";

export const generateExpLastMonthes = (data: ExpensesLastMonthes): Highcharts.Options => {
    const xAxisCategories = data.monthes

    const chartSeries: SeriesOptionsType[] = [{
        name: "Траты",
        type: "area",
        data: data.values.map(s => s == -1 ? null : s),
        color: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 0,
            },
            stops: [
                [0, "#F57D7D"],
                [1, "#943838"]
            ]
        }
    }]

    const expLastMonthes: Highcharts.Options = {
        title: {
            text: ''
        },
        plotOptions: {
            area: {
                dataLabels: {
                    enabled: true,
                    shadow: false
                },
                animation: true,
                lineWidth: 6,
                fillColor: "transparent",
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            enabled: false,
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: xAxisCategories,
            visible: true,
            title: {
                text: ''
            },
            crosshair: false
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        credits: {
            enabled: false
        },
        series: chartSeries
    }

    return expLastMonthes
}