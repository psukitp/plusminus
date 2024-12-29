import { generateChartOptions, initialModal } from './utils'
import {
  ModalRecordInfo,
  NewRecord,
  useIncomesCategories,
} from '@features/category'
import { Calendar } from '@shared/ui/components/calendar'
import { Button } from '@shared/ui/components/button'
import { EditModal, useIncomes } from '@features/income'
import { Key, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { List, RecordType } from '@shared/ui/list'
import { getCurrencySymbol } from '@shared/utils'
import { useUser } from '@entities/user'
import { ConfirmModal } from '@features/expense/ui'
import { SelectOption } from '@shared/ui/components/select/types'
import { EChartsOption } from 'echarts'
import { EchartsReact } from '@shared/lib/echarts/Echarts-react'

export const IncomesPageComponent = ({ className }: { className?: string }) => {
  const {
    incomes: [records, recordsLoading],
    incomesLastTwoMonth: [recordsLastMonthes],
    actions: {
      createNewIncome,
      deleteIncome,
      editIncome,
      getIncomes,
      getIncomesLastTwoMonth,
    },
  } = useIncomes()
  const [categories] = useIncomesCategories()
  const [currentDate, setCurrentDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  )
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const [modalInfo, setModalInfo] = useState<ModalRecordInfo>({
    ...initialModal,
  })
  const [deletableId, setDeletableId] = useState<Key | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  const currency = useUser((state) => state.data.settings?.currency)
  const symbol = useMemo(() => getCurrencySymbol(currency), [currency])

  const queriesOnCreate = async (data: NewRecord) => {
    createNewIncome({
      ...data,
      date: dayjs(currentDate).format('YYYY-MM-DD'),
    } as any)

    setViewModal(false)
    setModalInfo({ ...initialModal })
  }

  const queriesOnEdit = async (data: ModalRecordInfo) => {
    await editIncome(data)

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
      acc[index].data.push({ title, color, value: `+ ${amount}`, suffix: symbol, key })
      return acc
    }, {}),
  )

  const onCloseDeleteModal = () => {
    setDeletableId(null)
    setShowDeleteModal(false)
  }

  const selectOptions = useMemo<SelectOption[]>(() => {
    return categories?.map((c) => ({
      key: c.id,
      label: c.name,
      value: c.id.toString(),
      color: c.color,
    }))
  }, [categories])

  const options = useMemo<EChartsOption | null>(() => {
    return recordsLastMonthes ? generateChartOptions(recordsLastMonthes) : null
  }, [recordsLastMonthes])

  const sum = useMemo(() => {
    return (
      recordsLastMonthes?.values?.reduce(
        (partialSum, a) => partialSum + a,
        0,
      ) ?? null
    )
  }, [recordsLastMonthes])

  return (
    <div className={className}>
      <div className="incomes-content">
        <div className="left">
          <div className="calendar">
            <Calendar
              value={currentDate}
              onChange={(value) => {
                const formattedDate = value.format('YYYY-MM-DD')
                getIncomes(formattedDate)
                getIncomesLastTwoMonth(formattedDate)
                setCurrentDate(formattedDate)
              }}
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
              Добавить доход
            </Button>
          </div>
          <div className="chartBlock">
            <div className="info">
              <div>
                <div className="sum">{sum ?? '-'}</div>
                <div className="avg">
                  {sum
                    ? Math.round(
                        sum /
                          dayjs(currentDate).diff(
                            dayjs(currentDate).add(-1, 'month'),
                            'day',
                          ),
                      )
                    : '-'}{' '}
                  в среднем за день
                </div>
              </div>
              <div className="period">
                с {dayjs(currentDate).add(-1, 'month').format('DD.MM')} по{' '}
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
              const currentInc = records.find((r) => r.id === exp.key)
              const { amount, categoryId, id } = currentInc!
              setModalInfo({ amount, categoryId, id })
              setMode('edit')
              setViewModal(true)
            }}
          />
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
            const currentInc = records.find((r) => r.id === deletableId)
            await deleteIncome(currentInc!)
            onCloseDeleteModal()
          }}
        />
      </div>
    </div>
  )
}
