import { StyledComponentProps } from "@common/theme-light";
import { border, borderRadius } from "@common/variables";
import { Table } from "antd";
import styled from "styled-components";

export const TableContainer = styled(Table) <StyledComponentProps>`
    .ant-table {
        ${borderRadius}
    }

    .ant-table-content {

        box-shadow: ${({ theme }) => theme.colors.boxShadow};
        background: ${({ theme }) => theme.colors.backgroundComponent.default};
        color: ${({ theme }) => theme.colors.textColor.default};
        ${border}
        ${borderRadius}

        .ant-table-cell {
            text-align: center;
        }
    }

    .ant-table-thead {
        .ant-table-cell {
            background: ${({ theme }) => theme.colors.backgroundComponent.default};
            color: ${({ theme }) => theme.colors.textColor.default};
            font-family: 'RobotoBold';
            text-align: center !important;
            padding: 5px auto !important;
        }
    }
`