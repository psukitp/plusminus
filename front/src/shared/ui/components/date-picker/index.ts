import styled from 'styled-components'
import { DatePickerComponent } from './DatePicker'

export const DatePicker = styled(DatePickerComponent)`
  position: relative;
  .popup {
    position: absolute;
    width: 200px;
    top: 30px;
  }
`
