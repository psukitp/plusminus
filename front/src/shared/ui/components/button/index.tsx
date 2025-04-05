import styled, { css, DefaultTheme } from 'styled-components'
import { ButtonComponent } from './Button'
import { ButtonProps } from './types'
import { isMobile } from 'react-device-detect'

export const Button = styled(ButtonComponent)`
  padding: 12px;
  border-radius: 8px;
  font-family: 'RobotoBold';
  display: flex;
  align-items: center;

  justify-content: ${({ textAlign }) => textAlign ?? 'start'};

  &:hover {
    transition: 0.2s ease-in-out;
  }

  .icon {
    margin-right: ${({ theme: { gaps } }) => `${gaps.m}px`};
    height: 20px;
    width: 20px;
  }

  ${({ type, active, theme }) => getTypedStyles(type, !!active, theme)}
`
const getTypedStyles = (
  type: ButtonProps['type'],
  active: boolean,
  theme: DefaultTheme,
) => {
  switch (type) {
    case 'primary':
      return css`
        background-color: ${theme.pallete.primary.orange};
        color: ${theme.pallete.dom.white};

        &:hover {
          outline: ${isMobile
          ? 'none'
          : `1px solid ${theme.pallete.content.main}`};

          background-color: ${isMobile
          ? 'none'
          : theme.pallete.primary.orangeLight};
        }
      `
    case 'ghost':
      return css`
        background-color: 'transparent';
        color: ${active
          ? theme.pallete.primary.orange
          : theme.pallete.content.main};

        &:hover {
          color: ${isMobile
          ? 'none'
          : `1px solid ${theme.pallete.content.light}`};
        }
      `
  }
}
