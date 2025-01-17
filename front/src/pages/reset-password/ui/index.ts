import styled from 'styled-components'
import { ResetPasswordComponent } from './ResetPassword'

const ResetPassword = styled(ResetPasswordComponent)`
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

  .input {
    max-width: 400px;
    width: 100%;
    margin-bottom: ${({ theme: { gaps } }) => `${gaps.s}px`};
    text-align: center;

    &::placeholder {
      text-align: center;
    }
  }

  .title {
    margin-bottom: 40px;
    font-size: 40px;
    font-weight: bold;
  }
`

export default ResetPassword
