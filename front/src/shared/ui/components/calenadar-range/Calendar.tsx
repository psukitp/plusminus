import dayjs, { Dayjs } from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { MonthName } from './utils'
import { ICalendarProps } from './types'
import { LeftArrow, RightArrow } from '@shared/ui/icons'

dayjs.extend(weekday)
dayjs.extend(isoWeek)

export const CalendarComponent = ({
  className,
  value,
  onChange,
}: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(
    value ? dayjs(value[0]) : dayjs(),
  )
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([null, null])

  useEffect(() => {
    if (value) setRange(value)
  }, [value])

  const daysInMonth = currentDate.daysInMonth()
  const firstWeekDay = +currentDate.date(1).isoWeekday()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handleDayClick = (day: number) => {
    const selectedDate = currentDate.set('date', day)

    if (!range[0] || (range[0] && range[1])) {
      setRange([selectedDate, null])
    } else {
      if (selectedDate.isBefore(range[0])) setRange([selectedDate, range[0]])
      else setRange([range[0], selectedDate])

      onChange && onChange([range[0], range[1]!])
    }
  }

  const isInRange = (day: number) => {
    if (!range[0] || !range[1]) return false
    const date = currentDate.set('date', day)
    return (
      (date.isAfter(range[0]) && date.isBefore(range[1])) ||
      date.isSame(range[0]) ||
      date.isSame(range[1])
    )
  }

  const weeks = useMemo(() => {
    const result: number[][] = []
    let week: number[] = Array(firstWeekDay - 1).fill(0)

    daysArray.forEach((day) => {
      week.push(day)
      if (week.length === 7) {
        result.push(week)
        week = []
      }
    })

    if (week.length) {
      result.push([...week, ...Array(7 - week.length).fill(0)])
    }

    return result
  }, [daysArray, firstWeekDay])

  return (
    <div className={className}>
      <div className="month">
        <div
          className="icon-left btn"
          onClick={() => setCurrentDate((prev) => prev.add(-1, 'month'))}
        >
          <LeftArrow />
        </div>
        <div>
          {MonthName[+currentDate.month() + 1]} {currentDate.year()}
        </div>
        <div
          onClick={() => setCurrentDate((prev) => prev.add(1, 'month'))}
          className="icon-right btn"
        >
          <RightArrow />
        </div>
      </div>
      <div className="table">
        <div className="weekDays">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>
        <div className="body">
          {weeks.map((week, i) => (
            <>
              {week.map((day, j) => (
                <Day
                  key={j}
                  active={day === currentDate.date()}
                  nooutline={!day}
                  inrange={isInRange(day)}
                  onClick={() => {
                    day && setCurrentDate(currentDate.set('date', day))
                    day && handleDayClick(day)
                  }}
                >
                  <span>{day || ''}</span>
                </Day>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

const Day = styled.div<{
  active: boolean
  nooutline: boolean
  inrange: boolean
}>`
  font-size: 16px;
  font-weight: normal;
  padding: 8px 0;

  &:hover {
    cursor: ${({ nooutline }) => !nooutline && 'pointer'};
  }

  span {
    color: ${({ active, inrange }) => (active || inrange ? '#fff' : '#000')};
    background: ${({ theme, active, inrange }) =>
      active || inrange ? theme.pallete.primary.orange : 'unset'};
    border-radius: 50%;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    width: 30px;
    margin: auto;

    &:hover {
      outline: ${({ active, nooutline }) =>
        active || nooutline ? 'none' : '1px solid #000'};
    }
  }
`
