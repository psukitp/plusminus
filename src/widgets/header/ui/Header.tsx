import { useUser } from '@entities/user'
import { IHeaderComponentProps } from './types'
import { Segmented } from '@shared/ui/components/segmented'
import { Key, useCallback, useState } from 'react'
import { SegmentedOption } from '@shared/ui'
import dayjs, { Dayjs } from 'dayjs'

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
  className,

  onChangeDates,
}: IHeaderComponentProps) => {
  const user = useUser((state) => state.data)
  const [activePeriod, setActivePeriod] = useState<Key>('2')

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
            onClick={(el: SegmentedOption<[start: Dayjs, end: Dayjs]>) =>
              onSegmentedClick(el)
            }
            options={periodOptions}
          />
          {/* <DatePicker /> */}
        </div>
      )}
      <div className="info">
        <div className="name">
          {user.name}
          <br />
          {user.secondName}
        </div>
        <div className="email">{user.email}</div>
      </div>
    </div>
  )
}
