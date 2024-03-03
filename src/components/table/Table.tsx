import { Table as AntTable } from "antd";
import './Table.less'
import { ITableProps } from ".";


export const Table = ({ records, columns, rowKey }: ITableProps) => {
    return <AntTable
        rowKey={rowKey}
        dataSource={records}
        columns={columns}
        pagination={false} />;
};