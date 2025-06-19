import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

interface DatePickerProps {
  value?: Dayjs | string
  onChange?: (date: Dayjs) => void
  className?: string
}

export const DatePickerComponent = ({
  value,
  onChange,
  className,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    value ? dayjs(value).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
  )

  useEffect(() => {
    if (value) {
      setSelectedDate(dayjs(value).format('YYYY-MM-DD'))
    }
  }, [value])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    onChange?.(dayjs(newDate))
  }

  return (
    <div className={className}>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
    </div>
  )
}
