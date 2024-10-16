import { Calendar as AntdCalendar } from 'antd'
import dayjs from 'dayjs'
import styled from 'styled-components'
import updateLocale from 'dayjs/plugin/updateLocale'
import { genereateCalendarCfg, StyledComponentProps } from '@shared/lib'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1,
})

const CalendarContainer = styled(AntdCalendar)<StyledComponentProps>`
  max-width: 600px;
  width: 100%;
  margin-bottom: 15px;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  background: ${({ theme }) => theme.colors.backgroundComponent.default};
  border: ${({ theme }) => theme.common.border};
  border-radius: ${({ theme }) => theme.common.borderRadius};
  color: ${({ theme }) => theme.colors.textColor.default};

  .ant-picker-body {
    background: ${({ theme }) => theme.colors.backgroundComponent.default};
    border: ${({ theme }) => theme.common.border};
    border-radius: ${({ theme }) => theme.common.borderRadius};

    th,
    td {
      color: ${({ theme }) => theme.colors.textColor.default};
    }
  }

  .ant-picker-panel {
    background: ${({ theme }) => theme.colors.backgroundComponent.default};
  }
`

export const Calendar = ({
  onChange,
  value,
}: {
  onChange: (value: dayjs.Dayjs) => void
  value: string
}) => {
  return (
    <CalendarContainer
      //TODO брать локаль из настроек
      locale={genereateCalendarCfg('ru')}
      fullscreen={false}
      onChange={onChange}
      value={dayjs(value)}
    />
  )
}
