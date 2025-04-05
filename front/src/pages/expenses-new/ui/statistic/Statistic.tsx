import { ExpensesRecord } from '@entities/expense'
import { Segmented } from '@shared/ui'
import styled, { css } from 'styled-components'
import { getBarOptions } from '../utils'
import { EchartsReact } from '@shared/lib'
import { useMemo } from 'react'
import { DatePeriod, DatePeriods } from '../types'

type Props = {
  className?: string
  expenses: ExpensesRecord[]
  period: DatePeriod
  onChangePeriod: (period: DatePeriod) => void
}

const StatisticComponent = ({ className, period, expenses, onChangePeriod }: Props) => {
  const chartOptions = getBarOptions(expenses)

  const sum = useMemo(() => {
    return expenses.reduce((partialSum, a) => partialSum + a.amount, 0) ?? null
  }, [expenses])

  return (
    <div className={className}>
      <div className="numbers">
        <div className="sum">{sum}</div>
        <div className="avg">
          В среднем {(sum / expenses.length).toFixed(2)} за день
        </div>
      </div>
      <div className="control">
        <Segmented
          active={'1'}
          onClick={() => { }}
          options={[
            { id: 1, label: '|||', value: 'bar' },
            { id: 2, label: '|||', value: 'pie' },
          ]}
        />
        <Segmented<DatePeriod>
          active={period}
          onClick={({ value }) => onChangePeriod(value as DatePeriod)}
          options={[
            { id: DatePeriods.Week, label: 'Нед', value: DatePeriods.Week },
            { id: DatePeriods.Month, label: 'Мес', value: DatePeriods.Month },
            { id: DatePeriods.Year, label: 'Год', value: DatePeriods.Year },
          ]}
        />
      </div>
      <div className="chart">
        <EchartsReact options={chartOptions} />
      </div>
    </div>
  )
}

export const Statistic = styled(StatisticComponent)(
  ({ theme }) => css`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.gaps.l}px;

    .control,
    .numbers {
      display: flex;
      justify-content: space-between;
      align-items: end;
    }

    .numbers {
      .sum {
        ${theme.fonts.heading_1};
        color: ${theme.pallete.primary.orange};
      }

      .avg {
        ${theme.fonts.small};
        color: ${theme.pallete.dom.black};
      }
    }

    .control {
      align-items: center;
    }

    .chart {
      height: 50%;
      background: ${theme.pallete.dom.background};
      border-radius: 16px;
    }
  `,
)
