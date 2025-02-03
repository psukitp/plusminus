import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar } from '../calenadar-range'

export const DatePickerComponent = ({
  value,
  className,
}: {
  value: [Dayjs, Dayjs]
  className?: string
}) => {
  // const [dateRange, setDateRange] = useState<(Date | null)[]>([null, null])
  // const [startDate, endDate] = dateRange

  // useEffect(() => {
  //   setDateRange(value.map((date) => date.toDate()))
  // }, [value])
  return (
    // <div className={className}>
    //   <DatePicker
    //     selectsRange={true}
    //     startDate={startDate}
    //     endDate={endDate}
    //     dateFormat="dd.MM"
    //     onChange={(update) => setDateRange(update)}
    //   />
    // </div>
    <div className={className}>
      <div>12.03 - 25.03</div>
      <div className="popup">
        <Calendar value={value} />
      </div>
    </div>
  )
}
