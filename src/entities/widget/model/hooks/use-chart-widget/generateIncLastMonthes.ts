import { SeriesOptionsType } from "highcharts";
import { IncomesLastMonthes } from "@entities/income";

export const generateIncLastMonthes = (data: IncomesLastMonthes): Highcharts.Options => {
    const xAxisCategories = data.monthes

    const chartSeries: SeriesOptionsType[] = [{
        name: "Доходы",
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
                [0, "#92C9FC"],
                [1, "#0F518D"]
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
                },
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