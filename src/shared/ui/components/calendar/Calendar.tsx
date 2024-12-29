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
  const firstWeekDay = +currentDate.date(1).format('d')
  const daysArray = new Array<string>(daysInMonth).fill('day')
  const firstWeek = new Array<string>(7).fill('day')
  const firstDaySecondWeek = 7 + 1 - firstWeekDay + 1

  useEffect(() => {
    onChange && onChange(currentDate)
  }, [currentDate])

  const weekArrays = useMemo(() => {
    const result = []
    const sliceFirstDaysArray = daysArray.slice(firstDaySecondWeek)

    let tempArray = []
    let counter = 0
    for (let i = 0; i < sliceFirstDaysArray.length; i++) {
      counter++
      if (counter % 7 != 0) {
        tempArray.push(i)
      } else {
        result.push(tempArray.concat([i]))
        tempArray = []
      }

      if (i === sliceFirstDaysArray.length - 1 && tempArray?.[0] !== null) {
        result.push(tempArray.concat([i + 1]))
      }
    }

    return result
  }, [firstDaySecondWeek])

  return (
    <div className={className}>
      <div className="month">
        <div onClick={() => setCurrentDate((prev) => prev.add(-1, 'month'))}>
          <LeftArrow />
        </div>
        <div>
          {MonthName[+currentDate.month() + 1]} {currentDate.year()}
        </div>
        <div onClick={() => setCurrentDate((prev) => prev.add(1, 'month'))}>
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
          <tr>
            {firstWeek.map((_, index) => {
              return (
                <Day
                  key={index}
                  active={index + 1 - firstWeekDay + 1 === currentDate.date()}
                  onClick={() =>
                    setCurrentDate((prev) =>
                      prev.set('date', index + 1 - firstWeekDay + 1),
                    )
                  }
                >
                  <span>
                    {index + 1 > firstWeekDay - 1
                      ? index + 1 - firstWeekDay + 1
                      : null}
                  </span>
                </Day>
              )
            })}
          </tr>
          {weekArrays.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <Day
                  key={index}
                  active={day + firstDaySecondWeek === currentDate.date()}
                  onClick={() => {
                    setCurrentDate((prev) =>
                      prev.set('date', day + firstDaySecondWeek),
                    )
                  }}
                >
                  <span>{day + firstDaySecondWeek}</span>
                </Day>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Day = styled.td<{ active: boolean }>`
  font-size: 16px;
  font-weight: normal;
  padding: 8px 0;

  &:hover {
    cursor: pointer;
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
      outline: ${({ active }) => (active ? 'none' : '1px solid #000')};
    }
  }
`
