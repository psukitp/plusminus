import styled, { css } from 'styled-components'
import { Statistic } from './statistic'
import { useExpense } from '@features/expense/model'
import { List, RecordType } from '@shared/ui'
import { Key, useMemo, useState } from 'react'
import { getListRecords, sortByDates } from './utils'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from './types'
import { getDates } from './statistic/utils'
import { Edit } from '@features/expense/ui/edit'
import { Delete } from '@features/expense/ui/delete'
import { Create } from '@features/expense/ui/create/create'
import { useExpenseStore } from '@entities/expense'
import { yearMonthDay } from '@shared/constants'

type Props = {
  className?: string
}

const ExpensesPageComponent = ({ className }: Props) => {
  const [period, setPeriod] = useState<DatePeriod>(DatePeriods.Month)
  const [chartType, setChartType] = useState<ChartType>(ChartTypes.Pie)
  const [editingId, setEditingId] = useState<Key | null>(null)
  const [deletingId, setDeletingId] = useState<Key | null>(null)
  const { isCreating, setIsCreating } = useExpenseStore(state => state)


  const { expenses, expensesLoading, deleteExpense, editExpense, addExpense } = useExpense(
    getDates(period)[0].format(yearMonthDay),
    getDates(period)[1].format(yearMonthDay),
  )

  const listRecords: RecordType[] = useMemo(
    () => getListRecords(expenses),
    [expenses],
  )

  return (
    <div className={className}>
      <div className="statistic">
        <Statistic chartType={chartType} onChangeChartType={setChartType} expenses={expenses} period={period} onChangePeriod={setPeriod} />
      </div>
      <div className="list">
        <List
          loading={expensesLoading}
          records={listRecords}
          sortFunc={sortByDates}
          onDelete={(id) => setDeletingId(id)}
          onEdit={({ key }) => setEditingId(key)} />
      </div>
      <Edit id={editingId} onClose={() => setEditingId(null)} onEdit={(expense) => editExpense({ id: editingId!, ...expense })} />
      <Delete id={deletingId} onClose={() => setDeletingId(null)} onDelete={(id) => deleteExpense(id)} />
      <Create open={isCreating} onClose={() => setIsCreating(false)} onCreate={(expense) => addExpense(expense)} />
    </div>
  )
}

const ExpensesPage = styled(ExpensesPageComponent)(
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

export default ExpensesPage
