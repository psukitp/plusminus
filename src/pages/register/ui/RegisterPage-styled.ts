import { Input } from 'antd'
import styled from 'styled-components'

export const RegisterContainer = styled.div`
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
  flex-direction: column;

  .link {
    font-size: 14px;
  }
  
  .title {
    margin-bottom: 60px;
    font-size: 60px;
    font-weight: bold;
  }
`

export const RegisterInput = styled(Input)`
  max-width: 400px;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;

  &::placeholder {
    text-align: center;
  }
`

export const PasswordInput = styled(Input.Password)`
  max-width: 400px;
  width: 100%;
  margin-bottom: 10px;
  .ant-input {
    text-align: center;

    &::placeholder {
      text-align: center;
    }
  }
`
