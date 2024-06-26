import { Input } from "antd"
import styled from "styled-components"

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

    .logo {
        width: 300px;
        height: 300px;
        margin: auto;
    }

`

export const RegisterInput = styled(Input)`
    max-width: 400px;
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
    display: block;

    &::placeholder {
        text-align: center;
    }
`