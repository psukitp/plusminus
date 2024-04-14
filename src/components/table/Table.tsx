import { Table as AntTable } from "antd";
import './Table.less'
import { ITableProps } from ".";
import { Loader } from "../common/loaders";


export const Table = ({ records, ...rest }: ITableProps) => {
    return records.length > 0
        ? <AntTable
            dataSource={records}
            pagination={false}
            {...rest} />
        : <Loader />

};