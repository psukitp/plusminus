import styled, { css } from "styled-components"
import { Statistic } from "./statistic"
import { List } from "@shared/ui"
import { Key } from "react"
import { ChartType, DatePeriod } from "@shared/types"
import { getListRecords, sortByDates } from "./utils"
import { ExpensesRecord } from "@entities/expense"
import { IncomesRecord } from "@entities/income"

type Props = {
  className?: string
  chartType: ChartType
  period: DatePeriod
  loading: boolean
  data: ExpensesRecord[] | IncomesRecord[]
  setPeriod: (period: DatePeriod) => void
  setChartType: (type: ChartType) => void
  setDeletingId: (id: Key) => void
  setEditingId: (id: Key) => void
}

const ExpenseIncomeViewComponent = ({ className, chartType, period, loading, data, setChartType, setDeletingId, setEditingId, setPeriod }: Props) => {

  const listRecord = getListRecords(data)
  return (
    <div className={className}>
      <div className="statistic">
        <Statistic chartType={chartType} onChangeChartType={setChartType} data={data} period={period} onChangePeriod={setPeriod} />
      </div>
      <div className="list">
        <List
          loading={loading}
          records={listRecord}
          sortFunc={sortByDates}
          onDelete={(id) => setDeletingId(id)}
          onEdit={({ key }) => setEditingId(key)} />
      </div>
    </div>
  )
}

export const ExpenseIncomeView = styled(ExpenseIncomeViewComponent)(
  ({ theme }) => css`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0 ${theme.gaps.xl}px;
    gap: ${theme.gaps.l}px;

    .block {
      border: 1px solid black;
    }

    .statistic {
      flex: 0.5;
    }

    .list {
      flex: 1;
    }
  `,
)

