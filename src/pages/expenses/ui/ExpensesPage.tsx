import { Button } from '@shared/ui/components/button'
import { generateChartOptions, initialModal } from './utils'
import { Calendar } from '@shared/ui/components/calendar'
import { NewRecord, useExpensesCategories } from '@features/category'
import { RecordModal } from '@features/category'
import { List, RecordType } from '@shared/ui/list'
import { useExpenses } from '@features/expense'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import { EchartsReact } from '@shared/lib/echarts/Echarts-react'
import { EChartsOption } from 'echarts'

export const ExpensesPageComponent = ({
  className,
}: {
  className?: string
}) => {
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  )
  const [modalInfo, setModalInfo] = useState({
    ...initialModal,
  })
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [categories, , categoriesLoading] = useExpensesCategories()
  const currency = useUser((state) => state.data.settings?.currency)

  const symbol = useMemo(() => getCurrencySymbol(currency), [currency])

  const {
    expenses: [records, recordsLoading],
    expensesLastWeek: [expensesLastWeek],
    actions: { createNewExpense, getExpenses, deleteExpense, editExpense },
  } = useExpenses()

  const queriesOnCreate = async (data: NewRecord) =>
    createNewExpense({
      ...data,
      date: dayjs(currentDate).format('YYYY-MM-DD'),
    } as any)

  const listRecords: RecordType[] = Object.values(
    records.reduce<{ [key: string]: RecordType }>((acc, item) => {
      const { date } = item
      const index = dayjs(date).format('DD.MM')
      if (!acc[index]) {
        acc[index] = { group: index, data: [] }
      }
      const {
        amount,
        categoryColor: color,
        categoryName: title,
        id: key,
      } = item
      acc[index].data.push({ title, color, suffix: `${amount} ${symbol}`, key })
      return acc
    }, {}),
  )

  const options = useMemo<EChartsOption | null>(() => {
    return expensesLastWeek ? generateChartOptions(expensesLastWeek) : null
  }, [expensesLastWeek])

  const sum = useMemo(() => {
    return (
      expensesLastWeek?.values?.reduce((partialSum, a) => partialSum + a, 0) ??
      null
    )
  }, [expensesLastWeek])

  return (
    <div className={className}>
      <div className="expenses-content">
        <div className="left">
          <div className="calendar">
            <Calendar
              onChange={(value) => {
                const formattedDate = value.format('YYYY-MM-DD')
                getExpenses(formattedDate)
                setCurrentDate(formattedDate)
              }}
              value={currentDate}
            />
          </div>
          <div className="btn">
            <Button
              type="primary"
              text="Добавить расход"
              onClick={() => {
                setMode('create')
                setViewModal(true)
              }}
              textAlign="center"
            />
          </div>
          <div className="chartBlock">
            <div className="info">
              <div>
                <div className="sum">{sum ?? '-'}</div>
                <div className="avg">
                  {sum ? Math.round(sum / 7) : '-'} в среднем за день
                </div>
              </div>
              <div className="period">
                с {dayjs(currentDate).format('DD.MM')} по{' '}
                {dayjs(currentDate).add(-7, 'day').format('DD.MM')}
              </div>
            </div>
            {options && (
              <div style={{height:'calc(100% - 51px)'}}>
                <EchartsReact options={options} />
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <List records={listRecords} loading={recordsLoading} sort="desc" />
        </div>
      </div>
      {viewModal && (
        <RecordModal
          recordInfo={modalInfo}
          onChangeRecordInfo={(data) => setModalInfo(data)}
          title={mode === 'create' ? 'Новая трата' : 'Редактирование'}
          mode={mode}
          categories={categories}
          categoriesLoading={categoriesLoading}
          open={viewModal}
          onEdit={(record) =>
            editExpense({
              amount: record.amount,
              categoryId: record.categoryId,
              id: record.id,
            })
          }
          onCancel={() => {
            setViewModal(false)
            setModalInfo({ ...initialModal })
          }}
          onCreate={(data: NewRecord) => queriesOnCreate(data)}
        />
      )}
    </div>
  )
}
