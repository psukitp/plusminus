import { Table } from "../../table"
import { MonthButton } from "../../common/buttons"
import { Button, Calendar, Col, Flex } from "antd"
import { useExpenses } from "../../../hooks/use-expenses"
import { useMemo, useState } from "react"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import { AddNewModal, NewRecord } from "../../common/modal"

import './ExpensesPage.less'

dayjs.extend(utc)

//TODO унести все стили в лесс файлик
export const ExpensesPage = () => {
    const [[records, columns], [summarizedRecords, summarizedColumns], { createNewExpense }] = useExpenses()
    const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
    const [viewModal, setViewModal] = useState<boolean>(false)

    const recordsToView = useMemo(() => records.filter(r => r.date === currentDate), [records, currentDate])

    return <div className='expenses'>
        <Flex align='center' className='title'>
            <div className='title-text'>
                Расходы
            </div>
            <MonthButton month='Февраль' year={2024} />
        </Flex>
        <Button onClick={() => setViewModal(true)} style={{ marginBottom: '5px' }}>Новая трата</Button>
        <Flex justify="space-between">
            <Col>
                <Calendar fullscreen={false} onChange={(value) => setCurrentDate(value.format('YYYY-MM-DD'))} value={dayjs(currentDate)} style={{ maxWidth: '600px', width: '100%', marginBottom: '15px' }} />
                <Table
                    style={{ maxWidth: '600px', width: '100%' }}
                    rowKey="id"
                    columns={columns}
                    records={recordsToView} />
            </Col>
            <Col>
                <Table
                    rowKey="categoryName"
                    records={summarizedRecords}
                    columns={summarizedColumns}
                />
            </Col>
        </Flex>
        <AddNewModal
            open={viewModal}
            onCancel={() => setViewModal(false)}
            onOk={(data: NewRecord) => {
                //TODO убрать, щас пока что хочется функционально сделать
                createNewExpense({ ...data, date: dayjs(currentDate).utc().format() } as any)
                setViewModal(false)
            }}
        />
    </div>
}