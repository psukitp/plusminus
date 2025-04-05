import { ExpensesRecord } from '@entities/expense'
import { Segmented } from '@shared/ui'
import styled, { css } from 'styled-components'
import { getChartOptions } from './utils'
import { EchartsReact } from '@shared/lib'
import { useMemo } from 'react'
import { BarChartIcon, PiechartIcon } from '@shared/ui/icons'
import { IncomesRecord } from '@entities/income'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from '@shared/types'

type Props = {
  className?: string
  data: ExpensesRecord[] | IncomesRecord[]
  period: DatePeriod
  chartType: ChartType
  onChangePeriod: (period: DatePeriod) => void
  onChangeChartType: (type: ChartType) => void
}

const StatisticComponent = ({ className, period, chartType, data, onChangeChartType, onChangePeriod }: Props) => {
  const chartOptions = getChartOptions(data, chartType)

  const sum = useMemo(() => {
    return data.reduce((partialSum, a) => partialSum + a.amount, 0) ?? null
  }, [data])

  return (
    <div className={className}>
      <div className="numbers">
        <div className="sum">{sum}</div>
        <div className="avg">
          В среднем {data.length > 0 ? (sum / data.length).toFixed(2) : '-'} за день
        </div>
      </div>
      <div className="control">
        <Segmented
          cirlced
          active={chartType}
          onClick={({ value }) => onChangeChartType(value as ChartType)}
          options={[
            { id: ChartTypes.Bar, label: <BarChartIcon />, value: ChartTypes.Bar },
            { id: ChartTypes.Pie, label: <PiechartIcon />, value: ChartTypes.Pie },
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
