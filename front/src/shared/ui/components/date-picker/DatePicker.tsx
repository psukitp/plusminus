import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const DatePickerComponent = ({ className }: { className?: string }) => {
  const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null])
  const [startDate, endDate] = dateRange
  return (
    <div className={className}>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update)
        }}
        isClearable={true}
      />
    </div>
  )
}
