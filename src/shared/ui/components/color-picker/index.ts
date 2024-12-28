import styled from 'styled-components'
import { ColorPickerComponent } from './ColorPicker'

export const ColorPicker = styled(ColorPickerComponent)`
  position: 'relative';
  display: 'inline-block';

  .open {
    border: 1px solid #c1c8d2;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`
