import { useUser } from '@entities/user'
import { IHeaderComponentProps } from './types'
import { Segmented } from '@shared/ui/components/segmented'
import { Key, useCallback, useState } from 'react'
import { SegmentedOption } from '@shared/ui'
import dayjs, { Dayjs } from 'dayjs'
import { useExpenseStore } from '@entities/expense'
import { useIncomeStore } from '@entities/income'
import { Button } from 'antd'
import { PlusIcon } from '@shared/ui/icons'

const periodOptions: SegmentedOption<[start: Dayjs, end: Dayjs]>[] = [
  { id: '1', label: 'Нед', value: [dayjs().add(-7, 'day'), dayjs()] },
  {
    id: '2',
    label: 'Мес',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  { id: '3', label: 'Год', value: [dayjs().add(-1, 'year'), dayjs()] },
]

export const HeaderComponent = ({
  showDates,
  showAddExpense,
  showAddIncome,
  className,

  onChangeDates,
}: IHeaderComponentProps) => {
  const user = useUser((state) => state.data)
  const [activePeriod, setActivePeriod] = useState<Key>('2')
  const { setIsCreating: setIsExpenseCreating } = useExpenseStore(
    (state) => state,
  )
  const { setIsCreating: setIsIncomeCreating } = useIncomeStore(
    (state) => state,
  )

  const onSegmentedClick = useCallback(
    (el: SegmentedOption<[start: Dayjs, end: Dayjs]>) => {
      setActivePeriod(el.id)
      onChangeDates(el.value)
    },
    [onChangeDates],
  )

  return (
    <div className={className}>
      {showDates && (
        <div className="period-date">
          <Segmented
            active={activePeriod}
            onClick={(el) =>
              onSegmentedClick(
                el as SegmentedOption<[start: Dayjs, end: Dayjs]>,
              )
            }
            options={periodOptions}
          />
        </div>
      )}
      {showAddExpense && (
        <Button
          onClick={() => setIsExpenseCreating(true)}
          type="primary"
          icon={<PlusIcon />}
        />
      )}
      {showAddIncome && (
        <Button
          onClick={() => setIsIncomeCreating(true)}
          type="primary"
          icon={<PlusIcon />}
        />
      )}
      <div className="info">
        <div className="name">
          {user.name}
          <br />
          {user.secondName}
        </div>
        <div className="login">{user.login}</div>
      </div>
    </div>
  )
}
