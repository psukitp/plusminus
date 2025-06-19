import { useIncomeStore } from '@entities/income'
import { Delete } from '@features/income/ui/delete'
import { useIncome } from '@features/income/model/hooks/use-income/use-income'
import { Create } from '@features/income/ui/create/create'
import { Edit } from '@features/income/ui/edit'
import { ExpenseIncomeView } from '@pages/expense-income-view'
import { yearMonthDay } from '@shared/constants'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from '@shared/types'
import { getDates } from '@shared/utils'
import { Key, useState } from 'react'

const IncomesPage = () => {
  const [period, setPeriod] = useState<DatePeriod>(DatePeriods.Month)
  const [chartType, setChartType] = useState<ChartType>(ChartTypes.Pie)
  const [editingId, setEditingId] = useState<Key | null>(null)
  const [deletingId, setDeletingId] = useState<Key | null>(null)
  const { isCreating, setIsCreating } = useIncomeStore((state) => state)

  const { addIncome, deleteIncome, editIncome, incomes, incomesLoading } =
    useIncome(
      getDates(period)[0].format(yearMonthDay),
      getDates(period)[1].format(yearMonthDay),
    )

  return (
    <>
      <ExpenseIncomeView
        chartType={chartType}
        data={incomes}
        loading={incomesLoading}
        period={period}
        listPrefix="+"
        setChartType={setChartType}
        setDeletingId={setDeletingId}
        setEditingId={setEditingId}
        setPeriod={setPeriod}
      />
      <Edit
        id={editingId}
        onClose={() => setEditingId(null)}
        onEdit={(income) => editIncome({ id: editingId!, ...income })}
      />
      <Delete
        id={deletingId}
        onClose={() => setDeletingId(null)}
        onDelete={(id) => deleteIncome(id)}
      />
      {isCreating && (
        <Create
          open={isCreating}
          onClose={() => setIsCreating(false)}
          onCreate={(income) => addIncome(income)}
        />
      )}
    </>
  )
}

export default IncomesPage
