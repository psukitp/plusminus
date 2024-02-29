import { Table } from "../../table"
import { MonthButton } from "../../buttons"

import './ExpensesPage.less'
import { Flex } from "antd"

export const ExpensesPage = () => {

    return <div className='expenses'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Расходы
            </div>
            <MonthButton month='Февраль' year={2024} />
        </Flex>
        <Flex justify='space-between' className="tables">
            <Table
                columns={[]}
                records={[]} />
            <Table
                columns={[]}
                records={[]}
            />
        </Flex>
    </div>
}