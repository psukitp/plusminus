import { Flex } from "antd"
import styled from "styled-components"

export const ExpensesContainer = styled.div`
    overflow: auto;
    padding: 30px 25px;
    width: 100%;

    .tables {
        max-width: 100%;
    }
`

export const Title = styled(Flex)`
     margin-bottom: 70px;
`

export const Text = styled.div`
    font-family: 'RobotoBold';
    font-size: 48px;
    margin-right: 20px;
`

export const Summary = styled.div`
margin-bottom: 15px;
`