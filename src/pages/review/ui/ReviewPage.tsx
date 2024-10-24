import { getFormattedAmount } from '@shared/lib'
import {
  ReviewContainer,
  ReviewGrid,
  WidgetContainer,
} from './ReviewPage-styled'
import { isMobile } from 'react-device-detect'
import { useMemo, useState } from 'react'
import { generateGrid } from './utils'
import { GridElement } from './types'
import {
  PercentWidget,
  useChartWidget,
  useSmallWidgetData,
} from '@entities/widget'
import { ChartWidget, SmallWidget } from '@entities/widget'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import { ReviewHeader } from './review-header'
import dayjs, { Dayjs } from 'dayjs'

const ReviewPage = () => {
  const [dates, setDates] = useState<[start: Dayjs, end: Dayjs]>([
    dayjs().startOf('month'),
    dayjs(),
  ])

  const [expenses, incomes, remainingSum, diffTotal] = useSmallWidgetData(dates)
  const [expByMonth, lastMonthes] = useChartWidget()

  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo<string>(() => getCurrencySymbol(currency), [currency])

  const grid = useMemo<GridElement[]>(
    () => generateGrid(isMobile),
    [isMobile, generateGrid],
  )

  return (
    <ReviewContainer>
      <ReviewHeader dates={dates} onChange={setDates} />
      <ReviewGrid>
        <WidgetContainer {...grid[0]}>
          <SmallWidget
            title="Расход за период"
            text={`${getFormattedAmount(expenses.expensesTotal)} ${symbol}`}
            isLoading={expenses.loading}
            diff={expenses.expensesDiff}
            positive={expenses.expensesDiff < 0}
          />
        </WidgetContainer>
        <WidgetContainer {...grid[1]}>
          <SmallWidget
            title="Доход за период"
            text={`${getFormattedAmount(incomes.incomesTotal)} ${symbol}`}
            isLoading={incomes.loading}
            diff={incomes.incomesTotal}
          />
        </WidgetContainer>
        <WidgetContainer {...grid[2]}>
          <SmallWidget
            title="Остаток, период"
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
          <PercentWidget title={'Самые большие категории расходов, период'} />
        </WidgetContainer>
        <WidgetContainer {...grid[6]}>
          <ChartWidget
            options={lastMonthes.options}
            haveData={
              !!lastMonthes.options?.series?.every(
                (s) => (s as unknown as { data: [] }).data.length,
              )
            }
            isLoading={lastMonthes.loading}
            title="Доходы с начала года"
            text="Тут будет график"
          />
        </WidgetContainer>
      </ReviewGrid>
    </ReviewContainer>
  )
}

export default ReviewPage
