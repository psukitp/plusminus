import styled from 'styled-components'
import { ButtonComponent } from './Button'

export const Button = styled(ButtonComponent)`
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  font-family: 'RobotoBold';
  display: flex;
  align-items: center;

  background-color: ${({
    type,
    theme: {
      pallete: { primary },
    },
  }) => (type === 'primary' ? primary.orange : 'transparent')};

  color: ${({
    type,
    theme: {
      pallete: { content, dom },
    },
  }) => (type === 'primary' ? dom.white : content.main)};

  justify-content: ${({ textAlign }) => textAlign ?? 'start'};

  &:hover {
    outline: ${({
      type,
      theme: {
        pallete: { content },
      },
    }) => (type === 'primary' ? 'none' : `1px solid ${content.main}`)};
  }

  .icon {
    margin-right: ${({ theme: { gaps } }) => `${gaps.s}px`};
    height: 20px;
    width: 20px;
    path {
      stroke: ${({
        type,
        theme: {
          pallete: { content, dom },
        },
      }) => (type === 'primary' ? dom.white : content.main)};
    }
  }
`