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

  background-color: #f7f4ef;
  .form {
    max-width: 380px;
    border-radius: 16px;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 36px;
    gap: 8px;
  }

  .welcome {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 32px;
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
      color: #e05a29;
    }
  }
`

export default RegisterPage
