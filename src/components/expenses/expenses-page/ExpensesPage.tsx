import { Table } from "../../table"
import { MonthButton } from "../../buttons"

import './ExpensesPage.less'
import { Flex } from "antd"
import { useExpenses } from "../../../hooks/use-expenses"


export const ExpensesPage = () => {
    const [[records, columns], [summarizedRecords, summarizedColumns]] = useExpenses()

    return <div className='expenses'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Расходы
            </div>
            <MonthButton month='Февраль' year={2024} />
        </Flex>
        <Flex justify='space-between' className="tables">
            {records.length > 0
                ? <Table
                    rowKey="id"
                    columns={columns}
                    records={records} />
                //TODO лоадер надо
                : 'Загрузка'
            }
            {records.length > 0
                ? <Table
                    rowKey="categoryName"
                    records={summarizedRecords}
                    columns={summarizedColumns}
                />
                //TODO лоадер надо
                : 'Загрузка'
            }
        </Flex>
    </div>
}