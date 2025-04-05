import { Button } from '@shared/ui/components/button'
import { generateChartOptions, initialModal } from './utils'
import { Calendar } from '@shared/ui/components/calendar'
import {
  ModalRecordInfo,
  NewRecord,
  useExpensesCategories,
} from '@features/category'
import { List, RecordType, Segmented } from '@shared/ui'
import { useExpenses } from '@features/expense'
import { Key, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useUser } from '@entities/user'
import { getCurrencySymbol } from '@shared/utils'
import { EchartsReact } from '@shared/lib/echarts/Echarts-react'
import { EChartsOption } from 'echarts'
import { ConfirmModal, EditModal } from '@features/expense/ui'
import { SelectOption } from '@shared/ui'
import { useLocation } from 'react-router-dom'

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [deletableId, setDeletableId] = useState<Key | null>(null)
  const [categories] = useExpensesCategories()
  const currency = useUser((state) => state.data.settings?.currency)

  const { state } = useLocation()

  useEffect(() => {
    if (state && state.create) setViewModal(true)
  }, [state])

  const symbol = useMemo(() => getCurrencySymbol(currency), [currency])

  const {
    expenses: [records = [], recordsLoading],
    expensesLastWeek: [expensesLastWeek],
    actions: {
      createNewExpense,
      deleteExpense,
      editExpense,
      getExpensesLastWeek,
    },
  } = useExpenses(
    dayjs(currentDate).add(-7, 'day').format('YYYY-MM-DD'),
    currentDate,
  )

  const queriesOnCreate = async (data: NewRecord) => {
    await createNewExpense({
      ...data,
      date: dayjs(currentDate).format('YYYY-MM-DD'),
    } as any)

    setViewModal(false)
    setModalInfo({ ...initialModal })
  }

  const queriesOnEdit = async (data: ModalRecordInfo) => {
    await editExpense(data)

    setViewModal(false)
    setModalInfo({ ...initialModal })
  }

  const sortByDates = (a: RecordType, b: RecordType) => {
    const [aDay, aMonth] = a.group.split('.')
    const [bDay, bMonth] = b.group.split('.')

    const aDate = dayjs().set('date', +aDay).set('month', +aMonth)
    const bDate = dayjs().set('date', +bDay).set('month', +bMonth)
    return aDate.isAfter(bDate) ? -1 : 1
  }

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
      acc[index].data.push({
        title,
        color,
        value: `- ${amount}`,
        suffix: symbol,
        key,
      })
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

  const selectOptions = useMemo<SelectOption[]>(() => {
    return categories?.map((c) => ({
      key: c.id,
      label: c.name,
      value: c.id.toString(),
      color: c.color,
    }))
  }, [categories])

  const onCloseDeleteModal = () => {
    setDeletableId(null)
    setShowDeleteModal(false)
  }

  const [currentPeriod, setCurrentPeriod] = useState('month')

  return (
    <div className={className}>
      <div className="expenses-content">
        <div className="left">
          <div className="calendar">
            <Segmented
              active={currentPeriod}
              onClick={({ value }) => setCurrentPeriod(value)}
              options={[
                { id: 'week', label: 'Нед', value: 'week' },
                { id: 'month', label: 'Мес', value: 'month' },
                { id: 'year', label: 'Год', value: 'year' },
              ]}
            />
            <Calendar
              onChange={(value) => {
                const formattedDate = value.format('YYYY-MM-DD')
                getExpensesLastWeek(formattedDate)
                setCurrentDate(formattedDate)
              }}
              value={currentDate}
            />
          </div>
          <div className="btn">
            <Button
              type="primary"
              onClick={() => {
                setMode('create')
                setViewModal(true)
              }}
              textAlign="center"
            >
              Добавить расход
            </Button>
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
                с {dayjs(currentDate).add(-7, 'day').format('DD.MM')} по{' '}
                {dayjs(currentDate).format('DD.MM')}
              </div>
            </div>
            {options && (
              <div style={{ height: 'calc(100% - 51px)' }}>
                <EchartsReact options={options} />
              </div>
            )}
          </div>
        </div>
        <div className="right">
          <List
            records={listRecords}
            loading={recordsLoading}
            sortFunc={sortByDates}
            onDelete={(id) => {
              setDeletableId(id)
              setShowDeleteModal(true)
            }}
            onEdit={(exp) => {
              const currentExp = records.find((r) => r.id === exp.key)
              const { amount, categoryId, id } = currentExp!
              setModalInfo({ amount, categoryId, id })
              setMode('edit')
              setViewModal(true)
            }}
          />
        </div>
      </div>
      <EditModal
        open={viewModal}
        modal={modalInfo}
        categoryOptions={selectOptions}
        mode={mode}
        onChangeAmount={(amount) =>
          setModalInfo((prev) => ({ ...prev, amount: +amount }))
        }
        onChangeCategory={(categoryId) =>
          setModalInfo((prev) => ({ ...prev, categoryId }))
        }
        onClose={() => {
          setViewModal(false)
          setModalInfo({ ...initialModal })
        }}
        onCreate={() => queriesOnCreate(modalInfo)}
        onEdit={() => queriesOnEdit(modalInfo)}
      />
      <ConfirmModal
        open={showDeleteModal}
        onCancel={onCloseDeleteModal}
        onClose={onCloseDeleteModal}
        onOk={async () => {
          if (deletableId) await deleteExpense(deletableId)
          onCloseDeleteModal()
        }}
      />
    </div>
  )
}
