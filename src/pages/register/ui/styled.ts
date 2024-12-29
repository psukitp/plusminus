import styled from 'styled-components'
import RegisterPageComponent from './RegisterPage'

const RegisterPage = styled(RegisterPageComponent)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  overflow: auto;

  background-color: ${({ theme: { pallete } }) => `${pallete.dom.background}`};
  .form {
    max-width: 380px;
    border-radius: 16px;
    width: 100%;
    background: ${({ theme: { pallete } }) => `${pallete.dom.white}`};
    display: flex;
    flex-direction: column;
    padding: ${({ theme: { gaps } }) => `${gaps.xl}px`};
    gap: ${({ theme: { gaps } }) => `${gaps.s}px`};
  }

  .welcome {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.xl}px`};
  }

  .label {
    font-size: 12px;
  }

  .not-equal {
    color: red;
  }

  .registerBtn {
    margin-top: 32px;
  }

  .entry {
    display: flex;
    justify-content: center;
    font-size: 12px;
    margin-top: 16px;

    span {
      color: ${({ theme: { pallete } }) => `${pallete.primary.orange}`};
    }
  }
`

export default RegisterPage
