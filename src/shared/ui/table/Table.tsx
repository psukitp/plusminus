import { ITableProps } from "./types";
import { Loader } from "../loader/Loader";
import { useMemo } from "react";
import { TableContainer } from "./Table-styled";


export const Table = ({ records, loading, summary, ...rest }: ITableProps) => {

    const resultView = useMemo(() => {
        return records.length > 0
            ? <>
                {!!summary ? summary : null}
                <TableContainer
                    style={{
                        fontFamily: "RobotoRegular, sans-serif"
                    }}
                    dataSource={records}
                    pagination={false}
                    {...rest} />
            </>
            : <div>{`Кажется, ничего не нашлось :(`}</div>
    }, [records, rest])

    return loading
        ? <Loader />
        : resultView

};