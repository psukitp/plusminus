import { useChartWidget } from "@hooks/use-chart-widget/useChartWidget";
import { useSmallWidgetData } from "@hooks/use-small-widget";
import { ChartWidget, SmallWidget } from "../widgets";
import './ReviewPage.less';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ReviewPage = () => {
  const [expenses, incomes, remainingSum] = useSmallWidgetData()
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget()
  const layout = {
    lg: [
      { i: "exp-by-month", x: 0, y: 0, w: 3, h: 1 },
      { i: "inc-by-month", x: 3, y: 0, w: 3, h: 1 },
      { i: "remainder", x: 6, y: 0, w: 3, h: 1 },
      { i: "forecast", x: 9, y: 0, w: 3, h: 1 },
      { i: "exp-by-category", x: 0, y: 1, w: 6, h: 2.2 },
      { i: "exp-dynamic", x: 6, y: 1, w: 6, h: 2.2 },
      { i: "inc-dynamic", x: 0, y: 1.2, w: 12, h: 2.75 }
    ]
  }

  return (
    <div className="review">
      <ResponsiveGridLayout
        className='layout'
        layouts={layout}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={150}
        isDraggable={false}
        width={1200}>
        <div key="exp-by-month">
          <SmallWidget
            title='Расход за месяц'
            text={`${expenses.expensesTotal} ₽`}
            diff={expenses.expensesDiff}
            positive={expenses.expensesDiff < 0} />
        </div>
        <div key="inc-by-month">
          <SmallWidget
            title='Доход за месяц'
            text={`${incomes.incomesTotal} ₽`}
            diff={incomes.incomesDiff}
            positive={incomes.incomesDiff > 0} />

        </div>
        <div key="remainder">
          <SmallWidget
            title='Остаток от дохода'
            text={`${remainingSum.remainingTotal} ₽`}
            diff={remainingSum.remainingDiff}
            positive={remainingSum.remainingDiff > 0} />
        </div>
        <div key="forecast">
          <SmallWidget
            title='Прогноз расходов'
            text='coming soon' />
        </div>
        <div key="exp-by-category">
          <ChartWidget
            options={expByMonth}
            title='Расходы по категориями'
            text='Тут будет график' />
        </div>
        <div key="exp-dynamic">
          <ChartWidget
            options={expLastMonthes}
            title='Расходы за N месяцев'
            text='Тут будет график' />
        </div>
        <div key="inc-dynamic">
          <ChartWidget
            options={incLastMonthes}
            title='Доходы за N месяцев'
            text='Тут будет график' />
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}