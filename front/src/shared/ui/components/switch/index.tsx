import styled, { css } from 'styled-components'
import { SwitchComponent } from './Switch'

const checkedStyles = (color: string) => css`
  background-color: ${color};
`

const checkedHandleStyles = css`
  .switch-handle {
    left: 21px;
  }
`

export const Switch = styled(SwitchComponent)`
  width: 40px;
  height: 20px;
  background-color: ${({
    theme: {
      pallete: { content },
    },
  }) => content.light};
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  .switch-handle {
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: left 0.3s;
  }

  ${({
    checked,
    theme: {
      pallete: { primary },
    },
  }) => checked && checkedStyles(primary.orange)}
  ${({ checked }) => checked && checkedHandleStyles}
`
