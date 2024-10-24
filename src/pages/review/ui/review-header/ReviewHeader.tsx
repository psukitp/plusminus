import { genereateCalendarCfg } from '@shared/lib'
import { DatePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

export const ReviewHeaderComponent = ({
  className,
  dates,
  onChange,
}: {
  dates: [start: Dayjs, end: Dayjs]
  className?: string

  onChange: (value: [start: Dayjs, end: Dayjs]) => void
}) => {
  return (
    <div className={className}>
      <DatePicker.RangePicker
        locale={genereateCalendarCfg('ru')}
        allowClear={false}
        value={dates}
        onChange={(dates) => {
          const start = dates[0]
          const end = dates[1]
          if (start && end) onChange([start, end])
        }}
        defaultValue={[dayjs().startOf('month'), dayjs()]}
        format={'DD.MM.YYYY'}
      />
    </div>
  )
}
