import { useChartWidget } from "@hooks";
import { useSmallWidgetData } from "@hooks";
import { ChartWidget, SmallWidget } from "../widgets";
import './ReviewPage.less';
import { getFormattedAmount } from "@common/utils";

export const ReviewPage = () => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData()
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget()

  return (
    <div className="review">
        <div id="exp-by-month">
          <SmallWidget
            title='Расход за месяц'
            text={`${getFormattedAmount(expenses.expensesTotal)} ₽`}
            diff={expenses.expensesDiff}
            positive={expenses.expensesDiff < 0} />
        </div>
        <div id="inc-by-month">
          <SmallWidget
            title='Доход за месяц'
            text={`${getFormattedAmount(incomes.incomesTotal)} ₽`}
            diff={incomes.incomesDiff}
            positive={incomes.incomesDiff > 0} />

        </div>
        <div id="moth-diff">
          <SmallWidget
            title='Остаток, месяц'
            text={`${getFormattedAmount(remainingSum.remainingTotal)} ₽`}
            diff={remainingSum.remainingDiff}
            positive={remainingSum.remainingDiff > 0} />
        </div>
        <div id="total-diff">
          <SmallWidget
            title='Остаток, все время'
            text={`${getFormattedAmount(diffTotal)} ₽`} />
        </div>
        {/* <div id="capital">
          <SmallWidget
            title='Накопления (прогресс)'
            text='coming soon' />
        </div> */}
        <div id="exp-by-category">
          <ChartWidget
            options={expByMonth}
            title='Расходы по категориями'
            text='Тут будет график' />
        </div>
        <div id="exp-dynamic">
          <ChartWidget
            options={expLastMonthes}
            title='Расходы с начала года'
            text='Тут будет график' />
        </div>
        <div id="inc-dynamic">
          <ChartWidget
            options={incLastMonthes}
            title='Доходы с начала года'
            text='Тут будет график' />
        </div>
    </div>
  )
}