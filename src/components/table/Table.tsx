import { Table as AntTable } from "antd";
import './Table.less'
import { ITableProps } from ".";


export const Table = ({ records, columns }: ITableProps) => {
    return <AntTable
        dataSource={records}
        columns={columns}
        pagination={false} />;
};