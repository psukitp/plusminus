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
    value ? dayjs(value) : dayjs(),
  )
  const daysInMonth = currentDate.daysInMonth()
  const firstWeekDay = +currentDate.date(1).isoWeekday()
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  useEffect(() => {
    onChange && onChange(currentDate)
  }, [currentDate])

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
          <LeftArrow/>
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
      <table>
        <thead>
          <tr className="weekDays">
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <Day
                  key={j}
                  active={day === currentDate.date()}
                  nooutline={!day}
                  onClick={() =>
                    day && setCurrentDate(currentDate.set('date', day))
                  }
                >
                  <span>{day || ''}</span>
                </Day>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Day = styled.td<{ active: boolean; nooutline: boolean }>`
  font-size: 16px;
  font-weight: normal;
  padding: 8px 0;

  &:hover {
    cursor: ${({ nooutline }) => !nooutline && 'pointer'};
  }

  span {
    color: ${({ active }) => (active ? '#fff' : '#000')};
    background: ${({ theme, active }) =>
      active ? theme.pallete.primary.orange : 'unset'};
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
