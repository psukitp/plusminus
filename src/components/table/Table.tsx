import { Table as AntTable } from "antd";
import './Table.less'
import { ITableProps } from ".";
import { Loader } from "@components/common/loaders";
import { useMemo } from "react";


export const Table = ({ records, loading, ...rest }: ITableProps) => {

    const resultView = useMemo(() => {
        return records.length > 0
            ? <AntTable
                style={{
                    fontFamily: "RobotoRegular, sans-serif"
                }}
                dataSource={records}
                pagination={false}
                {...rest} />
            : <div>{`Кажется, ничего не нашлось :(`}</div>
    }, [records, rest])

    return loading
        ? <Loader />
        : resultView

};