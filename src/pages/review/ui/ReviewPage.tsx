import { getFormattedAmount } from "@shared/lib";
import { ReviewContainer, WidgetContainer } from './ReviewPage-styled';
import { isMobile } from "react-device-detect";
import { useMemo } from "react";
import { generateGrid } from "./utils";
import { GridElement } from "./types";
import { useChartWidget, useSmallWidgetData } from "@features/widget/model";
import { ChartWidget, SmallWidget } from "@features/widget/ui";

const ReviewPage = () => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData();
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget();

  const grid = useMemo<GridElement[]>(() => generateGrid(isMobile), [isMobile, generateGrid])

  return (
    <ReviewContainer>
      <WidgetContainer {...grid[0]}>
        <SmallWidget
          title='Расход за месяц'
          text={`${getFormattedAmount(expenses.expensesTotal)} ₽`}
          diff={expenses.expensesDiff}
          positive={expenses.expensesDiff < 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[1]}>
        <SmallWidget
          title='Доход за месяц'
          text={`${getFormattedAmount(incomes.incomesTotal)} ₽`}
          diff={incomes.incomesDiff}
          positive={incomes.incomesDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[2]}>
        <SmallWidget
          title='Остаток, месяц'
          text={`${getFormattedAmount(remainingSum.remainingTotal)} ₽`}
          diff={remainingSum.remainingDiff}
          positive={remainingSum.remainingDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[3]}>
        <SmallWidget
          title='Остаток, все время'
          text={`${getFormattedAmount(diffTotal)} ₽`}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[4]}>
        <ChartWidget
          options={expByMonth}
          title='Расходы по категориями'
          text='Тут будет график'
        />
      </WidgetContainer>
      <WidgetContainer {...grid[5]}>
        <ChartWidget
          options={expLastMonthes}
          title='Расходы с начала года'
          text='Тут будет график'
        />
      </WidgetContainer>
      <WidgetContainer {...grid[6]}>
        <ChartWidget
          options={incLastMonthes}
          title='Доходы с начала года'
          text='Тут будет график'
        />
      </WidgetContainer>
    </ReviewContainer>
  );
};

export default ReviewPage
