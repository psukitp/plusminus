import { SeriesOptionsType } from "highcharts";
import { ExpensesByCategoryRecord } from "@components/expenses/expenses-page/types";

export const generateExpByMonth = (data: ExpensesByCategoryRecord[]): Highcharts.Options => {
    const xAxisCategories: string[] = data.
        sort((a, b) => a.amount - b.amount)
        .map(el => el.categoryName)

    const chartSeries: SeriesOptionsType[] = data
        .sort((a, b) => b.amount - a.amount)
        .map(el => ({
            type: 'column',
            name: el.categoryName,
            data: [el.amount],
            color: el.color
        }))

    const expByMoth: Highcharts.Options = {
        title: {
            text: ''
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            column: {
                borderRadius: 15,
                dataLabels: {
                    enabled: true,
                }
            }
        },
        xAxis: {
            categories: xAxisCategories,
            visible: false,
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

    return expByMoth
}