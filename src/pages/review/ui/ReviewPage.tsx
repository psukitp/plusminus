import { getFormattedAmount } from '@shared/lib'
import { ReviewContainer, WidgetContainer } from './ReviewPage-styled'
import { isMobile } from 'react-device-detect'
import { useMemo } from 'react'
import { generateGrid } from './utils'
import { GridElement } from './types'
import { useChartWidget, useSmallWidgetData } from '@entities/widget'
import { ChartWidget, SmallWidget } from '@entities/widget'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'

const ReviewPage = () => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData()
  const [expByMonth, expLastMonthes, incLastMonthes] = useChartWidget()

  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo<string>(() => getCurrencySymbol(currency), [currency])

  const grid = useMemo<GridElement[]>(
    () => generateGrid(isMobile),
    [isMobile, generateGrid],
  )

  return (
    <ReviewContainer>
      <WidgetContainer {...grid[0]}>
        <SmallWidget
          title="Расход за месяц"
          text={`${getFormattedAmount(expenses.expensesTotal)} ${symbol}`}
          isLoading={expenses.loading}
          diff={expenses.expensesDiff}
          positive={expenses.expensesDiff < 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[1]}>
        <SmallWidget
          title="Доход за месяц"
          text={`${getFormattedAmount(incomes.incomesTotal)} ${symbol}`}
          isLoading={incomes.loading}
          diff={incomes.incomesDiff}
          positive={incomes.incomesDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[2]}>
        <SmallWidget
          title="Остаток, месяц"
          text={`${getFormattedAmount(remainingSum.remainingTotal)} ${symbol}`}
          isLoading={expenses.loading && incomes.loading}
          diff={remainingSum.remainingDiff}
          positive={remainingSum.remainingDiff > 0}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[3]}>
        <SmallWidget
          title="Остаток, все время"
          isLoading={diffTotal.loading}
          text={`${getFormattedAmount(diffTotal.diffTotal)} ${symbol}`}
        />
      </WidgetContainer>
      <WidgetContainer {...grid[4]}>
        <ChartWidget
          options={expByMonth.options}
          haveData={
            !!expByMonth.options?.series?.every(
              (s) => (s as unknown as { data: [] }).data.length,
            )
          }
          isLoading={expByMonth.loading}
          title="Расходы по категориями"
          text="Тут будет график"
        />
      </WidgetContainer>
      <WidgetContainer {...grid[5]}>
        <ChartWidget
          options={expLastMonthes.options}
          haveData={
            !!expLastMonthes.options?.series?.every(
              (s) => (s as unknown as { data: [] }).data.length,
            )
          }
          isLoading={expLastMonthes.loading}
          title="Расходы с начала года"
          text="Тут будет график"
        />
      </WidgetContainer>
      <WidgetContainer {...grid[6]}>
        <ChartWidget
          options={incLastMonthes.options}
          haveData={
            !!incLastMonthes.options?.series?.every(
              (s) => (s as unknown as { data: [] }).data.length,
            )
          }
          isLoading={incLastMonthes.loading}
          title="Доходы с начала года"
          text="Тут будет график"
        />
      </WidgetContainer>
    </ReviewContainer>
  )
}

export default ReviewPage
