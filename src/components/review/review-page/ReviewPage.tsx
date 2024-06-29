import { useChartWidget, useSmallWidgetData } from "@hooks";
import { ChartWidget, SmallWidget } from "../widgets";
import { getFormattedAmount } from "@common/utils";
import { ReviewContainer, WidgetContainer } from './ReviewPage-styled';

export const ReviewPage = () => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData();
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget();

  return (
    <ReviewContainer>
      <WidgetContainer startRow={1} startCol={1} endRow={2} endCol={2} id="exp-by-month">
        <SmallWidget
          title='Расход за месяц'
          text={`${getFormattedAmount(expenses.expensesTotal)} ₽`}
          diff={expenses.expensesDiff}
          positive={expenses.expensesDiff < 0}
        />
      </WidgetContainer>
      <WidgetContainer startRow={1} startCol={2} endRow={2} endCol={3} id="inc-by-month">
        <SmallWidget
          title='Доход за месяц'
          text={`${getFormattedAmount(incomes.incomesTotal)} ₽`}
          diff={incomes.incomesDiff}
          positive={incomes.incomesDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer startRow={1} startCol={3} endRow={2} endCol={4} id="moth-diff">
        <SmallWidget
          title='Остаток, месяц'
          text={`${getFormattedAmount(remainingSum.remainingTotal)} ₽`}
          diff={remainingSum.remainingDiff}
          positive={remainingSum.remainingDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer startRow={1} startCol={4} endRow={2} endCol={5} id="total-diff">
        <SmallWidget
          title='Остаток, все время'
          text={`${getFormattedAmount(diffTotal)} ₽`}
        />
      </WidgetContainer>
      <WidgetContainer startRow={2} startCol={1} endRow={4} endCol={3} id="exp-by-category">
        <ChartWidget
          options={expByMonth}
          title='Расходы по категориями'
          text='Тут будет график'
        />
      </WidgetContainer>
      <WidgetContainer startRow={2} startCol={3} endRow={4} endCol={5} id="exp-dynamic">
        <ChartWidget
          options={expLastMonthes}
          title='Расходы с начала года'
          text='Тут будет график'
        />
      </WidgetContainer>
      <WidgetContainer startRow={4} startCol={1} endRow={7} endCol={5} id="inc-dynamic">
        <ChartWidget
          options={incLastMonthes}
          title='Доходы с начала года'
          text='Тут будет график'
        />
      </WidgetContainer>
    </ReviewContainer>
  );
};

export default ReviewPage;
