import { useChartWidget } from "@hooks";
import { useSmallWidgetData } from "@hooks";
import { ChartWidget, SmallWidget } from "../widgets";
import './ReviewPage.less';
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const ReviewPage = () => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData()
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget()
  const layout = {
    lg: [
      { i: "exp-by-month", x: 0, y: 0, w: 2.4, h: 1 },
      { i: "inc-by-month", x: 2.4, y: 0, w: 2.4, h: 1 },
      { i: "moth-diff", x: 4.8, y: 0, w: 2.4, h: 1 },
      { i: "total-diff", x: 7.2, y: 0, w: 2.4, h: 1 },
      { i: "capital", x: 9.6, y: 0, w: 2.4, h: 1 },
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
        <div key="moth-diff">
          <SmallWidget
            title='Остаток, месяц'
            text={`${remainingSum.remainingTotal} ₽`}
            diff={remainingSum.remainingDiff}
            positive={remainingSum.remainingDiff > 0} />
        </div>
        <div key="total-diff">
          <SmallWidget
            title='Остаток, все время'
            text={`${diffTotal} ₽`} />
        </div>
        <div key="capital">
          <SmallWidget
            title='Накопления (прогресс)'
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
            title='Расходы с начала года'
            text='Тут будет график' />
        </div>
        <div key="inc-dynamic">
          <ChartWidget
            options={incLastMonthes}
            title='Доходы с начала года'
            text='Тут будет график' />
        </div>
      </ResponsiveGridLayout>
    </div>
  )
}