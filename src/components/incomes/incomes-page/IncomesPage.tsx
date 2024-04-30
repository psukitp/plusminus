import { Table } from "../../table"
import { MonthButton } from "../../common/buttons"

import './IncomesPage.less'
import { Flex } from "antd"
import { useIncomes } from "../../../hooks/use-incomes"
import { Loader } from "../../common/loaders"


export const IncomesPage = () => {
    const [records, columns] = useIncomes()

    return <div className='incomes'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Доходы
            </div>
            <MonthButton month='Февраль' year={2024} />
        </Flex>
        <Flex justify='space-between' className="tables">
            {records.length > 0
                ? <Table
                    rowKey="id"
                    columns={columns}
                    records={records} />
                : <Loader />
            }
            <Table
                rowKey=""
                columns={[]}
                records={[]}
            />
        </Flex>
    </div>
}