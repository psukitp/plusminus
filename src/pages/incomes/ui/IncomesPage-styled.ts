import { Flex } from 'antd'
import styled from 'styled-components'

export const IncomesContainer = styled.div`
  overflow: auto;
  padding: 30px 25px;
  width: 100%;

  .tables {
    max-width: 100%;
  }

  .btn,
  .calendar {
    margin-bottom: 24px;
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
