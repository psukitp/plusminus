import { useExpense } from '@features/expense/model'
import { Key, useState } from 'react'
import { ChartType, ChartTypes, DatePeriod, DatePeriods } from '@shared/types'
import { Edit } from '@features/expense/ui/edit'
import { Delete } from '@features/expense/ui/delete'
import { Create } from '@features/expense/ui/create/create'
import { useExpenseStore } from '@entities/expense'
import { yearMonthDay } from '@shared/constants'
import { ExpenseIncomeView } from '@pages/expense-income-view'
import { getDates } from '@shared/utils'

const ExpensesPage = () => {
  const [period, setPeriod] = useState<DatePeriod>(DatePeriods.Month)
  const [chartType, setChartType] = useState<ChartType>(ChartTypes.Pie)
  const [editingId, setEditingId] = useState<Key | null>(null)
  const [deletingId, setDeletingId] = useState<Key | null>(null)
  const { isCreating, setIsCreating } = useExpenseStore(state => state)


  const { expenses, expensesLoading, deleteExpense, editExpense, addExpense } = useExpense(
    getDates(period)[0].format(yearMonthDay),
    getDates(period)[1].format(yearMonthDay),
  )


  return (
    <>
      <ExpenseIncomeView
        chartType={chartType}
        data={expenses}
        loading={expensesLoading}
        period={period}
        setChartType={setChartType}
        setDeletingId={setDeletingId}
        setEditingId={setEditingId}
        setPeriod={setPeriod}
      />
      <Edit id={editingId} onClose={() => setEditingId(null)} onEdit={(expense) => editExpense({ id: editingId!, ...expense })} />
      <Delete id={deletingId} onClose={() => setDeletingId(null)} onDelete={(id) => deleteExpense(id)} />
      <Create open={isCreating} onClose={() => setIsCreating(false)} onCreate={(expense) => addExpense(expense)} />
    </>
  )
}
export default ExpensesPage
