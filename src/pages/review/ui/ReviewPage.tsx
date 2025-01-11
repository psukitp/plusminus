import { getFormattedAmount } from '@shared/lib'
import { isMobile } from 'react-device-detect'
import { useMemo } from 'react'
import { generateGrid } from './utils'
import { GridElement, IReviewPageProps } from './types'
import {
  PercentWidget,
  useChartWidget,
  useSmallWidgetData,
} from '@entities/widget'
import { ChartWidget, SmallWidget } from '@entities/widget'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import styled from 'styled-components'
import { ReviewHello } from './review-hello'
import { PieLegend } from '@features/category/ui/pie-legend'

export const ReviewPageComponent = ({ className, dates }: IReviewPageProps) => {
  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData(dates)
  const [expByCategories, thisYear, expRecords] = useChartWidget(dates)

  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo<string>(() => getCurrencySymbol(currency), [currency])

  const grid = useMemo<GridElement[]>(() => generateGrid(isMobile), [isMobile])

  const percent = useMemo(() => {
    if (incomes.incomesTotal === 0) return 0

    const calculated = Math.floor(
      (remainingSum.remainingDiff / incomes.incomesTotal) * 100,
    )

    return Number.isNaN(calculated) ? 0 : calculated
  }, [remainingSum, incomes])

  console.log(thisYear)

  return (
    <div className={className}>
      <ReviewHello />
      <div className="grid">
        <WidgetContainer {...grid[0]}>
          <SmallWidget
            title="Расходы"
            text={`${getFormattedAmount(expenses.expensesTotal)} ${symbol}`}
            isLoading={expenses.loading}
            diff={expenses.expensesDiff}
            dates={dates}
            positive={expenses.expensesDiff < 0}
            type="primary"
          />
        </WidgetContainer>
        <WidgetContainer {...grid[1]}>
          <SmallWidget
            title="Доходы"
            text={`${getFormattedAmount(incomes.incomesTotal)} ${symbol}`}
            isLoading={incomes.loading}
            diff={incomes.incomesTotal}
            dates={dates}
            type="secondary"
          />
        </WidgetContainer>
        <WidgetContainer {...grid[2]}>
          <SmallWidget
            title="Остаток за период"
            text={`${getFormattedAmount(remainingSum.remainingTotal)} ${symbol}`}
            isLoading={expenses.loading && incomes.loading}
            positive={remainingSum.remainingDiff > 0}
            additionalText={`${percent}% от дохода`}
            type="outlined"
          />
        </WidgetContainer>
        <WidgetContainer {...grid[3]}>
          <SmallWidget
            title="Остаток за все время"
            isLoading={diffTotal.loading}
            text={`${getFormattedAmount(diffTotal.diffTotal)} ${symbol}`}
            additionalText={
              diffTotal.diffTotal > 0 ? 'Так держать!' : 'Все получится!'
            }
            type="primary"
          />
        </WidgetContainer>
        <WidgetContainer {...grid[4]}>
          <>
            <ChartWidget
              title="Расходы по категориями"
              options={expByCategories.options}
              haveData={
                Array.isArray(expByCategories.options?.series) &&
                expByCategories.options?.series?.some(
                  (s: any) => s?.data.length > 0,
                )
              }
              isLoading={expByCategories.loading}
              customFooter={<PieLegend records={expRecords} />}
            />
          </>
        </WidgetContainer>
        <WidgetContainer {...grid[5]}>
          <PercentWidget title={''} />
        </WidgetContainer>
        <WidgetContainer {...grid[6]}>
          <ChartWidget
            options={thisYear.options}
            haveData={
              Array.isArray(thisYear.options?.series) &&
              thisYear.options?.series?.some((s: any) =>
                (s?.data as any[]).some((val) => val !== null),
              )
            }
            isLoading={thisYear.loading}
            title="Доходы и расходы за последний год"
          />
        </WidgetContainer>
      </div>
    </div>
  )
}

const WidgetContainer = styled.div<GridElement>`
  grid-row-start: ${({ startRow }) => startRow};
  grid-column-start: ${({ startCol }) => startCol};
  grid-row-end: ${({ endRow }) => endRow};
  grid-column-end: ${({ endCol }) => endCol};
`
