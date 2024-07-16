import { isMobile } from "react-device-detect"
import styled from "styled-components"

export const Title = styled.div`
    margin-bottom: 40px;
    font-family: 'RobotoBold';
    font-size: 48px;
    margin-right: 20px;
`

export const SubTitle = styled.div`
    margin-bottom: 20px;
    font-family: 'RobotoBold';
    font-size: 32px;
    margin-right: 10px;
`

export const CategoriesContainer = styled.div`
    overflow: auto;
    padding: 30px 25px;
    width: 100%;

    .ant-table-wrapper {
        max-width: ${isMobile ? '100%' : '70%'};
    }
`