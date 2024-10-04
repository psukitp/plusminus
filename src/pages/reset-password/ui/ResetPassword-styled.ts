import { Input } from "antd";
import styled from "styled-components";

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